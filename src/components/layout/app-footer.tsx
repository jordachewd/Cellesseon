import lightLogo from "../../../public/images/jwd_light.png";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="z-20 flex w-full items-center justify-between border-t border-lightPrimary-800/20 bg-white px-4 dark:border-jwdMarine-900/80 dark:bg-jwdMarine-1000">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-3 py-6 lg:flex-row lg:py-3">
        <div className="flex items-center gap-4 text-xs opacity-60">
          <div className="flex border-r border-black/25 pr-4 dark:border-white/10">
            <Image
              src={lightLogo}
              alt="JWD"
              width={32}
              height={32}
              className="z-10 opacity-50"
              priority
            />
          </div>

          <div className="flex flex-col text-xxs leading-3">
            <span>&copy; {new Date().getFullYear()} JordacheWD.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs opacity-60">
          <span>Privacy & Cookie Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </section>
  );
}
