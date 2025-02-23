'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ImagePlus } from 'lucide-react';

// Dynamic import of the rich text editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function CreateBlog() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className=" py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Create New Blog Post
          </h1>

          <form className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter your blog title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Featured Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="relative">
                {preview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <ImagePlus className="w-12 h-12 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Click to upload image
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <div className="prose-container">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image', 'code-block'],
                      ['clean'],
                    ],
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Publish Post
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
