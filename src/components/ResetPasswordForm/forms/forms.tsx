import SchemaForm from "@/components/forms";
import React from "react";
import { FieldValues } from "react-hook-form";

export const OTPForm: React.FC<{
  onSubmit: (formData: FieldValues) => void;
  ref: React.Ref<{ submit: () => void }>;
}> = ({ onSubmit, ref }) => (
  <>
    <SchemaForm
      schema={[
        {
          type: "section",
          label: "Verify it's you!",
        },
        {
          type: "email",
          name: "email",
          label: "Enter your email",
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        },
      ]}
      onSubmit={onSubmit}
      submitRef={ref}
    />
  </>
);

export const VerifyForm: React.FC<{
  onSubmit: (formData: FieldValues) => void;
  ref: React.Ref<{ submit: () => void }>;
  data: FieldValues;
}> = ({ onSubmit, ref, data }) => (
  <SchemaForm
    schema={[
      {
        type: "section",
        label: "An OTP has been sent to your email",
      },
      {
        type: "email",
        name: "email",
        label: "Enter your email",
        required: "Email is required",
        pattern: {
          value: /^(?!.*@nitap\.ac\.in).*$/,
          message: "Invalid email or @nitap.ac.in domain is not allowed",
        },
        disabled: true,
      },
      {
        type: "text",
        name: "otp",
        label: "Enter OTP",
        required: "OTP is required",
      },
    ]}
    submitRef={ref}
    prefillData={data}
    onSubmit={onSubmit}
  />
);

export const ResetPasswordForm: React.FC<{
  onSubmit: (formData: FieldValues) => void;
  ref: React.Ref<{ submit: () => void }>;
  data: FieldValues;
}> = ({ onSubmit, ref, data }) => (
  <SchemaForm
    schema={[
      {
        type: "email",
        name: "email",
        label: "Enter your email",
        required: "Email is required",
        pattern: {
          value: /^(?!.*@nitap\.ac\.in).*$/,
          message: "Invalid email or @nitap.ac.in domain is not allowed",
        },
        disabled: true,
      },
      {
        type: "password",
        name: "password",
        label: "Enter a new password",
        required: "Password is required",
        autocomplete: "new-password",
      },
      {
        type: "password",
        name: "confirmPassword",
        label: "Confirm Password",
        required: "Confirm Password is required",
        autocomplete: "new-password",
      },
    ]}
    submitRef={ref}
    onSubmit={onSubmit}
    prefillData={data}
  />
);

export default OTPForm;
