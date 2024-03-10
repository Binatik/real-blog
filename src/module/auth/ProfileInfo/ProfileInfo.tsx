import {
  Avatar,
  RouterLink,
  SkeletonAvatar,
  SkeletonText,
  Text,
} from "@ui/index";
import classes from "./ProfileInfo.module.scss";
import avatar from "@assets/avatar.svg";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";

type ProfileProps = {
  to: string;
};

function ProfileInfo({ to }: ProfileProps) {
  const loading = useAuthSelector((stete) => stete.authSlice.loading);
  const profile = useAuthSelector((stete) => stete.authSlice.profile);

  return (
    <RouterLink className={classes.profile} to={to}>
      {loading ? (
        <SkeletonText />
      ) : (
        <Text size="big" mode="off" className={classes.profileText}>
          {profile?.user.username}
        </Text>
      )}
      {loading ? <SkeletonAvatar /> : <Avatar photo={avatar} />}
    </RouterLink>
  );
}

export { ProfileInfo };
