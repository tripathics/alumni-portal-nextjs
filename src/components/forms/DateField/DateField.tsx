import Label from "@/components/ui/label";
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { Input, InputError } from "@/components/ui/input";

export interface DateFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  type?: "date" | "month" | "week" | "time" | "datetime-local";
  required?: boolean | string;
  disabled?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}
const DateField: React.ForwardRefExoticComponent<
  DateFieldProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      type = "date",
      required = false,
      disabled = false,
      error,
    }: DateFieldProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    if (!["date", "month", "week", "time", "datetime-local"].includes(type)) {
      return <p>Invalid date type</p>;
    }

    return (
      <div className="my-10 first:mt-3">
        <Label htmlFor={name} required={!!required} label={label} filled>
          <Input
            type={type}
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

DateField.displayName = "DateField";

export default DateField;
