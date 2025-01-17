interface DateOptions {
  weekday: "long";
  year: "numeric";
  month: "short";
  day: "numeric";
  hour: "2-digit";
  minute: "2-digit";
}

export default function getFormattedDate(date: string | number | Date): string {
  const parsedDate = new Date(date);
  const options: DateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return parsedDate.toLocaleDateString("en-US", options);
}

export function addDaysToDate(
  dateString: string | number | Date,
  daysToAdd: number
) {
  const date = new Date(dateString);

  date.setDate(date.getDate() + Number(daysToAdd));

  return date.toISOString();
}
