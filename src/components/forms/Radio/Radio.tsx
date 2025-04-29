import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { InputError } from "@/components/ui/input";
import Label from "@/components/ui/label";
import FieldWrapper from "../FieldWrapper";

export interface RadioProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  options: { label: string; value: string; defaultChecked?: boolean }[];
  required?: boolean | string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}
const Radio: React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    { onChange, onBlur, name, label, options, required = false, error },
    ref
  ) => {
    return !options ? (
      <p>Invalid options array</p>
    ) : (
      <FieldWrapper>
        <Label htmlFor={name} required={!!required} label={label} filled>
          {/* radio group */}
          <div className="flex gap-x-6 gap-y-3 py-3">
            {options.map(({ label, value, defaultChecked }, index) => (
              <div key={index} className="flex">
                <label className="flex items-center gap-2 text-base leading-none">
                  <input
                    className="w-5 h-5"
                    type="radio"
                    name={name}
                    ref={ref}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {label}
                </label>
              </div>
            ))}
          </div>
        </Label>
        {error && <InputError>{error.message as string}</InputError>}
      </FieldWrapper>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
