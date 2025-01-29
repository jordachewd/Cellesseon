import css from "@/styles/sections/ProfileHero.module.css";
import PlanPromo from "@/components/shared/PlanPromo";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/layout/PageHead";
import { Typography, Avatar } from "@mui/material";
import { UserData } from "@/types/UserData.d";
import getFullName, { getNameLetters } from "@/lib/utils/getFullName";
import PlanCountDown from "../shared/PlanCountDown";

interface HeroProps {
  userData: UserData;
}

export default function ProfileHero({ userData }: HeroProps) {
  const { username, firstName, lastName, email, registerAt, updatedAt, plan } =
    userData;

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
            <Typography variant="body1">{email}</Typography>
          </div>
        </div>

        <div className={css.heroContent}>
          <div className="flex gap-2 items-center">
            <span className="font-semibold leading-none">Member since:</span>
            <span className="text-xxs leading-none">
              {getFormattedDate(registerAt as Date)}
            </span>
          </div>

          {userData.updatedAt && (
            <div className="flex gap-2 items-center">
              <span className="font-semibold leading-none">Last update:</span>
              <span className="text-xxs leading-none">
                {getFormattedDate(updatedAt as Date)}
              </span>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <span className="font-semibold leading-none">Plan expires in:</span>
            <PlanCountDown endDate={plan.expiresOn as Date} wrapped />
          </div>
        </div>

        <div className={css.heroPlan}>
          <PlanPromo userPlan={plan} />
        </div>
      </div>
    </section>
  );
}
