import InnerPage from "@/components/layout/InnerPage";
import PageHead from "@/components/layout/PageHead";

export default async function AdminDashboard() {
  return (
    <InnerPage>
      <PageHead title="Admin Dashboard" subtitle="App settings (admin only)" />
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
  );
}
