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
          label="Ask anything"
          variant="outlined"
          onClick={handleClick}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          label="Create image"
          variant="outlined"
          onClick={handleClick}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          label="Analyze images"
          variant="outlined"
          onClick={handleClick}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          label="Summarize text"
          variant="outlined"
          onClick={handleClick}
          icon={<i className="bi bi-brilliance"></i>}
        />
        <Chip
          label="Fix code errors"
          variant="outlined"
          onClick={handleClick}
          icon={<i className="bi bi-brilliance"></i>}
        />
      </div>
    </div>
  );
}
