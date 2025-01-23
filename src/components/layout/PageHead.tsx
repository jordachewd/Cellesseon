import css from "@/styles/layout/PageHead.module.css";
import { Typography } from "@mui/material";

interface PageHeadProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;
}
export default function PageHead({ title, subtitle, children }: PageHeadProps) {
  return (
    <div className={css.section}>
      <Typography variant="h2">{title}</Typography>
      {subtitle && <Typography variant="body1">{subtitle}</Typography>}
      {children}
    </div>
  );
}
