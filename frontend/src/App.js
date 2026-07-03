import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Employee from "./pages/masters/Employee";
import AddOffice from "./pages/masters/AddOffice";
import UserManagement from "./pages/masters/UserManagement";
import SchemeMasterEntry from "./pages/masters/SchemeMasterEntry"
import SchemeConfiguration from "./pages/scheme/SchemeConfiguration"
import Dashboard from "./pages/Dashboard";
import EmpDashboard from "./pages/EmpDashboard";
import Logout from "./pages/logout";
import MainLayout from "./components/Layout";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn === "true"   ? children   : <Navigate to="/login" replace />;
}

function App() {
  const [moduleName, setModuleName] = useState("");
  useEffect(() => {
    const loader = document.getElementById("loading");

    if (loader) {
      loader.style.display = "none";
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <Dashboard setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />

        <Route path="/empdashboard" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <EmpDashboard setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />

        <Route path="/master/employee" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <Employee setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />

        <Route path="/master/usermanagement" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <UserManagement setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />

        <Route path="/master/office" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <AddOffice setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />
        <Route path="/scheme/schemeconfiguration" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <SchemeConfiguration setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />
        <Route path="/master/schememasterentry" element={<PrivateRoute><MainLayout moduleName={moduleName}>
          <SchemeMasterEntry setModuleName={setModuleName} /></MainLayout></PrivateRoute>} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;