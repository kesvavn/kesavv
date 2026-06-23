import AdminLayout from "../Layout/AdminLayout";
import StatsCards from "../Component/StatsCards";
import FilterBar from "../Component/FilterBar";
import RequestTable from "../Component/RequestTable";

function Dashboard() {
  return (
    <AdminLayout>

      <StatsCards />

      <FilterBar />

      <RequestTable />

    </AdminLayout>
  );
}

export default Dashboard;