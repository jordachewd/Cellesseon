import css from "@/styles/sections/ProfileBilling.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Typography } from "@mui/material";
import { Transaction } from "@/types/TransactionData.d";
import { TooltipArrow } from "../shared/TooltipArrow";
import { generateString } from "@/lib/utils/generateString";

interface BillingProps {
  stripeId: string | undefined;
  userTxns: Transaction[] | undefined;
}

export default function ProfileBilling({ stripeId, userTxns }: BillingProps) {
  return (
    <section className={css.section}>
      <div className={css.head}>
        <Typography variant="h4">Billing History</Typography>
      </div>

      {userTxns && userTxns.length > 0 ? (
        <div className={css.table}>
          <div className={css.tableHead}>
            <p className="flex-1">Plan</p>
            <p className="flex-1 text-center">Amount</p>
            <p className="hidden md:flex flex-1 text-center">Purchased</p>
            <p className="hidden md:flex flex-1 text-center">Expires</p>
            <p className="min-w-14 text-center">Status</p>
            <TooltipArrow title="Invoice" placement="top">
              <i className="bi bi-cloud-download ml-4 text-base"></i>
            </TooltipArrow>
          </div>

          {userTxns.map((txn) => {
            const payCycle = txn.billing === "Monthly" ? "Mo" : "Yr";
            const txnStatus = txn.stripeId === stripeId ? "Active" : "Inactive";
            const txnColor =
              txn.stripeId === stripeId ? css.active : css.inactive;
            return (
              <div key={txn.id + generateString(32)} className={css.tableRow}>
                <p className="flex-1 font-medium">{txn.plan}</p>
                <p className="flex-1 font-medium text-center">
                  ${txn.amount}
                  <span className="text-xxs font-normal"> / {payCycle}</span>
                </p>
                <p className="hidden md:flex flex-1 text-xxs text-center">
                  {getFormattedDate(txn.createdAt)}
                </p>
                <p className="hidden md:flex flex-1 text-xxs text-center">
                  {getFormattedDate(txn.expiresOn)}
                </p>
                <p className="min-w-14 text-xxs text-center">
                  <span className={txnColor}>{txnStatus}</span>
                </p>
                <i className="bi bi-file-earmark-arrow-down ml-4 text-base cursor-pointer"></i>
              </div>
            );
          })}
        </div>
      ) : (
        <Typography>No transactions found.</Typography>
      )}
    </section>
  );
}
