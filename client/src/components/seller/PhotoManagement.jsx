import React from "react";
import DashboardHeader from "../DashboardHeader";
import ImageAdd from "../ImageAdd";
const PhotoManagement = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <div>
          <DashboardHeader />
          <ImageAdd />
        </div>
      </div>
    </>
  );
};

export default PhotoManagement;
