import connectDB from '@/app/config/database';
import bcrypt from 'bcryptjs';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { oldPassword, newPassword } = await req.json();
    const { db } = await connectDB();

    const user = await db
      .collection('users')
      .findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Validate new password
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      return NextResponse.json(
        {
          message:
            'New password must be at least 8 characters long and contain letters and numbers.',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await db
      .collection('users')
      .updateOne(
        { email: session.user.email },
        { $set: { password: hashedPassword } }
      );

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating password' },
      { status: 500 }
    );
  }
}
