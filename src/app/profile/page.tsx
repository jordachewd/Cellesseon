import { auth } from "@clerk/nextjs/server";
import css from "@/styles/shared/Profile.module.css";
import InnerPage from "@/components/layout/InnerPage";
import { Typography } from "@mui/material";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
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

  return (
    <InnerPage>
      <section className={css.section}>
        <div className={css.head}>
          <Typography variant="h2">My profile</Typography>
        </div>

        <div className={css.hero}>


          
          {Object.entries(profile).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <Typography variant="body1">{key}:</Typography>
              <span className="text-base text-slate-400">
                {value as React.ReactNode}
              </span>
            </div>
          ))}




        </div>
      </section>
    </InnerPage>
  );
}
