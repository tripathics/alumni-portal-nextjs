"use client";
import TextField from "@/components/forms/TextField/TextField";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { Mail as MailIcon, Key as KeyIcon } from "lucide-react";
import Alert from "@/components/custom-ui/Alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthHeader from "@/components/layouts/AuthHeader";
import { useSessionApi } from "@/state/session";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { login } = useSessionApi();

  const onSubmit = async (data: FieldValues) => {
    const res = await login.exec({
      params: data as { email: string; password: string },
    });
    if (!!searchParams.get("redirect")) {
      const redirectUrl = searchParams.get("redirect");
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    } else if (res?.user?.role.includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col gap-5 max-w-md m-auto">
        <AuthHeader title="Sign in to NIT AP Alumni" />
        <div className="*:last:mb-0">
          {searchParams.get("redirect") && (
            <Alert>Please login to continue</Alert>
          )}
          {login.error && (
            <Alert
              isOpen={!!login.error}
              severity="error"
              onClose={() => login.reset()}
            >
              {login.error.message}
            </Alert>
          )}
        </div>
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                type="text"
                required
                label="Email"
                Icon={MailIcon}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                })}
                value={watch("email")}
                error={errors["email"]}
              />
              <TextField
                type="password"
                required
                label="Password"
                Icon={KeyIcon}
                {...register("password", { required: "Password is required" })}
                value={watch("password")}
                error={errors["password"]}
              />
              <div className="w-full flex *:grow">
                <Button loading={login.loading} type="submit">
                  {login.loading ? "Signing in" : "Sign in"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-3 text-base text-center">
            <p>
              Forgot your password?{" "}
              <Link className="link" href="/reset-password">
                Reset it here
              </Link>
            </p>
            <p>
              {"Don't have an account? "}
              <Link className="link" href="/register">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
