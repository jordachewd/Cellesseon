import css from "@/styles/sections/ProfileHero.module.css";
import PlanPromo from "@/components/shared/PlanPromo";
import PlanCountDown from "@/components/shared/PlanCountDown";
import getFormattedDate, { isTimeUp } from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/layout/PageHead";
import getUserName, { stringAvatar } from "@/lib/utils/getUserName";
import { Typography, Avatar } from "@mui/material";
import { UserData } from "@/types/UserData.d";

interface HeroProps {
  userData: UserData;
}

export default function ProfileHero({ userData }: HeroProps) {
  const userName = getUserName({
    first_name: userData.firstName || "",
    last_name: userData.lastName || "",
    username: userData.username,
  });

  const testTime = new Date("2025-01-24T06:11:00.332Z");
  // console.log("testTime: ", getFormattedDate(testTime));
  console.log("isTimeUp: ", isTimeUp(testTime));

  return (
    <section className={css.section}>
      <PageHead title="Profile" subtitle="Manage your account settings" />

      <div className={css.hero}>
        <div className={css.heroImg}>
          <Avatar
            {...stringAvatar(userName)}
            alt={userName}
            src={userData.userimg}
            sx={{ width: 80, height: 80 }}
          />
          <div className={css.heroImgContent}>
            <Typography variant="h4">{userName}</Typography>
            <Typography variant="body1">{userData.email}</Typography>
          </div>
        </div>

        <div className={css.heroContent}>
          <div className="flex flex-col">
            <span className="font-semibold">Member since:</span>
            <span className="text-xs">
              {getFormattedDate(userData.registerAt)}
            </span>
          </div>

          {userData.updatedAt && (
            <div className="flex flex-col">
              <span className="font-semibold">Last update:</span>
              <span className="text-xs">
                {getFormattedDate(userData.updatedAt)}
              </span>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <span className="font-semibold">Plan expires in:</span>
            {/*  <PlanCountDown endDate={userData.plan.expiresOn} wrapped /> */}
            <PlanCountDown endDate={testTime} wrapped />
          </div>
        </div>

        <div className={css.heroPlan}>
          <PlanPromo userPlan={userData.plan} />
        </div>
      </div>
    </section>
  );
}
