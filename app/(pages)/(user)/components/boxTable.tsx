import { cx } from "class-variance-authority";

const BoxTable = ({ children }: React.PropsWithChildren) => (
  <div className="my-4 first:mt-0">{children}</div>
);

const BoxRow = ({
  children,
  header,
}: React.PropsWithChildren<{
  header?: boolean;
}>) => {
  const styles = header ? "border-b-2" : "border-b";
  return (
    <div
      className={cx(
        "flex flex-row gap-x-5 flex-wrap text-sm items-center border-foreground/10",
        styles
      )}
    >
      {children}
    </div>
  );
};

const BoxCol = ({
  children,
  label,
  header,
}: React.PropsWithChildren<{ label?: boolean; header?: boolean }>) => {
  const Comp = header ? "h4" : "div";
  return (
    <Comp
      className={cx("flex-1 leading-loose", {
        "text-xs text-foreground font-semibold tracking-wide my-2 leading-normal font-mono":
          header,
        "text-muted-foreground": label,
      })}
    >
      {children}
    </Comp>
  );
};

export { BoxTable, BoxRow, BoxCol };
