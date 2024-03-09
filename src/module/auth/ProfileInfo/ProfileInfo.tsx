import { Avatar, RouterLink } from "@ui/index";
import classes from "./ProfileInfo.module.scss";
import avatar from "@assets/avatar.svg";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";

type ProfileProps = {
  to: string;
};

function ProfileInfo({ to }: ProfileProps) {
  const profile = useAuthSelector((stete) => stete.authSlice.profile);

  return (
    <RouterLink className={classes.profile} to={to}>
      <span className={classes.profileText}>{profile?.user.username}</span>
      <Avatar photo={avatar} />
    </RouterLink>
  );
}

export { ProfileInfo };
