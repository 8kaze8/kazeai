import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import type { BlogPost } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-red-400 text-xs">
        Error loading posts: {error.message}
      </p>
    );
  }
  const posts = (data ?? []) as BlogPost[];


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
            BLOG POSTS
          </h1>
          <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
            {posts?.length ?? 0} posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-[#25f4f4] text-[#102222] text-xs px-3
            py-1.5 rounded font-bold"
        >
          New Post
        </Link>
      </div>

      <div className="border border-[#25f4f4]/10 rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#152a2a] text-[#25f4f4]/60">
              <th className="text-left p-2 font-medium">Title</th>
              <th className="text-left p-2 font-medium">Category</th>
              <th className="text-left p-2 font-medium">Date</th>
              <th className="text-left p-2 font-medium">Featured</th>
              <th className="text-right p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr
                key={post.id}
                className="border-b border-[#25f4f4]/10
                  hover:bg-[#152a2a]/50 transition-colors"
              >
                <td className="p-2 text-white">{post.title}</td>
                <td className="p-2 text-[#25f4f4]/60">
                  {post.category}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {post.date}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {post.featured ? "Yes" : "No"}
                </td>
                <td className="p-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="text-[#25f4f4]/60
                        hover:text-[#25f4f4] text-xs
                        transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton table="blog_posts" id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-[#25f4f4]/40"
                >
                  No posts yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
