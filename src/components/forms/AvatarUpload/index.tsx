import AvatarPreview from "@/components/custom-ui/Avatar/AvatarPreview";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrashIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

interface AvatarUploadProps {
  avatar: string | null;
  updateAvatar: (avatar: File) => void;
  loading?: boolean;
}
const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatar,
  updateAvatar,
  loading,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [fileUrl, setFileUrl] = useState(avatar);

  const onSubmit = async (data: FieldValues) => {
    updateAvatar(data.avatar);
  };

  const checkFileType = (file: File): string | true => {
    if (!file) {
      return true;
    }
    if (
      !["image/webp", "image/png", "image/jpeg", "image/jpg"].includes(
        file.type
      )
    ) {
      return "Inavalid file format";
    }
    return true;
  };

  const checkFileSize = (file: File): string | true => {
    if (!file) {
      return true;
    }
    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    const minFileSize = 10 * 1024; // 10kB in bytes
    if (file.size > maxFileSize) {
      return `File size should be less than ${maxFileSize / (1024 * 1024)} MB`;
    }
    if (file.size < minFileSize) {
      return `File size should be greater than ${minFileSize / 1024} kB`;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AvatarPreview avatar={fileUrl} className="w-[200px] h-[200px]" />
      <p className="text-center">
        For best results, use an image at least 200px by 200px in .jpg format
      </p>
      {errors.avatar && (
        <p className="text-red-700">{errors.avatar.message as string}</p>
      )}
      <form className="w-full">
        <div className="flex flex-wrap gap-2 *:flex-1">
          <Controller
            control={control}
            rules={{
              validate: {
                checkFileType, // Use the checkFileType function as a validation rule
                checkFileSize,
              },
            }}
            name="avatar"
            render={({ field }) => (
              <>
                <label
                  tabIndex={0}
                  className={buttonVariants({
                    variant: "outline",
                    size: "default",
                    className: "cursor-pointer",
                  })}
                >
                  <UploadIcon />
                  {fileUrl ? "Change picture" : "Upload picture"}
                  <input
                    {...field}
                    className="hidden"
                    type="file"
                    multiple={false}
                    value={field.value?.fileName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files.length > 0) {
                        field.onChange(e.target.files[0]);
                        setFileUrl(URL.createObjectURL(e.target.files[0]));
                      } else {
                        field.onChange(null);
                        setFileUrl(null);
                      }
                    }}
                  />
                </label>
                {fileUrl && (
                  <Button
                    onClick={() => {
                      field.onChange(null);
                      setFileUrl(null);
                    }}
                    variant="outline"
                  >
                    <TrashIcon />
                    Remove picture
                  </Button>
                )}
              </>
            )}
          />
          {avatar !== fileUrl && (
            <Button
              className="text-base"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AvatarUpload;
