import { PencilIcon, UserSquare } from "lucide-react";
import Image from "next/image";
import React, { Ref, useImperativeHandle } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Alert from "@/components/custom-ui/Alert";
import { useSession } from "@/state/session";
import { userAvatarUrl } from "@/lib/utils";

export const AvatarUpload: React.FC<{
  ref: Ref<{ submit: () => void }>;
  selectedAvatarFile?: File | null;
}> = ({ ref, selectedAvatarFile }) => {
  const { user } = useSession();

  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: selectedAvatarFile || null,
    },
  });
  const file = watch("avatar");

  const fileUrl = file
    ? URL.createObjectURL(file)
    : user?.avatar
    ? userAvatarUrl(user?.avatar)
    : null;

  useImperativeHandle(ref, () => ({
    submit: () => {
      return new Promise<FieldValues | null>((resolve, reject) => {
        if (errors.avatar) {
          reject(errors.avatar.message);
          return;
        }
        handleSubmit((data) => resolve(data))();
      });
    },
  }));

  return (
    <main className="flex flex-col">
      <form className="flex flex-col w-full items-center gap-8">
        <div className="relative mb-4 w-fit">
          <div className="relative rounded-full bg-card border border-muted/20 w-50 h-50 overflow-hidden flex items-center justify-center">
            {fileUrl ? (
              <Image
                width={200}
                height={200}
                className="w-full h-full object-cover object-center"
                src={fileUrl}
                alt="Avatar"
              />
            ) : (
              <UserSquare
                className="text-muted w-24 h-24 opacity-20"
                strokeWidth={2.25}
              />
            )}
          </div>
          <Controller
            name="avatar"
            control={control}
            rules={{
              validate: {
                lessThan2MB: (file?: File | null) =>
                  !file ||
                  file?.size < 2 * 1024 * 1024 ||
                  "File size should be less than 2MB",
                acceptedFormats: (file?: File | null) =>
                  !file ||
                  ["image/jpeg"].includes(file?.type) ||
                  "Only JPEG files are allowed",
              },
            }}
            render={({ field }) => (
              <label className="absolute bottom-0 right-0 rounded-full h-12 w-12 bg-primary flex items-center justify-center hover:bg-primary/90 cursor-pointer transition-colors">
                <input
                  type="file"
                  className="hidden"
                  {...field}
                  value=""
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.files ? e.target.files[0] : null);
                  }}
                  accept="image/*"
                />
                <PencilIcon className="text-palette-foreground-dark dark:text-palette-foreground h-4 w-4" />
              </label>
            )}
          />
        </div>
        {errors.avatar && <Alert>{errors.avatar?.message as string}</Alert>}
      </form>
    </main>
  );
};
