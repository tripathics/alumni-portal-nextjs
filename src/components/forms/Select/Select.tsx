import { InputError } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import FieldWrapper from "../FieldWrapper";
import { cn } from "@/lib/utils";

export interface SelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean | string;
  disabled?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}
const Select: React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
> = forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      options,
      required = false,
      disabled = false,
      error,
    },
    ref
  ) => {
    return !options || !Array.isArray(options) ? (
      <p>Invalid options array</p>
    ) : (
      <FieldWrapper>
        <Label
          htmlFor={name}
          label={`Select ${label.toLowerCase()}`}
          required={!!required}
          filled
        >
          <select
            className={cn("font-sans text-base leading-5 relative bg-transparent py-3 border-b border-input/20 outline-hidden w-full focus:border-input/80", {
              "border-error/80": !!error
            })}
            disabled={disabled}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            defaultValue=""
          >
            <option value="" disabled>
              Select {label}..
            </option>
            {options.map(({ label, value }, index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Label>
        {error &&
          (!Array.isArray(error) ? (
            <InputError>{error.message as string}</InputError>
          ) : (
            error.map((err, index) => (
              <InputError key={index}>{err.message}</InputError>
            ))
          ))}
      </FieldWrapper>
    );
  }
);

Select.displayName = "Select";

export default Select;
