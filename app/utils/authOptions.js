import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '../config/database';
import User from '../models/User';

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    // Credentials Provider for email and password

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        // Connect to the database
        await connectDB();

        // check if the user exists

        const existingUser = await User.findOne({ email: credentials.email });

        // Registration flow

        if (!existingUser) {
          try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            // Create a new user
            const newUser = new User({
              email: credentials.email,
              password: hashedPassword,
              username: credentials.email.split('@')[0],
              role: 'user',
            });

            return {
              id: newUser._id.toString(),
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              username,
            };
          } catch (error) {
            throw new Error('Registration failed: ' + error.message);
          }
        }

        // Login flow
        // Check if the password is correct and existing user

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Return the user object
        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          username: existingUser.username,
          image: existingUser.image,
        };
      },
    }),
  ],

  //   Callbacks

  callbacks: {
    async signIn({ account, profile }) {
      try {
        await connectDB();
        if (!account?.provider === 'google') {
          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            const username = profile.name
              .toLowerCase()
              .split(' ')
              .replace(/\s/g, '');
            await User.create({
              email: profile.email,
              name: profile.name,
              username,
              role: 'user',
              image: profile.picture,
              provider: 'google',
            });
          }
        }

        return true;
      } catch (error) {
        throw new Error('Failed to sign in: ' + error.message);
        return false;
      }
    },

    async session({ session, token }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (user) {
          session.user = {
            ...session.user,
            id: user._id.toString(),
            role: user.role,
            name: user.name || user.username,
            username: user.username,
            image: user.image,
          };
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name || user.username;
      }
      return token;
    },
  },

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);
