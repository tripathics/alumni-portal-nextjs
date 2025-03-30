import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { PencilIcon, X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

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
  const {
    register,
    watch,
    control,
    formState: { isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "Celebrating the 10th convocation of NIT Arunachal Pradesh",
      description:
        "On December 19, we welcomed approximately 200, 2023 graduates to the 10th convocation ceremony of the National Institute of Technology Arunachal Pradesh",
      heroImage: null as File | null,
    },
  });
  const file = watch("heroImage");
  const fileUrl = file ? URL.createObjectURL(file) : "/hero.png";

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="relative overflow-hidden border border-border/20">
      <Image
        src={fileUrl}
        alt="Background"
        fill
        quality={100}
        className="object-cover"
      />
      <div className="absolute -left-20 -right-20 h-full md:bg-linear-(--page-header-mask-gradient) bg-linear-(--page-header-mobile-gradient)" />
      <div className="relative py-16 container">
        <form
          className="max-w-2xl flex flex-col justify-around min-h-[60vh]"
          onSubmit={handleSubmit(onSubmit)}
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
              <Button size="lg" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            {isDirty && (
              <div>
                <Button size="lg" type="submit">
                  Update
                </Button>
              </div>
            )}
          </div>
        </form>
        <form className="absolute top-4 right-0 flex flex-col gap-4">
          <Controller
            control={control}
            name="heroImage"
            render={({ field }) => (
              <>
                <label
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                    className: "p-2 size-10",
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
                  <PencilIcon />
                </label>
                {file && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="p-2 size-10"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    <X />
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
