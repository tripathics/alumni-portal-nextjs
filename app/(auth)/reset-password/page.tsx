"use client";
import React, { useState } from "react";
import Link from "next/link";
import Alert from "@/components/custom-ui/Alert/";
import { Card, CardContent } from "@/components/ui/card";
import AuthHeader from "@/components/layouts/AuthHeader";
import MultistepForm from "@/components/MultistepForm";
import OTPForm, {
  ResetPasswordForm,
  VerifyForm,
} from "@/components/ResetPasswordForm/forms/forms";
import { useMutation } from "@tanstack/react-query";
import { createOtpForAuth } from "@/lib/actions/otp/createOtp";
import verifyOtp from "@/lib/actions/otp/verifyOtp";
import updatePassword, {
  UpdatePasswordFormData,
} from "@/lib/actions/auth/updatePassword";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>(null);
  const ref = React.useRef<{ submit: () => void }>(null);
  const router = useRouter();

  const sendOtpMutation = useMutation({
    mutationFn: createOtpForAuth,
    onMutate: () => {
      setError(null);
    },
    onSuccess: () => {
      toast.info("OTP sent");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("Email verified");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const changeAccountPasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated. Please login.");
      router.push("/login");
    },
    onError: (err) => {
      setError(err.message);
    },
  });
  const loading =
    sendOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    changeAccountPasswordMutation.isPending;

  return (
    <div className="container">
      <div className="flex flex-col gap-6 max-w-md m-auto">
        <AuthHeader title="Account recovery" />
        <Alert isOpen={!!error} onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
        <Card>
          <CardContent>
            <MultistepForm
              ref={ref}
              forms={[
                {
                  comp: OTPForm,
                  onSubmit: async (data) =>
                    await sendOtpMutation.mutateAsync(data.email),
                },
                {
                  comp: VerifyForm,
                  onSubmit: async (data) =>
                    await verifyOtpMutation.mutateAsync(
                      data as { email: string; otp: string }
                    ),
                },
                {
                  comp: ResetPasswordForm,
                  onSubmit: async (data) =>
                    await changeAccountPasswordMutation.mutateAsync(
                      data as UpdatePasswordFormData
                    ),
                },
              ]}
              sharedState={formData}
              setSharedState={setFormData}
            />
            <div className="flex justify-end">
              <Button
                loading={loading}
                size="lg"
                onClick={() => {
                  setError(null);
                  ref.current?.submit();
                }}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
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

export default Page;
