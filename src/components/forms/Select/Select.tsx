import { InputError } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

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
      <div className="mt-6 mb-10 first:mt-3">
        <Label
          htmlFor={name}
          label={`Select ${label.toLowerCase()}`}
          required={!!required}
          filled
        >
          <select
            className="font-sans text-base leading-5 relative bg-transparent py-3 border-b border-input/20 outline-hidden w-full focus:border-input/80"
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
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
