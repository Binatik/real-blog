import {
  Avatar,
  RouterLink,
  SkeletonAvatar,
  SkeletonText,
  Text,
} from "@ui/index";
import classes from "./ProfileInfo.module.scss";
import staticAvatar from "@assets/avatar.svg";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";

type ProfileProps = {
  to: string;
};

function ProfileInfo({ to }: ProfileProps) {
  const status = useRootSelector((state) => state.profileSlice.status);
  const profile = useRootSelector((stete) => stete.profileSlice.profile);

  const avatar = profile?.user.image;

  return (
    <RouterLink className={classes.profile} to={to} shine>
      {status === "pending" && <SkeletonText />}
      {status === "fulfilled" && (
        <Text size="big" mode="off" className={classes.profileText}>
          {profile?.user.username}
        </Text>
      )}
      {status === "pending" && <SkeletonAvatar />}
      {status === "fulfilled" && (
        <Avatar
          alternative="A"
          width={46}
          height={46}
          photo={avatar ? avatar : staticAvatar}
        />
      )}
    </RouterLink>
  );
}

export { ProfileInfo };
