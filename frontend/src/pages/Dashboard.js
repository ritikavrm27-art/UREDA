import React, { useEffect  } from "react";
import { Link } from "react-router-dom";
import CatalogueCard from "../components/CatalogueCard";

function Dashboard({ setModuleName }) {
   const cards = [
  { link: "/master/office",   title: "Office Management",  subtitle: "Insert, Update Office",   bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-building" },
  { link: "/master/employee",    title: "Employee Management",    subtitle: "Add, Verify and update employee details",    bgColor: "#f0fdf4", iconColor: "#15803d", icon: "fa fa-user"    },
  { link: "/master/usermanagement",    title: "User Management",    subtitle: "Add, Verify and update user details",    bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-users"    },
  { link: "/master/schememasterentry",    title: "Scheme Master Entry",    subtitle: "Add and update scheme master data",    bgColor: "#fef2f2", iconColor: "#dc2626", icon: "fa fa-list-alt"    },
  { link: "/scheme/schemeconfiguration",    title: "Scheme Configuration",    subtitle: "Add and update scheme configuration",    bgColor: "rgb(234 251 255)", iconColor: "rgb(23 162 184)", icon: "fa fa-cogs"    },
  
];

   useEffect(() => {
      setModuleName("Dashboard");
   }, []);
  
  return (  

      <div classNameName="container-fluid content-inner py-0 mt-2">
            <h5 className="fw-semibold mb-1 p-3">Master Entry</h5>
            <div className="row g-3 px-3">
              {cards.map((card, index) => (
                <CatalogueCard key={index} {...card} />
              ))}
            </div>
      </div>    
  );
}

export default Dashboard;