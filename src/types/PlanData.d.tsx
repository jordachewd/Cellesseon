// ====== PLAN Data Types

interface Inclusion {
  label: string;
  isIncluded: boolean;
}

export type PlanName = "Lite" | "Pro" | "Premium";
export type BillingCycle = "Monthly" | "Yearly";

export interface Plan {
  id: number;
  name: PlanName;
  desc: string;
  icon: string;
  highlight: boolean;
  price: number;
  expiresOn: Date;
  inclusions: Inclusion[];
}

export interface PlanData {
  id: string;
  name: PlanName;
  billing: BillingCycle;
  upgradedAt?: Date;
  expiresOn?: Date;
}

export interface CheckoutPlanParams {
  id: number;
  billing: BillingCycle;
  name: PlanName;
  price: number;
}
