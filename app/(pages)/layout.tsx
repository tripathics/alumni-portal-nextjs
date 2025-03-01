import Navbar from "@/components/layouts/navigation/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="__layout">
      <Navbar />
      <main className="__layout-main">{children}</main>
    </div>
  );
}
