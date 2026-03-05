import PlanPromo from "@/components/shared/PlanPromo";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/layout/PageHead";
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
  const initials = getNameLetters(fullName).children;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4">
      <PageHead title="Profile" subtitle="Manage your account settings" />

      <div className="flex w-full flex-col items-center justify-between gap-8 rounded-lg border border-lightPrimary-500 bg-lightPrimary-500/50 p-6 shadow-md md:flex-row dark:border-darkPrimary-500 dark:bg-darkPrimary-500/30">
        <div className="flex flex-1 items-center gap-4 lg:gap-8">
          <span className="inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-lightPrimary-500 text-2xl text-white shadow-[0px_0px_5px_0px_rgba(122,75,204,0.3)]">
            {userData.userimg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={userData.userimg}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </span>
          <div className="flex flex-1 flex-col">
            <h2 className="heading-4">{fullName}</h2>
            <p className="body-1">{email}</p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-2 lg:max-w-[30%]">
          <div className="flex items-center gap-2">
            <span className="font-semibold leading-none">Member since:</span>
            <span className="text-xxs leading-none">
              {getFormattedDate(registerAt as Date)}
            </span>
          </div>

          {userData.updatedAt && (
            <div className="flex items-center gap-2">
              <span className="font-semibold leading-none">Last update:</span>
              <span className="text-xxs leading-none">
                {getFormattedDate(updatedAt as Date)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="font-semibold leading-none">Plan expires in:</span>
            <PlanCountDown endDate={plan.expiresOn as Date} wrapped />
          </div>
        </div>

        <div className="flex w-full lg:max-w-[25%]">
          <PlanPromo userPlan={plan} />
        </div>
      </div>
    </section>
  );
}
