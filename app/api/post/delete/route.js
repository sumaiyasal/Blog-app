import { connect } from '@/app/lib/mongodb/mongoose';
import Post from '@/app/lib/models/post.model';
import { currentUser } from '@clerk/nextjs/server';

export async function DELETE(req) {
  const user = await currentUser();
  try {
    await connect();
    const body = await req.json();
    const { postId, userId } = body;

    if (
      !user ||
      user.publicMetadata.userMongoId !== userId ||
      user.publicMetadata.isAdmin !== true
    ) {
      return new Response('Unauthorized', { status: 401 });
    }

    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      userMongoId: userId,
    });

    if (!deletedPost) {
      return new Response('Post not found', { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return new Response('Server error', { status: 500 });
  }
}
