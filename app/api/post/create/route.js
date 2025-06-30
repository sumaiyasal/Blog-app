import Post from '@/app/lib/models/post.model';
import { connect } from '@/app/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();

    if (
      !user ||
      user.publicMetadata.userMongoId !== data.userMongoId ||
      user.publicMetadata.isAdmin !== true
    ) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const slug = data.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = await Post.create({
      userMongoId: user.publicMetadata.userMongoId,
      content: data.content,
      title: data.title,
      image: data.image,
      category: data.category,
      slug,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response(JSON.stringify({ message: 'Error creating post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
