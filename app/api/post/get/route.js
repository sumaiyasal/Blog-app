import Post from "@/app/lib/models/post.model";
import { connect } from "@/app/lib/mongodb/mongoose";

export async function POST(req) {
  await connect();

  try {
    const data = await req.json();

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;

    const filter = {
      ...(data.userId && { userId: data.userId }),
      ...(data.category && data.category !== 'null' && data.category !== 'undefined' && { category: data.category }),
      ...(data.slug && { slug: data.slug }),
      ...(data.postId && { _id: data.postId }),
      ...(data.searchTerm && {
        $or: [
          { title: { $regex: data.searchTerm, $options: 'i' } },
          { content: { $regex: data.searchTerm, $options: 'i' } },
        ],
      }),
    };

    const posts = await Post.find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filter);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return new Response(
      JSON.stringify({ posts, totalPosts, lastMonthPosts }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error getting posts:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch posts' }),
      { status: 500 }
    );
  }
}
