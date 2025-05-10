"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cx } from "class-variance-authority";

import {
  X as Xmark,
  CircleAlert as WarningCircle,
  Info as InfoCircle,
  CircleCheck as CheckCircle,
  TriangleAlert as WarningTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";

const alertStyles = cva("flex items-start border-2 mb-6 last:mb-0", {
  variants: {
    severity: {
      info: "border-info bg-info/5",
      success: "border-success bg-success/5",
      warning: "border-warning bg-warning/5",
      error: "border-error bg-error/5",
    },
  },
  defaultVariants: {
    severity: "info",
  },
});

interface AlertProps {
  children: React.ReactNode;
  severity?: "error" | "success" | "warning" | "info";
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}
const Alert: React.FC<AlertProps> = ({
  children,
  severity = "info",
  isOpen,
  onClose,
  className,
}) => {
  const AlertIcon = {
    error: WarningCircle,
    success: CheckCircle,
    warning: WarningTriangle,
    info: InfoCircle,
  }[severity];
  const iconStyle = {
    error: "text-error",
    success: "text-success",
    warning: "text-warning",
    info: "text-info",
  }[severity];

  return (
    (isOpen || (onClose === undefined && isOpen === undefined)) && (
      <Card role="alert" className={cx(alertStyles({ severity }), className)}>
        <CardContent className="flex grow p-4">
          <AlertIcon className={cx("shrink-0", iconStyle)} width={24} height={24} />
          <div className="relative ml-4 font-medium grow">
            <p className={cx({ ["pr-6"]: !!onClose })}>
              {children}
            </p>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close alert"
                onClick={() => onClose()}
                type="button"
                className="absolute top-0 right-0 text-base font-medium p-0 w-6 h-6 rounded-full"
              >
                <Xmark />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default Alert;
