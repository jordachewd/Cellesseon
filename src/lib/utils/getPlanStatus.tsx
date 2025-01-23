import { Plan } from "@/types/PlanData.d";
import { UserMetadata } from "@/types/UserData.d";

interface PlanStatusParams {
  plan: Plan;  
  isYearly: boolean;
  userMeta?: UserMetadata;
}

interface PlanStatus {
  isIncluded: boolean;
  isCurrent: boolean;
  isPopular: boolean;
}

export function getPlanStatus({
  plan,
  isYearly,
  userMeta,
}: PlanStatusParams): PlanStatus[] {
  const { planId, billing } = userMeta || {};
  const billingCycle = billing === (isYearly ? "Yearly" : "Monthly");

  let isIncluded = false,
    isCurrent = false,
    isPopular = false;

  // const plansStatus: PlanStatus[] = [{ isIncluded, isCurrent, isPopular }];
  const plansStatus: PlanStatus[] = [];

  if (plan.id === 0) {
    isCurrent = plan.id === Number(planId) ? true : false;
    isIncluded = true;
    isPopular = false;
    plansStatus[plan.id] = { isIncluded, isCurrent, isPopular };
  }

  if (plan.id === 1) {
    isCurrent = billingCycle && plan.id === Number(planId) ? true : false;
    isIncluded = billingCycle && plan.id <= Number(planId) ? true : false;
    isPopular = Number(planId) < plan.id ? true : !billingCycle;
    plansStatus[plan.id] = { isIncluded, isCurrent, isPopular };
  }

  if (plan.id === 2) {
    isCurrent = billingCycle && plan.id === Number(planId) ? true : false;
    isIncluded = billingCycle && plan.id <= Number(planId) ? true : false;
    isPopular = Number(planId) < plan.id ? true : false;
    plansStatus[plan.id] = { isIncluded, isCurrent, isPopular };
  }

  return plansStatus;
}
