import "./auth.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="front-auth">
      <div className="front-auth-wrapper">{children}</div>
    </main>
  );
}
