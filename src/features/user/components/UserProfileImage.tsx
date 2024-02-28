import { FC, HTMLAttributes } from "react";
import { shortenUsername } from "@/utils";
import { User } from "@/types";
import useAuth from "@/features/auth/hooks/useAuth";

type ProfileImageProps = HTMLAttributes<HTMLDivElement> & {
  user: User | null;
  color?: string;
  disableTooltip?: boolean;
};

const UserProfileImage: FC<ProfileImageProps> = ({
  user,
  color,
  disableTooltip,
  className,
  ...otherProps
}) => {
  const { currentUser } = useAuth();
  const profileColor = color ?? user?.color ?? "blue";
  var colorStyle = "border-pink-400 from-pink-400 to-pink-200 text-pink-600";

  if (profileColor === "red") {
    colorStyle = "border-red-400 from-red-400 to-red-200 text-red-600";
  } else if (profileColor === "orange") {
    colorStyle =
      "border-orange-400 from-orange-400 to-orange-200 text-orange-600";
  } else if (profileColor === "yellow") {
    colorStyle =
      "border-yellow-400 from-yellow-400 to-yellow-200 text-yellow-600";
  } else if (profileColor === "green") {
    colorStyle = "border-green-400 from-green-400 to-green-200 text-green-600";
  } else if (profileColor === "blue") {
    colorStyle = "border-blue-400 from-blue-400 to-blue-200 text-blue-600";
  } else if (profileColor === "purple") {
    colorStyle =
      "border-purple-400 from-purple-400 to-purple-200 text-purple-600";
  } else if (profileColor === "gray") {
    colorStyle = "border-gray-300 from-gray-200 to-gray-50 text-gray-400";
  }

  const noTooltip = disableTooltip === undefined || false;

  if (!user) {
    return <div>Spinner...</div>;
  }

  return (
    <div
      {...otherProps}
      className={`group relative flex aspect-square h-10 w-10 select-none items-center justify-center rounded-full border bg-gradient-to-tr ${colorStyle} ${className}`}
    >
      <span>{shortenUsername(user.name)}</span>

      {!noTooltip && (
        <div className="absolute right-1/2 top-10 z-50 w-fit translate-x-1/2 flex-col overflow-clip rounded-xl border border-gray-300 bg-white px-2 py-1 text-xs text-black opacity-0 shadow-2xl transition-opacity duration-300 group-hover:opacity-100">
          <h2>
            {currentUser && currentUser.name === user.name ? "You" : user.name}
          </h2>
        </div>
      )}
    </div>
  );
};

export default UserProfileImage;
