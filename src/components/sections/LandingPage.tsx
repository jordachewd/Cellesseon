import Plans from "./Plans";
import Faqs from "./Faqs";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section
      className="relative z-10 -mt-14 mb-10 flex w-full flex-1 flex-col items-center gap-10"
      id="LandingPageWrapper"
    >
      <div className="flex w-full items-center justify-between bg-white/50 px-8 pt-14 shadow-sm dark:bg-darkPrimary-900/50">
        <div className="mx-auto mt-12 flex max-w-screen-2xl flex-col items-center justify-between lg:mt-0 lg:flex-row lg:gap-5">
          <div className="flex w-full flex-col items-center gap-12 text-center lg:w-1/2 lg:items-start lg:text-left">
            <h1 className="heading-2">Simplify tasks and boost productivity</h1>

            <p className="heading-6">
              Spark creativity, organize plans, and learn something new every
              day
            </p>

            <Link
              className="btn btn-lg btn-outlined min-w-[300px]"
              href="/sign-up"
            >
              Try it for free
            </Link>
          </div>

          <div className="relative flex w-full justify-center self-end overflow-hidden lg:w-1/2 sm:min-h-[500px] xl:min-h-[600px] xxl:min-h-[700px]">
            <Image
              src="/images/lp-hero-image.png"
              alt="hero"
              width={700}
              height={700}
              priority
              className="z-10"
            />

            <div className="absolute -bottom-28 left-1/2 z-0 h-[90%] w-[60%] -translate-x-1/2 rounded-full bg-lightSecondary-400/30 blur-3xl dark:bg-darkSecondary-400/20">
              &nbsp;
            </div>
          </div>
        </div>
      </div>

      <Plans />
      <Faqs />
    </section>
  );
}
