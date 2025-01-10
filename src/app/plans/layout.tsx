import PageWrapper from "@/components/layout/PageWrapper"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>;
}
