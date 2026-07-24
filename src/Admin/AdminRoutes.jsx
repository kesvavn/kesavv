import { Routes, Route } from "react-router-dom";
//admin
import AdminLogin from "./Auth/AdminLogin";

import ProtectedRoute from "./ProtectedRoute";


import MainLayout from "./Layouts/MainLayout";

import Dashboard from "./page/Dashboard";
import Requests from "./page/Requests";
import Bookings from "./page/Bookings";
import Customers from "./page/Customers";
import Venue from "./page/Venue";
import Packages from "./page/Packages";
import CancellationPolicy from "./page/CancellationPolicy";
import Pricing from "./page/Pricing";
import Availability from "./page/Availability";
import Payments from "./page/Payments";
import Gallery from "./page/Gallery";
import Reports from "./page/Reports";
import Notifications from "./page/Notifications";
import Settings from "./page/Settings";
import Footer from "../pages/Footer";

function AdminRoutes() {
  return (
    <Routes>
      
      <Route path="/admin/login" element={<AdminLogin/>}/>
       
<Route path="/admin" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}></Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="venue" element={<Venue />} />
        <Route path="packages" element={<Packages />} />
        <Route path="cancellation-policy" element={<CancellationPolicy />}/>
        <Route path="pricing" element={<Pricing />} />
        <Route path="availability" element={<Availability />} />
        <Route path="payments" element={<Payments />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;