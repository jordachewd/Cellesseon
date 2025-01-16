import { auth } from "@clerk/nextjs/server";
import css from "@/styles/shared/Profile.module.css";
import InnerPage from "@/components/layout/InnerPage";
import { Avatar, Typography } from "@mui/material";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
import { getUserById } from "@/lib/actions/user.actions";
import getUserName, { stringAvatar } from "@/lib/utils/getUserName";
import getFormattedDate from "@/lib/utils/getFormattedDate";

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
            {/*             <Image
              src={profile.clerkImg}
              alt={userName}
              width={96}
              height={96}
              priority
            /> */}
            <Avatar
              {...stringAvatar(userName)}
              alt={userName}
              src={profile.clerkImg}
              sx={{ width: 96, height: 96 }}
            />
          </div>

          <div className={css.heroContent}>
            <div className={css.heroContentLeft}>
              <Typography variant="h4">{userName}</Typography>
              <Typography variant="body1">{profile.email}</Typography>
            </div>
            <div className={css.heroContentRight}>
              <span>Member since: {getFormattedDate(profile.registerAt)}</span>
              <span>Last update: {getFormattedDate(profile.updatedAt)}</span>
            </div>
          </div>

          <div className={css.heroPlan}>
            <Typography variant="h5">Current plan</Typography>
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              {profile.role}
            </Typography>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
