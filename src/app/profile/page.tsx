import css from "@/styles/shared/Profile.module.css";
import InnerPage from "@/components/layout/InnerPage";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
import getUserName, { stringAvatar } from "@/lib/utils/getUserName";
import getFormattedDate, {
  getExpirationDate,
} from "@/lib/utils/getFormattedDate";
import PlanCard from "@/components/shared/PlanCard";
import { auth } from "@clerk/nextjs/server";
import { Avatar, Typography } from "@mui/material";
import { getUserById } from "@/lib/actions/user.actions";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <section className={css.section}>
        <SpinnerGrow size="large" />
      </section>
    );
  }

  const profile = await getUserById(userId);
  const userName = getUserName({
    first_name: profile.firstName,
    last_name: profile.lastName,
    username: profile.username,
  });

  console.log(profile);

  return (
    <InnerPage>
      <section className={css.section}>
        <div className={css.head}>
          <Typography variant="h2">My profile</Typography>
        </div>

        <div className={css.hero}>
          <div className={css.heroImg}>
            <Avatar
              {...stringAvatar(userName)}
              alt={userName}
              src={profile.clerkImg}
              sx={{ width: 80, height: 80 }}
            />
            <div className={css.heroImgContent}>
              <Typography variant="h4">{userName}</Typography>
              <Typography variant="body1">{profile.email}</Typography>
            </div>
          </div>

          <div className={css.heroContent}>
            <span>
              <b>Member since: </b> <br />
              {getFormattedDate(profile.registerAt)}
            </span>
            <span>
              <b>Last update: </b> <br /> {getFormattedDate(profile.updatedAt)}
            </span>

            <span>
              <b>Plan expires on: </b> <br />
              {getExpirationDate({
                plan: profile.role.toLowerCase(),
                startDate: profile.roleUpgradeAt,
              })}
            </span>
          </div>

          <div className={css.heroPlan}>
            <PlanCard />
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
