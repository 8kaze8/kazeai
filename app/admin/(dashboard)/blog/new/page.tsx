import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          NEW POST
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          Create a new blog post
        </p>
      </div>
      <BlogPostForm />
    </div>
  );
}
