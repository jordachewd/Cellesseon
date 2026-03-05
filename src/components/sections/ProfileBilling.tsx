import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Transaction } from "@/types/TransactionData.d";
import { TooltipArrow } from "../shared/TooltipArrow";

interface BillingProps {
  stripeId: string | null;
  userTxns: Transaction[] | null;
}

export default function ProfileBilling({ stripeId, userTxns }: BillingProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4">
      <div className="flex items-center justify-center">
        <h2 className="heading-4 text-center">Billing History</h2>
      </div>

      {userTxns && userTxns.length > 0 ? (
        <div className="flex w-full flex-col">
          <div className="mb-3 flex items-center justify-between gap-4 rounded-md bg-slate-300/30 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-600 dark:bg-slate-300/10 dark:text-slate-300">
            <p className="flex-1">Plan</p>
            <p className="flex-1 text-center">Amount</p>
            <p className="hidden flex-1 text-center md:flex">Purchased</p>
            <p className="hidden flex-1 text-center md:flex">Expires</p>
            <p className="min-w-14 text-center">Status</p>
            <TooltipArrow title="Invoice" placement="top">
              <i className="bi bi-cloud-download ml-4 text-base"></i>
            </TooltipArrow>
          </div>

          {userTxns.map((txn) => {
            const payCycle = txn.billing === "Monthly" ? "Mo" : "Yr";
            const txnStatus = txn.stripeId === stripeId ? "Active" : "Inactive";
            const txnColor =
              txn.stripeId === stripeId
                ? "inline-flex items-center justify-center rounded bg-green-700 p-1 text-xxs leading-none text-white"
                : "inline-flex items-center justify-center rounded bg-slate-300 p-1 text-xxs leading-none text-slate-400 dark:bg-slate-300/10 dark:text-slate-400";

            return (
              <div
                key={txn.id}
                className="mt-1 flex items-center justify-between gap-4 rounded-md px-3 py-1 text-sm text-slate-500 transition-colors duration-200 ease-in-out hover:bg-slate-300/20 dark:text-slate-400 dark:hover:bg-slate-300/5"
              >
                <p className="flex-1 font-medium">{txn.plan}</p>
                <p className="flex-1 text-center font-medium">
                  ${txn.amount}
                  <span className="text-xxs font-normal"> / {payCycle}</span>
                </p>
                <p className="hidden flex-1 text-center text-xxs md:flex">
                  {getFormattedDate(txn.createdAt)}
                </p>
                <p className="hidden flex-1 text-center text-xxs md:flex">
                  {getFormattedDate(txn.expiresOn)}
                </p>
                <p className="min-w-14 text-center text-xxs">
                  <span className={txnColor}>{txnStatus}</span>
                </p>
                <i className="bi bi-file-earmark-arrow-down ml-4 cursor-pointer text-base"></i>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
          No transactions yet.
        </p>
      )}
    </section>
  );
}
