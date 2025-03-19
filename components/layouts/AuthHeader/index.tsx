import Link from "next/link";
import { Logo } from "../Logo";

const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <header className="text-center">
    <Link className="block w-fit m-auto" href="/">
      <Logo className="sm:w-24 w-16 h-auto mb-4 dark:invert" />
    </Link>
    <h1 className="sm:text-3xl text-2xl font-sans font-thin">{title}</h1>
  </header>
);

export default AuthHeader;
