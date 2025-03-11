import React, { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Label from "../../ui/label";
import { Input, InputError } from "@/components/ui/input";
import FieldWrapper from "../FieldWrapper";
import { LucideIcon } from "lucide-react";

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
  Icon?: LucideIcon;
}

const TextField: React.ForwardRefExoticComponent<
  TextFieldProps &
    React.RefAttributes<HTMLInputElement> &
    React.ComponentProps<"input">
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Icon,
      ...inputProps
    },
    ref
  ) => {
    return (
      <FieldWrapper>
        <Label label={label} required={!!required} filled={!!value}>
          {/* {Icon && <Icon />} */}
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
            {...inputProps}
          />
        </Label>
        {error?.message && <InputError>{error.message as string}</InputError>}
      </FieldWrapper>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
