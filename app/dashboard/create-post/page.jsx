'use client';

import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useCreatePostMutation } from '@/lib/redux/api/blogApi';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { useCreatePostMutation } from '@/app/lib/redux/api/blogApi';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }
    setImageUploadError(null);
    setImageUploadProgress(0);

    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', 'blog_upload'); // Cloudinary preset

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/du13jixza/image/upload',
        {
          method: 'POST',
          body: formDataCloud,
        }
      );
      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setFormData({ ...formData, image: data.secure_url });
      setImageUploadProgress(100);
    } catch (err) {
      console.error(err);
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createPost({
        ...formData,
        userMongoId: user.publicMetadata.userMongoId,
      }).unwrap();

      router.push(`/post/${result.slug}`);
    } catch (err) {
      console.error('Post publish failed:', err);
    }
  };

  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata?.isAdmin) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">Create Post</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            required
            className="p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <select
            required
            className="p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
               className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleUploadImage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={imageUploadProgress && imageUploadProgress !== 100}
            >
              {imageUploadProgress && imageUploadProgress !== 100
                ? `Uploading ${imageUploadProgress}%`
                : 'Upload Image'}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-500 text-sm">{imageUploadError}</p>
          )}

          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded"
              className="w-full h-64 object-cover rounded"
            />
          )}

          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            required
            onChange={(value) =>
              setFormData({ ...formData, content: value })
            }
          />

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">Post publish failed.</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <h1 className="text-center text-3xl my-7 font-semibold">
      You are not authorized to view this page
    </h1>
  );
}
