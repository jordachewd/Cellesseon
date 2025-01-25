import Header from "@/components/layout/Header";
import InnerPage from "@/components/layout/InnerPage";
import PageHead from "@/components/layout/PageHead";
import LoadingPage from "@/components/shared/LoadingPage";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const { userId } = await auth();

  if (!userId) {
    return <LoadingPage />;
  }

  const userData: UserData = await getUserById(userId);

  if (userData.role !== "admin") redirect("/");

  return (
    <>
      <Header />
      <InnerPage>
        <PageHead
          title="Admin Dashboard"
          subtitle="App settings (admin only)"
        />
        <div className="flex items-center justify-center">
          <ol className="list-decimal">
            <li>Manage users</li>
            <li>Manage subscriptions</li>
            <li>Manage transactions</li>
            <li>Manage settings</li>
            <li>Manage content</li>
            <li>Manage integrations</li>
            <li>Manage security</li>
            <li>Manage performance</li>
            <li>Manage analytics</li>
            <li>Manage backups</li>
            <li>Manage updates</li>
            <li>Manage support</li>
            <li>Manage billing</li>
            <li>Manage notifications</li>
            <li>Manage privacy</li>
            <li>Manage terms of service</li>
            <li>Manage cookies</li>
            <li>etc..</li>
          </ol>
        </div>
      </InnerPage>
    </>
  );
}
