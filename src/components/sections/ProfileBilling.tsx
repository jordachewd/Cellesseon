import css from "@/styles/sections/ProfileBilling.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import LoadingPage from "../shared/LoadingPage";
import { Typography } from "@mui/material";
import { auth } from "@clerk/nextjs/server";
import { getAllTransactions } from "@/lib/actions/transaction.action";
import { Transaction } from "@/types/TransactionData.d";

export default async function ProfileBilling() {
  const { userId } = await auth();

  if (!userId) {
    return <LoadingPage />;
  }

  const transactions: Transaction[] = await getAllTransactions(userId);

  return (
    <section className={css.section}>
      <div className={css.head}>
        <Typography variant="h3">Billing History</Typography>
      </div>
      <div className={css.content}>
        {transactions.length > 0 ? (
          <div key="unique-key-1" className="flex flex-col w-full gap-3 my-6">
            <div className="flex justify-between items-center gap-3 p-3">
              <Typography variant="body1" className="flex-1">
                <b>Plan</b>
              </Typography>
              <Typography variant="body1" className="flex-1">
                <b>Billing / Cycle</b>
              </Typography>
              <Typography variant="body1" className="flex-1">
                <b>Purchased</b>
              </Typography>
              <Typography variant="body1" className="flex-1">
                <b>Expires</b>
              </Typography>
            </div>
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id || index}
                className="flex justify-between items-center gap-2 py-2 px-3 border rounded-md border-white/20"
              >
                <Typography variant="body2" className="flex-1">
                  <b>{transaction.plan}</b>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12 }}
                  className="flex-1"
                >
                  ${transaction.amount} / {transaction.billing}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12 }}
                  className="flex-1"
                >
                  {getFormattedDate(transaction.createdAt)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12 }}
                  className="flex-1"
                >
                  {getFormattedDate(transaction.expiresOn)}
                </Typography>
              </div>
            ))}
          </div>
        ) : (
          <Typography
            variant="body2"
            className="text-center !mt-6 !font-light !text-xs !text-slate-400"
          >
            You have no billing history yet.
          </Typography>
        )}
      </div>
    </section>
  );
}
