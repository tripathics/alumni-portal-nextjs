import Image from "next/image";
import Link from "next/link";

const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <header className="text-center">
    <Link className="block w-fit m-auto" href="/">
      <Image
        loading="eager"
        className="sm:w-24 w-16 h-auto mb-4 dark:invert"
        src="/logo.svg"
        alt="NIT AP Alumni"
        width={0}
        height={0}
      />
    </Link>
    <h1 className="sm:text-3xl text-2xl font-sans font-thin">{title}</h1>
  </header>
);

export default AuthHeader;
