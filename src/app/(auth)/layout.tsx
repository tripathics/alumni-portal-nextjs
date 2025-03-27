import Image from "next/image";
import Link from "next/link";

export const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <header className="text-center">
    <Link className="block w-fit m-auto" href="/">
      <Image
        className="sm:w-24 w-16 h-auto mb-4"
        src="/nitap-logo.svg"
        alt="NIT AP Alumni"
      />
    </Link>
    <h1 className="sm:text-3xl text-2xl">{title}</h1>
  </header>
);

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
