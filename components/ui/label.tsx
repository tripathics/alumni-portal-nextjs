import cx from "classnames";

const Label: React.FC<
  React.ComponentProps<"label"> & {
    label: string;
    filled?: boolean;
    required?: boolean;
    children?: React.ReactNode;
  }
> = ({ label, filled, required, children }) => (
  <label
    data-name={`${label}${required ? "" : " (optional)"}`}
    className={cx(
      {
        ["before:text-xs before:left-0 before:-translate-y-5/2"]: filled,
      },
      "relative bg-transparent block text-input before:content-[attr(data-name)] before:absolute before:text-ellipsis before:text-nowrap before:top-1/2 before:-translate-y-1/2 before:transition-all before:duration-100 before:pointer-events-none focus-within:before:text-xs focus-within:before:left-0 focus-within:before:-translate-y-5/2 focus-within:before:text-foreground"
    )}
  >
    {children}
  </label>
);

export default Label;
