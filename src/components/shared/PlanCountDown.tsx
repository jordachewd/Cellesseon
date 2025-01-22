"use client";
import {
  getExpirationCountDown,
  TimeDifference,
} from "@/lib/utils/getFormattedDate";
import { useEffect, useState } from "react";

interface PlanCountDownProps {
  startDate?: Date;
  endDate: Date;
  className?: string;
}

export default function PlanCountDown({
  endDate,
  startDate = new Date(),
  className: style = "inline-flex items-center bg-black text-white rounded p-1 text-xxs leading-none",
}: PlanCountDownProps) {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const countdownValue: TimeDifference = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ...getExpirationCountDown(new Date(startDate), new Date(endDate)),
      };
      setCountdown(formatCountdown(countdownValue));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const formatCountdown = (time: TimeDifference) => {
    const parts = [];
    if (time.years) parts.push(`${time.years}y`);
    if (time.months) parts.push(`${time.months}mo`);
    if (time.days) parts.push(`${time.days}d`);
    if (time.hours) parts.push(`${time.hours}h`);
    if (time.minutes) parts.push(`${time.minutes}m`);
    if (time.seconds) parts.push(`${time.seconds}s`);
    return parts.join(" ");
  };

  return <div className={`${style}`}> {countdown}</div>;
}
