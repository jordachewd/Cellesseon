"use client";
import { useEffect, useMemo, useState } from "react";
import css from "@/styles/shared/PlanCountDown.module.css";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import {
  TimeDifference,
  getExpirationCountDown,
} from "@/lib/utils/getFormattedDate";

interface CountDownProps {
  endDate: Date;
  startDate?: Date;
  className?: string;
  wrapped?: boolean;
}

export default function PlanCountDown({
  endDate,
  startDate = new Date(),
  className: style = css.wrapper,
  wrapped = false,
}: CountDownProps) {
  const [countdown, setCountdown] = useState<string>("");
  const [timeUp, setTimeUp] = useState<boolean>(false);  

  const parsedStartDate = useMemo(() => new Date(startDate), [startDate]);
  const parsedEndDate = useMemo(() => new Date(endDate), [endDate]);
  const isTimeUp = parsedStartDate >= parsedEndDate;

  useEffect(() => {
    if (isTimeUp) {
      setTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      const countdownValue: TimeDifference = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ...getExpirationCountDown(parsedStartDate, parsedEndDate),
      };
      setCountdown(formatCountdown(countdownValue));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimeUp, parsedStartDate, parsedEndDate]);

  const formatCountdown = (time: TimeDifference) => {
    const parts = [];
    if (time.years) parts.push(`${time.years}y`);
    if (time.months) parts.push(`${time.months}mo`);
    if (time.days) parts.push(`${time.days}d`);
    if (time.hours !== undefined)
      parts.push(`${time.hours < 10 ? "0" : ""}${time.hours}h`);
    if (time.minutes !== undefined)
      parts.push(`${time.minutes < 10 ? "0" : ""}${time.minutes}m`);
    if (time.seconds !== undefined)
      parts.push(`${time.seconds < 10 ? "0" : ""}${time.seconds}s`);
    return parts.join(" ");
  };

  return wrapped ? (
    <div className={`${style}`}>
      {timeUp ? (
        "Time is up!"
      ) : countdown ? (
        countdown
      ) : (
        <LoadingBubbles size="small" />
      )}
    </div>
  ) : (
    <>
      {timeUp ? (
        "Time is up!"
      ) : countdown ? (
        countdown
      ) : (
        <LoadingBubbles
          size="small"
          className="inline-flex items-center gap-0.5"
        />
      )}
    </>
  );
}
