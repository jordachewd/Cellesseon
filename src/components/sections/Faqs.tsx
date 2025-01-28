import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import css from "@/styles/sections/Faqs.module.css";
import { faqs } from "@/constants/faqs";

export default function Faqs() {
  return (
    <div className={css.section}>
      <div className={css.head}>
        <Typography variant="h4">Frequently Asked Questions</Typography>
        <Typography variant="body2">
          Find answers to the most frequently asked questions below.
        </Typography>
      </div>
      <div className={css.faqs}>
        {faqs.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary
              expandIcon={<i className="bi bi-arrow-down-short text-xl"></i>}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
            >
              <Typography component="span" variant="h6">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
