import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { InputError } from "@/components/ui/input";
import FieldWrapper from "../FieldWrapper";

export interface TextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  name: string;
  label: string;
  value: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  required?: boolean | string;
  disabled?: boolean;
}
const TextareaInput: React.ForwardRefExoticComponent<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>
> = forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      error,
      required = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <FieldWrapper>
        <label
          htmlFor={name}
          data-name={`${label}${required ? "" : " (optional)"}`}
          className="relative text-xs text-input focus-within:text-foreground transition-colors duration-100 flex flex-col gap-2 before:content-[attr(data-name)] before:absolute before:block before:pb-1 before:-translate-y-full overflow-visible before:text-xs before:text-input before:transition-colors before:duration-100"
        >
          <Textarea
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={label}
          />
        </label>
        {error && <InputError>{error.message as string}</InputError>}
      </FieldWrapper>
    );
  }
);

TextareaInput.displayName = "TextareaInput";

export default TextareaInput;
