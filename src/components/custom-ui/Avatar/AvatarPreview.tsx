import Image from "next/image";
import AvatarProps from "./AvatarProp.type";
import { userAvatarUrl } from "@/lib/utils";
import { cx } from "class-variance-authority";

const AvatarPreview: React.FC<AvatarProps> = ({
  avatar,
  className = "",
  size = "200px",
}) => (
  <div
    style={className.length ? {} : { width: size, height: size }}
    className={cx(
      "rounded-full overflow-hidden aspect-square shrink-0",
      className
    )}
  >
    <Image
      width={200}
      height={200}
      className="w-full h-full object-cover"
      src={avatar ? userAvatarUrl(avatar) : "https://placehold.co/200/png"}
      alt="avatar"
    />
  </div>
);

export default AvatarPreview;
