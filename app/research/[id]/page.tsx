export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase/queries";
import ResearchDetailClient from "@/components/features/research/ResearchDetailClient";

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostBySlug(id);
  if (!post) notFound();

  // Fetch previous/next post titles
  const allPosts = await getBlogPosts();
  const previousPost = post.previous_post_slug
    ? allPosts.find((p) => p.slug === post.previous_post_slug)
    : null;
  const nextPost = post.next_post_slug
    ? allPosts.find((p) => p.slug === post.next_post_slug)
    : null;

  return (
    <ResearchDetailClient
      post={post}
      previousPost={
        previousPost
          ? { slug: previousPost.slug, title: previousPost.title }
          : null
      }
      nextPost={
        nextPost
          ? { slug: nextPost.slug, title: nextPost.title }
          : null
      }
    />
  );
}
