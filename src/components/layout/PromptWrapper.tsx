import css from "./PromptWrapper.module.css";
import { ReactNode } from "react";

interface PromptWrapperProps {
  children: ReactNode;
}

export default function PromptWrapper({ children }: PromptWrapperProps) {
  return <section className={css.section}>{children}</section>;
}
