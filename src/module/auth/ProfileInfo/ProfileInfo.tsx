import { Avatar, RouterLink } from "@ui/index";
import classes from "./ProfileInfo.module.scss";
import avatar from "@assets/avatar.svg";

type ProfileProps = {
  to: string;
};

function ProfileInfo({ to }: ProfileProps) {
  return (
    <RouterLink className={classes.profile} to={to}>
      <span className={classes.profileText}>John Doe</span>
      <Avatar photo={avatar} />
    </RouterLink>
  );
}

export { ProfileInfo };
