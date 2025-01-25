import css from "@/styles/sections/ProfileHero.module.css";
import PlanPromo from "@/components/shared/PlanPromo";
import PlanCountDown from "@/components/shared/PlanCountDown";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/layout/PageHead";
import { Typography, Avatar } from "@mui/material";
import { UserData } from "@/types/UserData.d";
import getFullName, { getNameLetters } from "@/lib/utils/getFullName";

interface HeroProps {
  userData: UserData;
}

export default function ProfileHero({ userData }: HeroProps) {
  const { username, firstName, lastName } = userData;

  const fullName = getFullName({
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
  });

  return (
    <section className={css.section}>
      <PageHead title="Profile" subtitle="Manage your account settings" />

      <div className={css.hero}>
        <div className={css.heroImg}>
          <Avatar
            alt={fullName}
            src={userData.userimg}
            sx={{ width: 80, height: 80 }}
            {...getNameLetters(fullName)}
          />
          <div className={css.heroImgContent}>
            <Typography variant="h4">{fullName}</Typography>
            <Typography variant="body1">{userData.email}</Typography>
          </div>
        </div>

        <div className={css.heroContent}>
          <div className="flex gap-2 items-center">
            <span className="font-semibold leading-none">Member since:</span>
            <span className="text-xxs leading-none">
              {getFormattedDate(userData.registerAt)}
            </span>
          </div>

          {userData.updatedAt && (
            <div className="flex gap-2 items-center">
              <span className="font-semibold leading-none">Last update:</span>
              <span className="text-xxs leading-none">
                {getFormattedDate(userData.updatedAt)}
              </span>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <span className="font-semibold leading-none">Plan expires in:</span>
            <PlanCountDown endDate={userData.plan.expiresOn} wrapped />
          </div>
        </div>

        <div className={css.heroPlan}>
          <PlanPromo userPlan={userData.plan} />
        </div>
      </div>
    </section>
  );
}
