import css from "@/styles/chat/ChatIntro.module.css";
import { IntroChips } from "@/constants/introChipsData";
import { Chip, Typography } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import LoadingBubbles from "../shared/LoadingBubbles";

interface ChatIntroProps {
  sendPrompt: (prompt: string) => void;
}

export default function ChatIntro({ sendPrompt }: ChatIntroProps) {
  const { user, isLoaded } = useUser();
  const [chipSet, setChipSet] = useState<number>(-1);

  if (!isLoaded) {
    return (
      <section className={css.section}>
        <LoadingBubbles size="large" />
      </section>
    );
  }

  return (
    <section className={css.section}>
      {chipSet < 0 ? (
        <>
          <Typography variant="h5" className={css.title}>
            Hello {user?.firstName || "there"}!
          </Typography>

          <Typography variant="h3" className={css.subtitle}>
            How can I help you?
          </Typography>
          <div className={css.chips}>
            {IntroChips.map((chip) => (
              <Chip
                key={chip.id}
                variant="outlined"
                label={chip.label}
                onClick={() => setChipSet(chip.id)}
                className={`${css.chip} ${css[`chip_${chip.id}`]}`}
                icon={<i className={chip.icon}></i>}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <Typography variant="h5" className={css.subtitle}>
            Here are some prompt examples...
          </Typography>
          <div className={css.options}>
            {IntroChips[chipSet].options.map((opt) => (
              <Chip
                key={opt.id}
                variant="outlined"
                label={opt.label}
                onClick={() => sendPrompt(opt.label)}
                className={`${css.chip} ${css[`chip_${opt.id}`]}`}
              />
            ))}

            <i
              className={`bi bi-x-circle ${css.chip} ${css.chip_x}`}
              onClick={() => {
                setChipSet(-1);
                sendPrompt("");
              }}
            ></i>
          </div>
        </>
      )}
    </section>
  );
}
