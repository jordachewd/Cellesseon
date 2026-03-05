import { IntroChips } from "@/constants/introChipsData";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import LoadingBubbles from "../shared/LoadingBubbles";

interface ChatIntroProps {
  sendPrompt: (prompt: string) => void;
}

export default function ChatIntro({ sendPrompt }: ChatIntroProps) {
  const { user, isLoaded } = useUser();
  const [chipSet, setChipSet] = useState<number>(-1);

  const handleChooseChip = (id: number) => {
    setChipSet(id);
  };

  const handleSendPrompt = (prompt: string) => {
    sendPrompt(prompt);
  };

  const closeIntro = () => {
    setChipSet(-1);
    sendPrompt("");
  };

  if (!isLoaded) {
    return (
      <section className="flex w-full items-center justify-center">
        <LoadingBubbles size="large" />
      </section>
    );
  }

  return (
    <>
      {chipSet < 0 ? (
        <>
          <h1 className="heading-5 animate-fade-up animate-once animate-duration-700 text-center">
            Hello {user?.firstName || "there"}!
          </h1>

          <h2 className="heading-3 animate-fade-up animate-once animate-duration-700 animate-delay-[200ms] text-center">
            How can I help you?
          </h2>
          <div className="!mt-8 flex w-full flex-wrap items-center justify-center">
            {IntroChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleChooseChip(chip.id)}
                className={`m-2 flex items-center gap-2 rounded-lg border border-lightAccent-700 px-3 py-2 text-sm text-lightAccent-700 transition-all duration-300 ease-in-out hover:bg-lightAccent-700 hover:text-white dark:border-darkAccent-500 dark:text-darkAccent-500 dark:hover:bg-darkAccent-500 dark:hover:text-darkAccent-1000 animate-fade-up animate-once animate-duration-700`}
                style={{ animationDelay: `${300 + chip.id * 100}ms` }}
              >
                <i className={chip.icon}></i>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="heading-5 animate-fade-up animate-once animate-duration-700 animate-delay-[200ms] text-center">
            Here are some prompt examples...
          </h2>
          <div className="flex w-full flex-col items-center justify-center">
            {IntroChips[chipSet].options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  handleSendPrompt(`${IntroChips[chipSet].label}: ${opt.label}`)
                }
                className={`m-2 flex max-w-xl items-center gap-2 rounded-lg border border-lightAccent-700 px-3 py-2 text-sm text-lightAccent-700 transition-all duration-300 ease-in-out hover:bg-lightAccent-700 hover:text-white dark:border-darkAccent-500 dark:text-darkAccent-500 dark:hover:bg-darkAccent-500 dark:hover:text-darkAccent-1000 animate-fade-up animate-once animate-duration-700`}
                style={{ animationDelay: `${300 + opt.id * 100}ms` }}
              >
                {opt.label}
              </button>
            ))}

            <button
              type="button"
              className="mt-6 text-3xl text-jwdMarine-200/50 transition-all hover:text-jwdMarine-200/80 animate-fade-up animate-once animate-duration-700 animate-delay-[800ms]"
              onClick={closeIntro}
              aria-label="Close prompt suggestions"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
}
