import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

export const GridItemOption: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
}> = ({ title, description, children, trigger, className }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        className="text-left font-normal w-full justify-between px-6 py-4 rounded-none"
        size="lg"
      >
        {trigger}
        <ChevronRight className="text-inherit shrink-0" />
      </Button>
    </DialogTrigger>
    <DialogContent
      aria-describedby={`${title}, ${description}`}
      className={className}
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

const GridItem: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => (
  <Card className="flex flex-col">
    <CardHeader className="grow">
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className="px-0 pb-0">{children}</CardContent>
  </Card>
);

export default GridItem;
