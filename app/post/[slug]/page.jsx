import PostPageClient from '@/app/Component/PostPageClient';

export default async function PostPage(context) {
  const { slug } = await context.params;

  return <PostPageClient slug={slug} />;
}
