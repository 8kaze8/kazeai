export const dynamic = "force-dynamic";

import { getExperiences } from "@/lib/supabase/queries";
import TimelineClient from
  "@/components/features/timeline/TimelineClient";

export default async function TimelinePage() {
  const experiences = await getExperiences();
  return <TimelineClient experiences={experiences} />;
}
