import { Skeleton } from "@/components/ui/skeleton";

export const PageHeaderSkeleton = () => (
  <div className="bg-black/5 py-10">
    <div className="container">
      <Skeleton className="max-w-[300px] w-1/3 md:h-10 h-9 mb-6" />
      <Skeleton className="w-5/6 md:h-5 h-4" />
    </div>
  </div>
);
