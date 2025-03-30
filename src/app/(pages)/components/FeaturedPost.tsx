import { cx } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const FeaturedPost: React.FC<{
  title: string;
  description: string;
  image: string;
  created_at: string;
  links?: {
    title: string;
    url: string;
  }[];
  tags?: string[];
  colorScheme?: "default" | "accent" | "grey";
}> = ({ title, description, image, links = [], colorScheme = "accent" }) => {
  const colorSchemes = {
    default: "",
    accent: "bg-card text-foreground",
    grey: "bg-palette-muted text-palette-foreground-dark",
  };
  // const btnVariant = {
  //   default: "default",
  //   accent: "default",
  //   grey: "outline",
  // };
  return (
    <div className={colorSchemes[colorScheme]}>
      <div
        className={cx("container py-8 flex md:gap-12 gap-8 reverse *:flex-1", {
          ["flex-row-reverse"]: colorScheme === "accent",
        })}
      >
        <div className="w-full">
          <h2 className="font-semibold text-2xl mb-6">{title}</h2>
          <p className="text-xl font-light line-clamp-4">{description} </p>
          <div className="mt-8">
            {links.map(({ title, url }, i) => (
              <Link
                key={i}
                className={buttonVariants({
                  size: "lg",
                  variant: ["default", "accent"].includes(colorScheme)
                    ? "default"
                    : "fill",
                })}
                href={url}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Image
            src={image}
            alt={title}
            height={300}
            width={500}
            className="w-full h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
