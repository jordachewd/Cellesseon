import { faqs } from "@/constants/faqs";

export default function Faqs() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="heading-4">Frequently Asked Questions</h2>
        <p className="body-2">
          Find answers to the most frequently asked questions below.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-lg border border-lightBorders-500 bg-lightBackground-100 px-4 py-3 shadow-sm transition-all open:border-lightAccent-700 open:bg-lightPrimary-100/60 dark:border-darkBorders-500 dark:bg-jwdMarine-900 dark:open:border-darkAccent-500 dark:open:bg-darkPrimary-900/50"
          >
            <summary
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
              className="flex cursor-pointer list-none items-center justify-between gap-4"
            >
              <h3 className="heading-6 text-left">{faq.question}</h3>
              <i className="bi bi-arrow-down-short text-xl transition-transform group-open:rotate-180"></i>
            </summary>
            <p id={`panel${faq.id}-content`} className="body-2 pt-3">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
