import { Suspense } from "react";
import Login from "./login";

const Page = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default Page;
