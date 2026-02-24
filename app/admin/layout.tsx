export const metadata = {
  title: "Admin | KazeOS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#102222] overflow-auto">
      {children}
    </div>
  );
}
