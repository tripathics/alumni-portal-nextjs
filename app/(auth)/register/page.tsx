"use client";
import { TextField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import signupApi, { SignupFormData } from "@/lib/actions/auth/register";
import { Mail as MailIcon, Key as KeyIcon } from "lucide-react";
import axiosInstance from "@/config/axios/client.config";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Alert from "@/components/custom-ui/Alert/";
import { createOtpForSignup } from "@/lib/actions/otp/createOtp";
import { Card, CardContent } from "@/components/ui/card";
import AuthHeader from "@/components/layouts/AuthHeader";
import { useRouter } from "next/navigation";

const OTPForm: React.FC<{
  sendOtp: (formData: FieldValues) => void;
  loading: boolean;
}> = ({ sendOtp, loading }) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(sendOtp)}>
      <TextField
        type="text"
        required
        label="Personal Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        })}
        Icon={MailIcon}
        value={watch("email")}
        error={errors["email"]}
      />
      <div className="w-full flex *:grow">
        <Button loading={loading} type="submit">
          {loading ? "Sending OTP" : "Send OTP"}
        </Button>
      </div>
    </form>
  );
};

const VerifyForm: React.FC<{
  verifyOtp: (formData: FieldValues) => void;
  email: string;
  loading: boolean;
}> = ({ verifyOtp, email, loading }) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email,
      otp: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(verifyOtp)}>
      <TextField
        type="text"
        required
        disabled
        label="Personal Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        })}
        Icon={MailIcon}
        value={email}
        error={errors["email"]}
      />
      <TextField
        type="text"
        required
        label="Enter OTP"
        value={watch("otp")}
        {...register("otp", {
          required: "OTP is required",
          pattern: {
            value: /^\d{6}$/,
            message: "Enter a 6 digit OTP",
          },
        })}
        Icon={KeyIcon}
        error={errors["otp"]}
      />
      <div className="w-full flex *:grow">
        <Button loading={loading} type="submit">
          {loading ? "Verifying OTP" : "Verify OTP"}
        </Button>
      </div>
    </form>
  );
};

const SignupForm: React.FC<{
  signup: (formData: FieldValues) => void;
  email: string;
  loading: boolean;
}> = ({ signup, email, loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email, password: "", confirmPassword: "" },
  });

  return (
    <form onSubmit={handleSubmit(signup)}>
      <TextField
        type="text"
        required
        disabled
        label="Personal Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        })}
        Icon={MailIcon}
        value={watch("email")}
        error={errors["email"]}
      />
      <TextField
        type="password"
        required
        label="Password"
        {...register("password", {
          required: "Password is required",
        })}
        Icon={KeyIcon}
        value={watch("password")}
        error={errors["password"]}
      />
      <TextField
        type="password"
        required
        label="Confirm Password"
        value={watch("confirmPassword")}
        {...register("confirmPassword", {
          required: "Confirm Password is required",
        })}
        Icon={KeyIcon}
        error={errors["confirmPassword"]}
      />
      <div className="w-full flex *:grow">
        <Button loading={loading} type="submit">
          {loading ? "Signing up" : "Sign up"}
        </Button>
      </div>
    </form>
  );
};

const Register = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | React.ReactNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<"otp" | "verify" | "signup">(
    "otp"
  );
  const router = useRouter();

  const signup = async (signupFormData: FieldValues) => {
    try {
      setError(null);
      setLoading(true);
      const data = await signupApi(signupFormData as SignupFormData);
      if (data?.id) {
        toast.success("Account created successfully. Please login.");
        router.push("/login");
      }
    } catch (error) {
      if (error === "User already exists") {
        setError(
          <>
            Email already exists.{" "}
            <Link className="link" href="/login">
              Login?
            </Link>
          </>
        );
      } else {
        setError(error as string);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otpFormData: FieldValues) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axiosInstance.post("/api/otp/verify", {
        email: otpFormData.email,
        otp: otpFormData.otp,
      });
      if (response.data.success) {
        setFormState("signup");
        toast.success("Email verified");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (otpFormData: FieldValues) => {
    try {
      setError(null);
      setLoading(true);
      const data = await createOtpForSignup(otpFormData.email);
      if (data?.success) {
        setEmail(otpFormData.email);
        setFormState("verify");
        toast.info("OTP sent");
      }
    } catch (error) {
      const err = error as Error;
      if (err.message) {
        if (err.message === "User already exists") {
          setError(
            <>
              The email address already exists.{" "}
              <Link className="link" href="/login">
                Login?
              </Link>
            </>
          );
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col gap-6 max-w-md m-auto">
        <AuthHeader title="Sign up for NIT AP Alumni" />
        <Alert
          className="mb-0"
          isOpen={!!error}
          onClose={() => setError(null)}
          severity="error"
        >
          {error}
        </Alert>
        <Card>
          <CardContent>
            {formState === "otp" ? (
              <OTPForm loading={loading} sendOtp={sendOtp} />
            ) : formState === "verify" ? (
              <VerifyForm
                loading={loading}
                verifyOtp={verifyOtp}
                email={email as string}
              />
            ) : (
              <SignupForm
                loading={loading}
                signup={signup}
                email={email as string}
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>
              Already have an account?{" "}
              <Link className="link" href="/login">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
