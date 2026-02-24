import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BlogPostForm from "@/components/admin/BlogPostForm";
import type { BlogPost } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const post = data as BlogPost;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          EDIT POST
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          {post.title}
        </p>
      </div>
      <BlogPostForm initialData={post} />
    </div>
  );
}
