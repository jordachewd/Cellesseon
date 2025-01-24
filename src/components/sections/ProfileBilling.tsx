import css from "@/styles/sections/ProfileBilling.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import LoadingPage from "../shared/LoadingPage";
import { Typography } from "@mui/material";
import { auth } from "@clerk/nextjs/server";
import { getAllTransactions } from "@/lib/actions/transaction.action";
import { Transaction } from "@/types/TransactionData.d";
import { TooltipArrow } from "../shared/TooltipArrow";
import { generateUniqueString } from "@/lib/utils/generateUniqueString";

export default async function ProfileBilling() {
  const { userId } = await auth();

  if (!userId) {
    return <LoadingPage />;
  }

  const transactions: Transaction[] = await getAllTransactions(userId);

  return (
    <section className={css.section}>
      <div className={css.head}>
        <Typography variant="h4">Billing History</Typography>
      </div>

      {transactions.length > 0 ? (
        <div key={generateUniqueString(24)} className={css.table}>
          <div className={css.tableHead}>
            <p className="flex-1">Plan</p>
            <p className="flex-1 text-center">Amount</p>
            <p className="flex-1 text-center">Purchased</p>
            <p className="flex-1 text-center">Expires</p>
            <p className="min-w-14 text-center">Status</p>
            <TooltipArrow title="Invoice" placement="top">
              <i className="bi bi-cloud-download ml-4 text-base"></i>
            </TooltipArrow>
          </div>

          {transactions.map((transaction) => {
            const payCycle = transaction.billing === "Monthly" ? "Mo" : "Yr";
            return (
              <div key={transaction.id} className={css.tableRow}>
                <p className="flex-1 font-medium">{transaction.plan}</p>
                <p className="flex-1 font-medium text-center">
                  ${transaction.amount}
                  <span className="text-xxs font-normal"> / {payCycle}</span>
                </p>
                <p className="flex-1 text-xxs text-center">
                  {getFormattedDate(transaction.createdAt)}
                </p>
                <p className="flex-1 text-xxs text-center">
                  {getFormattedDate(transaction.expiresOn)}
                </p>
                <p className="min-w-14 text-xxs text-center">
                  status
                </p>
                <i className="bi bi-file-earmark-arrow-down ml-4 text-base cursor-pointer"></i>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={css.tableEmpty}>You have no billing history yet.</div>
      )}
    </section>
  );
}
