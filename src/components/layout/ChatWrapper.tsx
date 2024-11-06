import css from "./ChatWrapper.module.css";
import { ReactNode } from "react";
interface ChatWrapperProps {
  children: ReactNode;
}

export default function ChatWrapper({ children }: ChatWrapperProps) {
  return <section className={css.section}>{children}</section>;
}
