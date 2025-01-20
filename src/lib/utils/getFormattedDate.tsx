import { UserRoles } from "@/types/UserData.d";

interface DateOptions {
  weekday: "short";
  year: "numeric";
  month: "short";
  day: "numeric";
  hour: "2-digit";
  minute: "2-digit";
}

export default function getFormattedDate(date: string | number | Date): string {
  const parsedDate = new Date(date);
  const options: DateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return parsedDate.toLocaleDateString("en-US", options);
}

interface TimeToAdd {
  days?: number;
  months?: number;
  years?: number;
}

export function addTimeToDate(date: Date, timeToAdd: TimeToAdd): Date {
  const newDate = new Date(date);

  if (timeToAdd.days) {
    newDate.setDate(newDate.getDate() + timeToAdd.days);
  }

  if (timeToAdd.months) {
    newDate.setMonth(newDate.getMonth() + timeToAdd.months);
  }

  if (timeToAdd.years) {
    newDate.setFullYear(newDate.getFullYear() + timeToAdd.years);
  }

  return newDate;
}

interface ExpirationDateProps {
  plan: UserRoles;
  startDate: string | number | Date;
}

export function getExpirationDate({ plan, startDate }: ExpirationDateProps) {
  const fromDate = new Date(startDate);
  let expirationDate: Date = new Date();

  switch (plan) {
    case "lite":
      expirationDate = addTimeToDate(fromDate, { days: 3 });
      break;
    case "pro":
      expirationDate = addTimeToDate(fromDate, { months: 1 });
      break;
    case "premium":
      expirationDate = addTimeToDate(fromDate, { years: 1 });
      break;
    case "admin":
      return "No expiration date";
  }
  return getFormattedDate(expirationDate);
}
