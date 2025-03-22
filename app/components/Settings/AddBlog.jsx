'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ImagePlus,
  Save,
  Hash,
  Calendar,
  Smile,
  Table,
  CheckSquare,
  Type,
  ArrowDown,
  Minus,
} from 'lucide-react';
import addBlog from '@/app/actions/addBlog';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import EmojiPicker from 'emoji-picker-react';

export default function CreateBlog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Auto-save functionality
  useEffect(() => {
    // Load from local storage if available
    const savedPost = localStorage.getItem('blogDraft');
    if (savedPost) {
      try {
        const parsedPost = JSON.parse(savedPost);
        setTitle(parsedPost.title || '');
        setContent(parsedPost.content || '');
        setTags(parsedPost.tags || '');
        // Can't restore file input state
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    // Set up auto-save
    const autoSaveInterval = setInterval(() => {
      if (title || content || tags) {
        localStorage.setItem(
          'blogDraft',
          JSON.stringify({ title, content, tags })
        );
        setAutoSaveStatus('Draft saved ' + new Date().toLocaleTimeString());
        setTimeout(() => setAutoSaveStatus(''), 3000);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [title, content, tags]);

  // Track word and character counts
  useEffect(() => {
    if (content) {
      setWordCount(content.trim().split(/\s+/).length);
      setCharCount(content.length);
    } else {
      setWordCount(0);
      setCharCount(0);
    }
  }, [content]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Insert text at cursor position
  const insertTextAtCursor = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    setContent(beforeText + text + afterText);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  // Insert emoji at cursor
  const handleEmojiClick = (emojiData) => {
    insertTextAtCursor(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Insert spacing elements
  const insertSpacing = (spacingType) => {
    switch (spacingType) {
      case 'paragraph':
        insertTextAtCursor('\n\n');
        break;
      case 'lineBreak':
        insertTextAtCursor('  \n'); // Two spaces and a newline for single line break in markdown
        break;
      case 'horizontalRule':
        insertTextAtCursor('\n\n---\n\n');
        break;
      case 'indent':
        insertTextAtCursor('&nbsp;&nbsp;&nbsp;&nbsp;');
        break;
      case 'space':
        insertTextAtCursor(' '); // Single space
        break;
      case 'emSpace':
        insertTextAtCursor('&emsp;'); // Wide space
        break;
      default:
        break;
    }
  };

  const insertTemplate = (templateType) => {
    switch (templateType) {
      case 'table':
        insertTextAtCursor(
          '\n| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |\n| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |\n\n'
        );
        break;
      case 'codeBlock':
        insertTextAtCursor(
          '\n```javascript\n// Your code here\nconst hello = "world";\nconsole.log(hello);\n```\n'
        );
        break;
      case 'quote':
        insertTextAtCursor('\n> Your quote here\n> Another line of quote\n\n');
        break;
      case 'checklist':
        insertTextAtCursor(
          '\n- [ ] Task 1\n- [ ] Task 2\n- [x] Completed task\n\n'
        );
        break;
      case 'date':
        const today = new Date().toISOString().split('T')[0];
        insertTextAtCursor(` **${today}** `);
        break;
      default:
        break;
    }
  };

  const formatSelectedText = (formatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      // No selection, just insert formatting markers
      switch (formatType) {
        case 'bold':
          insertTextAtCursor('**Bold text**');
          break;
        case 'italic':
          insertTextAtCursor('*Italic text*');
          break;
        case 'h1':
          insertTextAtCursor('# Heading 1\n');
          break;
        case 'h2':
          insertTextAtCursor('## Heading 2\n');
          break;
        case 'h3':
          insertTextAtCursor('### Heading 3\n');
          break;
        case 'link':
          insertTextAtCursor('[Link text](https://example.com)');
          break;
        case 'image':
          insertTextAtCursor('![Alt text](https://example.com/image.jpg)');
          break;
        case 'list':
          insertTextAtCursor(
            '\n- List item\n- Another item\n- Yet another item\n'
          );
          break;
        case 'orderedList':
          insertTextAtCursor(
            '\n1. First item\n2. Second item\n3. Third item\n'
          );
          break;
      }
    } else {
      // Apply formatting to selected text
      const selectedText = content.substring(start, end);

      let newText;
      switch (formatType) {
        case 'bold':
          newText = `**${selectedText}**`;
          break;
        case 'italic':
          newText = `*${selectedText}*`;
          break;
        case 'h1':
          newText = `# ${selectedText}`;
          break;
        case 'h2':
          newText = `## ${selectedText}`;
          break;
        case 'h3':
          newText = `### ${selectedText}`;
          break;
        case 'link':
          newText = `[${selectedText}](https://example.com)`;
          break;
        case 'image':
          newText = `![${selectedText}](https://example.com/image.jpg)`;
          break;
        case 'code':
          newText = `\`${selectedText}\``;
          break;
        default:
          newText = selectedText;
      }

      setContent(
        content.substring(0, start) + newText + content.substring(end)
      );

      // Restore focus and selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + newText.length,
          start + newText.length
        );
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', tags);
      formData.append('isDraft', isDraft.toString());

      // Only append image if it exists
      if (image) {
        formData.append('image', image);
      }

      // Call server action
      const result = await addBlog(formData);

      if (result.success) {
        toast.success(
          isDraft
            ? 'Draft saved successfully!'
            : 'Blog post published successfully!'
        );
        // Clear draft from local storage if published
        if (!isDraft) localStorage.removeItem('blogDraft');
        router.push('/blogs'); // Redirect to blogs page
        router.refresh(); // Refresh the page data
      } else {
        toast.error(result.message || 'Failed to create blog post');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    setIsDraft(true);
    // Then submit the form
    document.getElementById('blog-form').requestSubmit();
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Create New Blog Post
          </h1>

          {autoSaveStatus && (
            <div className="mb-4 text-sm text-green-600 dark:text-green-400 flex items-center">
              <Save className="w-4 h-4 mr-2" />
              {autoSaveStatus}
            </div>
          )}

          <form id="blog-form" className="space-y-6" onSubmit={handleSubmit}>
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                required
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
                      type="button"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Hash className="w-4 h-4 mr-2" />
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas (e.g., javascript, react, nextjs)"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Enhanced Markdown Editor with Preview */}
            <div ref={editorRef}>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                    {wordCount} words | {charCount} characters
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPreview(false)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      !isPreview
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPreview(true)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      isPreview
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {/* Enhanced Toolbar */}
              <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-850 rounded-t-lg border border-gray-300 dark:border-gray-600 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => formatSelectedText('h1')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('h2')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('h3')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Heading 3"
                >
                  H3
                </button>
                <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>

                {/* Spacing Controls */}
                <button
                  type="button"
                  onClick={() => insertSpacing('paragraph')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Add Paragraph Break"
                >
                  <Type size={14} className="inline" /> Para
                </button>
                <button
                  type="button"
                  onClick={() => insertSpacing('lineBreak')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Add Line Break"
                >
                  <ArrowDown size={14} className="inline" /> Break
                </button>
                <button
                  type="button"
                  onClick={() => insertSpacing('horizontalRule')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Add Horizontal Rule"
                >
                  <Minus size={14} className="inline" /> Divider
                </button>
                <button
                  type="button"
                  onClick={() => insertSpacing('emSpace')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Add Wide Space"
                >
                  ␣ Space
                </button>
                <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>

                <button
                  type="button"
                  onClick={() => formatSelectedText('bold')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 font-bold"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('italic')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 italic"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('code')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 font-mono"
                  title="Inline Code"
                >
                  {'</>'}
                </button>
                <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
                <button
                  type="button"
                  onClick={() => formatSelectedText('list')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Bullet List"
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('orderedList')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Numbered List"
                >
                  1. List
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('link')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Insert Link"
                >
                  🔗 Link
                </button>
                <button
                  type="button"
                  onClick={() => formatSelectedText('image')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Insert Image"
                >
                  🖼️ Image
                </button>
                <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertTemplate('quote')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Blockquote"
                >
                  " Quote
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('table')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Insert Table"
                >
                  <Table size={14} className="inline" /> Table
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('codeBlock')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Code Block"
                >
                  {'{ }'}
                </button>
                <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertTemplate('date')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Insert Date"
                >
                  <Calendar size={14} className="inline" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplate('checklist')}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Insert Checklist"
                >
                  <CheckSquare size={14} className="inline" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Insert Emoji"
                >
                  <Smile size={14} className="inline" />
                </button>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute z-10">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}

              {!isPreview ? (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your content in Markdown... Use the toolbar above to format your text."
                  className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-b-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  required
                />
              ) : (
                <div className="prose dark:prose-invert max-w-full p-4 border border-gray-300 dark:border-gray-600 rounded-b-lg bg-white dark:bg-gray-700 h-64 overflow-auto">
                  {content ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-gray-400">Preview will appear here...</p>
                  )}
                </div>
              )}

              {/* Keyboard shortcuts help */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <p>
                  <strong>Formatting:</strong> Use Markdown shortcuts like
                  **bold**, *italic*, # headings, etc.
                </p>
                <p className="mt-1">
                  <strong>Spacing:</strong> Use "Para" button for new
                  paragraphs, "Break" for line breaks, "Divider" for horizontal
                  rules, and "Space" for extra spacing.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                onClick={() => setIsDraft(false)}
              >
                {isSubmitting && !isDraft ? 'Publishing...' : 'Publish Post'}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={saveDraft}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting && isDraft ? 'Saving...' : 'Save as Draft'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
