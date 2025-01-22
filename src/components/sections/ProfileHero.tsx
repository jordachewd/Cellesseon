import getFormattedDate from "@/lib/utils/getFormattedDate";
import getUserName, { stringAvatar } from "@/lib/utils/getUserName";
import { Typography, Avatar } from "@mui/material";
import css from "@/styles/sections/ProfileHero.module.css";
import PlanCard from "@/components/shared/PlanCard";
import PlanCountDown from "@/components/shared/PlanCountDown";
import { auth } from "@clerk/nextjs/server";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
import { getUserById } from "@/lib/actions/user.actions";

export default async function ProfileHero() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <section className={css.section}>
        <div className={css.hero}>
          <SpinnerGrow size="large" />
        </div>
      </section>
    );
  }

  const profile = await getUserById(userId);
  const userName = getUserName({
    first_name: profile.firstName,
    last_name: profile.lastName,
    username: profile.username,
  });

  return (
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
          <div className="flex flex-col">
            <span className="font-semibold">Member since:</span>
            <span className="text-xs">
              {getFormattedDate(profile.registerAt)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">Last update:</span>
            <span className="text-xs">
              {getFormattedDate(profile.updatedAt)}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-semibold">Plan expires in:</span>
            <PlanCountDown endDate={profile.plan.expiresOn} />
          </div>

          <div className="flex flex-col">
            <span className="text-xs">
              {getFormattedDate(profile.plan.expiresOn)}
            </span>
          </div>
        </div>

        <div className={css.heroPlan}>
          <PlanCard />
        </div>
      </div>
    </section>
  );
}
