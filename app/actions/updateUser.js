'use server';

import { revalidatePath } from 'next/cache';
import cloudinary from '../config/cloudinary';
import connectDB from '../config/database';
import User from '../models/User';
import { getSessionUser } from '../utils/getSessionUser';

async function updateUser(formData) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    const images = formData
      .getAll('image')
      .filter((image) => image.name !== '');
    let imageUrl = '';

    if (images && images.length > 0) {
      // Upload image to Cloudinary
      const imageBuffer = await images[0].arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:${images[0].type};base64,${imageBase64}`,
        {
          folder: 'user_profiles',
          width: 500,
          height: 500,
          crop: 'fill',
        }
      );

      imageUrl = result.secure_url;
    }

    // Prepare update data - only include fields that can be updated
    const updateData = {
      name: formData.get('name'),
      username: formData.get('username'),
      phone: formData.get('phone'),
    };

    // Validate required fields
    if (!updateData.name) {
      return {
        success: false,
        message: 'Name is required',
      };
    }

    if (!updateData.username) {
      return {
        success: false,
        message: 'Username is required',
      };
    }

    // Only add image if a new one was uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      sessionUser.userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    // Revalidate the profile page
    revalidatePath('/profile');
    revalidatePath('/profile/setting');

    return {
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        username: updatedUser.username,
        phone: updatedUser.phone,
        image: updatedUser.image,
      },
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      message: error.message || 'Error updating profile',
    };
  }
}

export default updateUser;
