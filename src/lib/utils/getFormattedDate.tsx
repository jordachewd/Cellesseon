interface DateOptions {
  weekday: "long";
  year: "numeric";
  month: "short";
  day: "numeric";
}

export default function getFormattedDate(date: string | number | Date): string {
  const parsedDate = new Date(date);
  const options: DateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return parsedDate.toLocaleDateString("en-US", options);
}
