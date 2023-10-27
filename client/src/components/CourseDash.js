import React from "react";
import AdminHome from "./AdminHome";
import CourseDashnav from "./CourseDashnav";
import Breadcrumbs from "./Breadcrumb";
import { useState } from "react";
import CoursedashCard from "./CoursedashCard";

export default function CourseDash() {
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { text: "Admin Dashboard", url: "/adminpanel" },
        { text: "Course Dashboard", url: "/coursedashboard" },
       
      ]);

  return (
    <div>
         <Breadcrumbs items={breadcrumbItems} />,
    <div>
      
      <div>
        <AdminHome />
      </div>
      <div>
        <CourseDashnav />
      </div>
      <div>
        <CoursedashCard/>
      </div>
    </div>
    </div>
  );
}
