import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PhotoManagement from "../components/seller/PhotoManagement";
import Analytics from "../components/Analytics";
import Orders from "../components/Orders";
import { useSelector } from "react-redux";

const SellerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      {/* <div></div>
      <PhotoManage  ment />
      <Analytics/> */}
      <PhotoManagement />
      {/* <Analytics /> */}
    </div>
  );
};

export default SellerDashboard;
