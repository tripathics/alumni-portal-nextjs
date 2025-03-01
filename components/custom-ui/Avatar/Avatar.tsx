import AvatarProps from "./AvatarProp.type";
import { CircleUserRound } from "lucide-react";
import cx from "classnames";
import Image from "next/image";
import { userAvatarUrl } from "@/lib/utils";

const Avatar: React.FC<AvatarProps> = ({ avatar, className, size }) => {
  return avatar ? (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={cx(
        className,
        "relative rounded-full overflow-hidden aspect-square shrink-0 w-48"
      )}
    >
      <Image
        src={userAvatarUrl(avatar)}
        alt="avatar"
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
  ) : (
    <CircleUserRound
      className="w-48 h-48 shrink-0"
      strokeWidth={0.8}
      style={{
        width: size,
        height: size,
      }}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
