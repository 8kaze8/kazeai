import { DesktopEnvironment } from "@/components/layout/DesktopEnvironment";
import { DiceRollOverlay } from "@/components/features/dice/DiceRollOverlay";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopEnvironment>
      <DiceRollOverlay />
      {children}
    </DesktopEnvironment>
  );
}
