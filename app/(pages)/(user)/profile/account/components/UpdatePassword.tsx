"use client";
import React, { useState } from "react";
import Alert from "@/components/custom-ui/Alert/";
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
import { Button } from "@/components/ui/button";
import { useSessionApi } from "@/state/session";

const UpdatePassword = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({});
  const { fetchUser } = useSessionApi();
  const [error, setError] = useState<string | null>(null);
  const ref = React.useRef<{ submit: () => void }>(null);

  const createOtpMutation = useMutation({
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
      toast.success("Password updated");
      fetchUser({ optimistic: true });
      closeModal();
    },
    onError: (err) => {
      setError(err.message);
    },
  });
  const loading =
    createOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    changeAccountPasswordMutation.isPending;

  return (
    <div>
      <Alert isOpen={!!error} onClose={() => setError(null)} severity="error">
        {error}
      </Alert>
      <MultistepForm
        ref={ref}
        forms={[
          {
            comp: OTPForm,
            onSubmit: async (data) =>
              await createOtpMutation.mutateAsync(data.email),
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
    </div>
  );
};

export default UpdatePassword;
