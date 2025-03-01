import React, { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Label from "../../ui/label";
import { Input, InputError } from "@/components/ui/input";
import FieldWrapper from "../FieldWrapper";

export interface TextFieldProps {
  pattern?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  type: "text" | "email" | "password";
  value: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  required?: boolean | string;
  disabled?: boolean;
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
}

const TextField: React.ForwardRefExoticComponent<
  TextFieldProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    {
      pattern = ".*",
      onChange,
      onBlur,
      name,
      label,
      type = "text",
      value,
      error,
      required = false,
      disabled = false,
      // Icon,
    },
    ref
  ) => {
    return (
      <FieldWrapper>
        <Label label={label} required={!!required} filled={!!value}>
          <Input
            name={name}
            id={name}
            pattern={pattern}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            ref={ref}
            error={error}
          />
        </Label>
        {error?.message && <InputError>{error.message as string}</InputError>}
      </FieldWrapper>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
