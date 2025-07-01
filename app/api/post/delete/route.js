import { connect } from '@/app/lib/mongodb/mongoose';
import Post from '@/app/lib/models/post.model';
import { currentUser } from '@clerk/nextjs/server';

export async function DELETE(req) {
  try {
    const user = await currentUser();
    if (!user) return new Response('Unauthorized', { status: 401 });

    await connect();

    const { postId } = await req.json();

    const post = await Post.findById(postId);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    if (
      user.publicMetadata.userMongoId !== post.userMongoId.toString() &&
      user.publicMetadata.isAdmin !== true
    ) {
      return new Response('Unauthorized', { status: 401 });
    }

    await post.deleteOne();

    return new Response(
      JSON.stringify({ message: 'Post deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete post error:', error);
    return new Response('Server error', { status: 500 });
  }
}
