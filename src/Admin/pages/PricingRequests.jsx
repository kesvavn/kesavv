import AdminLayout from "../Layout/AdminLayout";
import StatsCards from "../Component/StatsCards";
import FilterBar from "../Component/FilterBar";
import RequestTable from "../Component/RequestTable";
import CustomPagination from "../Component/Pagination";

function PricingRequests() {
  return (
    <AdminLayout>
      <StatsCards />
      <FilterBar />
      <RequestTable />
      <CustomPagination />
    </AdminLayout>
  );
}

export default PricingRequests;