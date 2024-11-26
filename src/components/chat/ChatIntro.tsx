import css from "./ChatIntro.module.css";
import { IntroChips } from "@/constants/introChipsData";
import { Chip, Typography } from "@mui/material";
import { useState } from "react";

export default function ChatIntro() {
  const [chipSet, setChipSet] = useState<number>(-1);

  return (
    <div className={css.wrapper}>
      <Typography variant="h2" className={css.title}>
        Hello there!
      </Typography>

      <Typography variant="h5" className={css.subtitle}>
        How can I help you?
      </Typography>

      <div className={css.chips}>
        {IntroChips.map((chip) => (
          <Chip
            key={chip.id}
            variant="outlined"
            label={chip.label}
            onClick={() => setChipSet(chip.id)}
            className={`${css.chip} !animate-delay-[600ms]`}
            icon={<i className={chip.icon}></i>}
          />
        ))}
      </div>
      {chipSet >= 0 && (
        <div className={css.options}>
          {IntroChips[chipSet].options.map((opt) => (
            <div key={opt.id} className={css.option}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
