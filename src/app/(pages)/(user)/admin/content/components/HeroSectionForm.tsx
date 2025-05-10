import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { PencilIcon, Undo2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn, heroImageUrl } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSessionEnabledQuery from "@/hooks/queries/useUserEnabledQuery"
import updateHeroSection from "@/lib/actions/admin/content/updateHeroSection";
import fetchHero from "@/lib/actions/public/fetchHero";
import { queryKey } from "@/lib/constants/queryKey";
import React from "react";
import { toast } from "react-toastify";

const GrowableTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, value, onChange, ...props }) => {
  const commonStyles =
    "block overflow-x-auto p-2 row-start-1 col-start-1 row-end-2 col-end-2 text-palette-foreground-dark  border-2 border-palette-input-dark/20 border-dashed";

  return (
    <div className="grid grid-rows-1 grid-cols-1 relative">
      <textarea
        className={cn(
          "overflow-hidden resize-none hover:bg-palette-background/5 focus:bg-palette-background/5 transition-colors",
          commonStyles,
          className
        )}
        value={value}
        onChange={onChange}
        {...props}
      />
      <div
        className={cn("whitespace-pre-wrap invisible", commonStyles, className)}
      >
        {value}.
      </div>
    </div>
  );
};

const HeroSectionForm = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateHeroSection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.heroSection],
      });
      reset();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const { data: heroData, isLoading } = useSessionEnabledQuery({
    queryKey: [queryKey.heroSection],
    staleTime: Infinity,
    queryFn: fetchHero,
  });

  const {
    register,
    watch,
    control,
    formState: { isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: heroData?.title || "",
      description: heroData?.description || "",
      hero_image: null as File | null,
    },
  });
  const file = watch("hero_image");
  const fileUrl = file
    ? URL.createObjectURL(file)
    : heroData?.hero_image
      ? heroImageUrl(heroData?.hero_image)
      : null;

  React.useEffect(() => {
    if (!isLoading && heroData) {
      setValue("title", heroData.title);
      setValue("description", heroData.description);
    }
    return () => {
      toast.dismiss();
    };
  }, [heroData, isLoading, setValue]);

  return (
    <div className="relative overflow-hidden border border-border/20">
      {fileUrl && (
        <Image
          src={fileUrl}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          unoptimized
        />
      )}
      <div className="absolute -left-20 -right-20 h-full md:bg-linear-(--page-header-mask-gradient) bg-linear-(--page-header-mobile-gradient)" />
      <div className="relative py-16 container">
        <form
          className="max-w-2xl flex flex-col justify-around min-h-[60vh]"
          onSubmit={handleSubmit(
            (data) => {
              console.log(data);
              mutate(data);
            },
            (error) => {
              const { title, description, hero_image } = error;
              const errorMessage =
                title?.message ||
                description?.message ||
                hero_image?.message ||
                "Something went wrong";
              toast.dismiss();
              toast.error(errorMessage);
            }
          )}
        >
          <GrowableTextarea
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            value={watch("title")}
            className="leading-none font-serif font-normal md:text-5xl text-4xl"
          />
          <GrowableTextarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            value={watch("description")}
            className="leading-none font-sans font-light md:text-xl text-lg"
          />
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button size="lg" variant="secondary" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            {isDirty && (
              <div>
                <Button
                  disabled={isLoading}
                  loading={isPending}
                  size="lg"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            )}
          </div>
        </form>
        <form className="absolute top-4 right-0 flex flex-col gap-4">
          <Controller
            rules={{
              validate: {
                lessThan3MB: (file?: File | null) =>
                  !file ||
                  file?.size < 3 * 1024 * 1024 ||
                  "File size should be less than 3MB",
                acceptedFormats: (file?: File | null) =>
                  !file ||
                  [
                    "image/webp",
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                  ].includes(file?.type) ||
                  "Only JPEG, PNG and WEBP files are allowed",
              },
            }}
            control={control}
            name="hero_image"
            render={({ field }) => (
              <>
                <label
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
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
                  <PencilIcon className="size-5" />
                  Edit background
                </label>
                {file && (
                  <Button
                    variant="fill"
                    // size="icon"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    <Undo2 className="size-5" />
                    Revert
                  </Button>
                )}
              </>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default HeroSectionForm;
