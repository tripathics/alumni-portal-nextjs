export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="__layout min-h-screen py-12">
      <main className="__layout-main">{children}</main>
    </div>
  );
}
