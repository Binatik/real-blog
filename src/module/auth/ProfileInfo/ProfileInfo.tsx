import { Avatar, RouterLink } from "@ui/index";
import classes from "./ProfileInfo.module.css";
import avatar from "@assets/avatar.svg";

type IProfileProps = {
  to: string;
};

function ProfileInfo({ to }: IProfileProps) {
  return (
    <RouterLink className={classes.profile} to={to}>
      <span className={classes.profileText}>John Doe</span>
      <Avatar photo={avatar} />
    </RouterLink>
  );
}

export { ProfileInfo };
