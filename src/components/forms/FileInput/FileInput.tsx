import { Controller } from "react-hook-form";
import { Upload as UploadIcon } from "lucide-react";
import {
  Control,
  FieldValues,
  UseFormWatch,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import { InputError } from "@/components/ui/input";

interface FileInputProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  multiple?: boolean;
  watch: UseFormWatch<FieldValues>;
  required?: string | boolean;
  allowedFormats?: string[];
  /**
   * The maximum file size allowed in bytes.
   */
  maxFileSize?: number;
  /**
   * The minimum file size allowed in bytes.
   */
  minFileSize?: number;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}
const FileInput: React.FC<FileInputProps> = ({
  control,
  name,
  label = null,
  multiple = false,
  watch,
  required = false,
  allowedFormats = [],
  maxFileSize,
  minFileSize,
  error,
}) => {
  const files = watch(name);
  const fileName = Array.isArray(files)
    ? files.map((file) => file.name).join(", ")
    : null;

  const checkFileType = (values: File[]) => {
    if (allowedFormats) {
      if (values) {
        for (const file of values) {
          if (!allowedFormats.includes(file.type)) {
            return "Inavalid file format";
          }
        }
      }
    }
    return true;
  };

  const checkFileSize = (values: File[]) => {
    if (maxFileSize) {
      for (const file of values) {
        if (file.size > maxFileSize) {
          return `File size should be less than ${maxFileSize / 1024} KB`;
        }
      }
    }
    if (minFileSize) {
      for (const file of values) {
        if (file.size < minFileSize) {
          return `File size should be greater than ${minFileSize / 1024} KB`;
        }
      }
    }
    return true;
  };

  return (
    <>
      <div className="flex gap-2">
        <Controller
          control={control}
          rules={{
            required: required,
            validate: {
              checkFileType,
              checkFileSize,
            },
          }}
          name={name}
          render={({ field }) => (
            <label
              tabIndex={0}
              className={buttonVariants({
                variant: "outline",
                className: "cursor-pointer",
              })}
            >
              <UploadIcon className="w-5 stroke-2" />
              {files?.length ? "Change" : "Upload"} {label ? label : "File"}
              <input
                {...field}
                className="hidden"
                type="file"
                multiple={multiple}
                value={field.value?.fileName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(
                    Object.values(e.target.files ? e.target.files : {})
                  );
                }}
                accept={allowedFormats.join(", ")}
              />
            </label>
          )}
        />
      </div>
      {fileName && (
        <p className="text-muted text-sm mt-2">Files selected: {fileName}</p>
      )}
      {error && (
        <InputError>{error.message as string}</InputError>
      )}
    </>
  );
};

export default FileInput;
