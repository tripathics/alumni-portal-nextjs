import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Label from "../../ui/label";
import { Input, InputError } from "@/components/ui/input";

export interface NumberFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  value: string;
  required?: boolean | string;
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const NumberField: React.ForwardRefExoticComponent<
  NumberFieldProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      value,
      required = false,
      disabled = false,
      min,
      max,
      error,
    },
    ref
  ) => {
    if ((min && typeof min !== "number") || (max && typeof max !== "number")) {
      return <p>Invalid range</p>;
    }

    const range: { min?: number; max?: number } = {};
    if (min) range.min = typeof min === "string" ? parseInt(min) : min;
    if (max) range.max = typeof max === "string" ? parseInt(max) : max;
    return (
      <div className="my-10 first:mt-3">
        <Label
          htmlFor={name}
          label={label}
          required={!!required}
          filled={value?.length > 0}
        >
          <Input
            type="number"
            {...range}
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        </Label>
        {error && <InputError>{error.message as string}</InputError>}
      </div>
    );
  }
);

NumberField.displayName = "NumberField";

export default NumberField;
