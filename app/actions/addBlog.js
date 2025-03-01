'use server';
import { revalidatePath } from 'next/cache';
import cloudinary from '../config/cloudinary';
import connectDB from '../config/database';
import Blog from '../models/Blog';
import { getSessionUser } from '../utils/getSessionUser';

async function addBlog(formData) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    // Get form data
    const title = formData.get('title');
    const content = formData.get('content');
    const tags = formData.get('tags');

    // Validate required fields
    if (!title || !content) {
      return {
        success: false,
        message: 'Title and content are required',
      };
    }

    // Process image if present
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
          folder: 'blog_images',
          width: 1200,
          height: 630,
          crop: 'fill',
        }
      );

      imageUrl = result.secure_url;
    }

    // Prepare blog data
    const blogData = {
      creator: sessionUser.userId || sessionUser.user.id || sessionUser._id,
      title,
      content,
      image: imageUrl,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
    };

    const blog = new Blog(blogData);
    await blog.save();

    // Invalidate cache
    revalidatePath('/');
    revalidatePath('/blogs');

    return {
      success: true,
      message: 'Blog post created successfully',
    };
  } catch (error) {
    console.error('Error adding blog:', error);
    return {
      success: false,
      message: error.message || 'Failed to create blog post',
    };
  }
}

export default addBlog;
