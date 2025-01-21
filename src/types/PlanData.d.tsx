// ====== PLAN Data Types

interface Inclusion {
  label: string;
  isIncluded: boolean;
}

export type PlanName = "Lite" | "Pro" | "Premium";

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
  upgradedAt?: Date;
  expiresOn?: Date;
}

export interface CheckoutPlanParams {
  id: number;
  name: PlanName;
  price: number;
}
