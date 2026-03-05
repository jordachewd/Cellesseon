interface PageHeadProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;
}
export default function PageHead({ title, subtitle, children }: PageHeadProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="heading-2 text-center">{title}</h1>
      {subtitle && <p className="body-1 text-center">{subtitle}</p>}
      {children}
    </div>
  );
}
