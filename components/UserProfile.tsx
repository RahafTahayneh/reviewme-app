import { User } from "@/types/user";
import gravatar from "gravatar";
import Image from "next/image";

const UserProfile = ({
  user,
  size = 50,
}: {
  user: User | undefined;
  size?: number;
}) => {
  const hasProfilePicture = user?.asset !== null;
  const email = user?.email !== undefined ? user.email : "test@gmail.com";

  // Generate the avatar URL if the user doesn't have a profile picture
  const avatarUrl = hasProfilePicture
    ? user?.asset
    : gravatar.url(email, { size: "50", default: "identicon" });

  return (
    <div>
      {hasProfilePicture ? (
        <img
          src={user?.asset || ""}
          alt="Profile Picture"
          width={size}
          height={size}
          className="rounded-full bg-gray-400"
        />
      ) : (
        <img
          src={avatarUrl}
          alt="Avatar"
          width={size}
          height={size}
          className="rounded-full bg-gray-400"
        />
      )}
    </div>
  );
};

export default UserProfile;
