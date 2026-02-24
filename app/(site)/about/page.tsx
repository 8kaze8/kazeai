export const dynamic = "force-dynamic";

import { getBlogPosts } from "@/lib/supabase/queries";
import ResearchLabClient from "@/components/features/research/ResearchLabClient";

export default async function ResearchPage() {
  const blogPosts = await getBlogPosts();
  return <ResearchLabClient blogPosts={blogPosts} />;
}
