import css from "./ChatIntro.module.css";
import { Chip, Typography } from "@mui/material";

export default function ChatIntro() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <div className={css.wrapper}>
      <Typography variant="h2" className={css.title}>
        Hello there!
      </Typography>

      <Typography variant="h5" className={css.subtitle}>
        How can I help you?
      </Typography>

      <div className={css.chips}>
        <Chip
          variant="outlined"
          label="Ask anything"
          onClick={handleClick}
          className={`${css.chip} !animate-delay-500`}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          variant="outlined"
          label="Create image"
          onClick={handleClick}
          className={`${css.chip} !animate-delay-[600ms]`}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          variant="outlined"
          label="Analyze images"
          onClick={handleClick}
          className={`${css.chip} !animate-delay-700`}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          variant="outlined"
          label="Summarize text"
          onClick={handleClick}
          className={`${css.chip} !animate-delay-[800ms]`}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          variant="outlined"
          label="Fix code errors"
          onClick={handleClick}
          className={`${css.chip} !animate-delay-[900ms]`}
          icon={<i className="bi bi-brilliance"></i>}
        />
      </div>
    </div>
  );
}
