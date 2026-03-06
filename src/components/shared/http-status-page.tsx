import Link from "next/link";
import PageWrapper from "@/components/layout/page-wrapper";

interface HttpStatusPageProps {
  code: 401 | 403 | 500;
  title: string;
  message: string;
  details: string;
  ctaHref: string;
  ctaLabel: string;
}

const panelClassByCode: Record<HttpStatusPageProps["code"], string> = {
  401: "bg-red-800",
  403: "bg-red-800",
  500: "bg-amber-700",
};

export default function HttpStatusPage({
  code,
  title,
  message,
  details,
  ctaHref,
  ctaLabel,
}: HttpStatusPageProps) {
  return (
    <PageWrapper className="items-center justify-center gap-10 px-4">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-lightText-600 dark:text-darkText-700">
        HTTP {code}
      </p>

      <h1 className="heading-1 text-center">{title}</h1>

      <div
        className={`flex max-w-2xl flex-col items-center gap-2 rounded-xl p-8 text-white shadow-lg ${panelClassByCode[code]}`}
      >
        <h2 className="heading-6 text-center text-white">{message}</h2>
        <p className="body-2 text-center text-white">{details}</p>
      </div>

      <Link href={ctaHref} className="btn btn-sm btn-contained">
        {ctaLabel}
      </Link>
    </PageWrapper>
  );
}
