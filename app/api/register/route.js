import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectDB from '@/app/config/database';
import User from '@/app/models/User';

export async function POST(request) {
  try {
    await connectDB();

    if (request.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    const { username, email, password, recaptchaToken } = await request.json();

    // Input validation
    if (!username || !email || !password || !recaptchaToken) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v3
    try {
      const recaptchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed' },
          { status: 400 }
        );
      }

      if (recaptchaResult.score < 0.5) {
        return NextResponse.json(
          { message: 'Suspicious activity detected' },
          { status: 400 }
        );
      }
    } catch (recaptchaError) {
      console.error('reCAPTCHA verification error:', recaptchaError);
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed' },
        { status: 500 }
      );
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            existingUser.email === email
              ? 'Email already exists'
              : 'Username already exists',
        },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      provider: 'credentials',
      createdAt: new Date(),
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    );
  }
}
