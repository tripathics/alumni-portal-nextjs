import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => (
  <>
    <div className="p-6 mb-6 flex flex-row-reverse flex-wrap gap-x-5 gap-y-3">
      <Skeleton className="w-20 h-9" />
      <div className="flex grow flex-wrap gap-x-5 gap-y-3 justify-center">
        <Skeleton className="rounded-full md:w-[150px] md:h-[150px] w-[100px] h-[100px]" />
        <div className="grow">
          <Skeleton className="w-[250px] h-6 mb-6" />
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[80px] h-3" />
            <Skeleton className="w-[100px] h-3" />
            <Skeleton className="w-[200px] h-4" />
          </div>
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-2">
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-80 h-3" />
      </div>
      <div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ProfileSkeleton;
