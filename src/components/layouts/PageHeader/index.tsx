import { cx } from "class-variance-authority";
import * as motion from "motion/react-client";
import Image from "next/image";

interface PageHeaderProps {
  pageHeading?: string;
  subHeading?: string;
  children?: React.ReactNode;
  bgImage?: string;
  variant?: "default" | "large";
}
const PageHeader: React.FC<PageHeaderProps> = ({
  pageHeading,
  subHeading,
  children,
  bgImage,
  variant = "default",
}) => {
  const variantStyles = {
    default: "gap-4",
    large: "gap-12 md:gap-20 md:min-h-[70vh] min-h-[50vh]",
  };

  return (
    <header className="relative -z-2 bg-palette-background-dark text-palette-foreground-dark overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        className="bg-no-repeat bg-center bg-cover w-full h-full -z-1 absolute bg-background"
      >
        {bgImage && (
          <Image
            src={bgImage}
            alt="Background"
            fill
            objectFit="cover"
            quality={100}
          />
        )}
      </motion.div>
      <div className="absolute w-full h-full -z-1 md:bg-linear-(--page-header-mask-gradient) bg-linear-(--page-header-mobile-gradient)" />
      <motion.div
        transition={{ duration: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cx(
          "container py-10 flex flex-col justify-center",
          variantStyles[variant]
        )}
      >
        {pageHeading && <PageTitle variant={variant} title={pageHeading} />}
        {subHeading && <PageSubtitle variant={variant} subtitle={subHeading} />}
        {children && children}
      </motion.div>
    </header>
  );
};

export const PageTitle: React.FC<{
  title: string;
  variant?: "default" | "large";
}> = ({ title, variant = "default" }) => {
  const variantStyles = {
    default: "text-3xl md:text-4xl",
    large: "md:text-5xl text-4xl max-w-2xl",
  };

  return (
    <h1 className={cx("font-serif font-medium", variantStyles[variant])}>
      {title}
    </h1>
  );
};

export const PageSubtitle: React.FC<{
  subtitle: string;
  variant?: "default" | "large";
}> = ({ subtitle, variant = "default" }) => {
  const variantStyles = {
    default: "md:text-xl text-base",
    large: "md:text-xl text-lg max-w-2xl",
  };

  return <p className={cx("font-light", variantStyles[variant])}>{subtitle}</p>;
};

export default PageHeader;
