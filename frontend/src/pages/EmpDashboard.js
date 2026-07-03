import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";

function EmpDashboard({ setModuleName }) {
   const [username, setUsername] = useState("");
   const [role, setRole] = useState("");
   const [office, setOffice] = useState("");
   const [empname, setEmpName] = useState("");
   const userData = localStorage.getItem("user");
  
   useEffect(() => {
      setModuleName("Employee Dashboard");
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUsername(userData.user_id); // or user.name if your API returns "name"
      setRole(userData.role);
      setOffice(userData.office);
      setEmpName(userData.empname);
    //   if (userData) { 
    //   const user = JSON.parse(userData);
    //   //console.log("User data from localStorage:", user);
      
    // }
     // console.log(console.log("Emp data from localStorage:", userData));
   }, []);
  
  return (  

      <div className="container-fluid content-inner mt-n5 px-3 py-0">
          <div className="row g-3 py-3">
              <div className="col-xl-3 col-lg-4">
                <div class="card shadow-sm mb-4">
                  <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                      <div class="avatar-box bg-teal-light text-teal-dark d-flex align-items-center justify-content-center mr-3">RV</div>
                      <div>
                        <div class="font-weight-bold">{empname}</div>
                        <small class="text-muted">{role}</small>
                      </div>
                    </div>
                    <hr />
                    <p class="mb-2"><i class="fa fa-envelope-o text-teal mr-2"></i> {username}</p>
                    <p class="mb-2"><i class="fa fa-id-card-o text-teal mr-2"></i> {role}</p>
                    <p class="mb-0"><i class="fa fa-building-o text-teal mr-2"></i> {office}</p>
                  </div>
                </div>
                <div className="card mt-2 mb-4" style={{minHeight:"200px"}}>
                    <div className="card-header d-flex justify-content-between border-0">
                      <div className="header-title bg-white font-weight-bold"><i class="fa fa-th-large text-teal mr-2"></i> Quick Links</div>
                    </div>
                    <div className="card-body row">
                      <div class="row">
                        <div class="col-4 mb-3 text-center">
                          <a href="/master/office" class="qlink d-block p-2 rounded border text-dark text-decoration-none">
                            <div class="icon-box bg-coral-light text-coral d-flex align-items-center justify-content-center mx-auto mb-2">
                              <i class="fa fa-building"></i></div>
                            <small class="font-weight-bold">Office</small>
                          </a>
                        </div>
                        <div class="col-4 mb-3 text-center">
                          <a href="/master/employee" class="qlink d-block p-2 rounded border text-dark text-decoration-none">
                            <div class="icon-box bg-coral-light text-coral d-flex align-items-center justify-content-center mx-auto mb-2">
                              <i class="fa fa-user"></i></div>
                            <small class="font-weight-bold">Employee</small>
                          </a>
                        </div>
                        <div class="col-4 mb-3 text-center">
                          <a href="/master/usermanagement" class="qlink d-block p-2 rounded border text-dark text-decoration-none">
                            <div class="icon-box bg-coral-light text-coral d-flex align-items-center justify-content-center mx-auto mb-2">
                              <i class="fa fa-users"></i></div>
                            <small class="font-weight-bold">User Mgmt</small>
                          </a>
                        </div>
                        <div class="col-4 text-center">
                          <a href="/master/schememasterentry" class="qlink d-block p-2 rounded border text-dark text-decoration-none">
                            <div class="icon-box bg-coral-light text-coral d-flex align-items-center justify-content-center mx-auto mb-2">
                              <i class="fa fa-list-alt"></i></div>
                            <small class="font-weight-bold">Master Data</small>
                          </a>
                        </div>
                        <div class="col-4 text-center">
                          <a href="#" class="qlink d-block p-2 rounded border text-dark text-decoration-none">
                            <div class="icon-box bg-coral-light text-coral d-flex align-items-center justify-content-center mx-auto mb-2"><i class="fa fa-clipboard"></i></div>
                            <small class="font-weight-bold">Reports</small>
                          </a>
                        </div>
                        <div class="col-4 text-center">
                          <a href="#" class="qlink d-block p-2 rounded border text-dark text-decoration-none">
                            <div class="icon-box bg-coral-light text-coral d-flex align-items-center justify-content-center mx-auto mb-2"><i class="fa fa-book"></i></div>
                            <small class="font-weight-bold">Reports</small>
                          </a>
                        </div>
                      </div>
                </div>
                </div>
                <div class="card shadow-sm mb-4">
                  <div class="card-header bg-white font-weight-bold"><i class="fa fa-download text-teal mr-2"></i>Download Forms</div>
                  <div class="card-body text-center py-4">
                    <div class="icon-box-lg bg-teal-light text-teal d-flex align-items-center justify-content-center mx-auto mb-3"><i class="fa fa-folder-open-o fa-lg"></i></div>
                    <p class="font-weight-bold mb-1">No forms yet</p>
                    <small class="text-muted">Downloadable forms will show up here once published.</small>
                  </div>
                </div>
                <div class="card shadow-sm">
                  <div class="card-header bg-white font-weight-bold"><i class="fa fa-headphones text-teal mr-2"></i>Helpdesk</div>
                  <div class="card-body">
                    <p class="text-muted small mb-2">Need a hand? Reach out anytime.</p>
                    <p class="mb-2"><i class="fa fa-phone text-coral mr-2"></i>XXXX-XXXXXXX</p>
                    <p class="mb-0"><i class="fa fa-envelope text-coral mr-2"></i>xyz@gmail.com</p>
                  </div>
                </div>
            </div>
            <div class="col-lg-6 mb-4">
              <div class="card shadow-sm h-50 mb-4">
                <div class="card-header bg-white font-weight-bold"><i class="fa fa-calendar text-teal mr-2"></i>Office Orders</div>
                <div class="card-body d-flex align-items-center justify-content-center" style={{minHeight: "300px"}}>
                  <div class="text-center">
                    <div class="icon-box-lg bg-teal-light text-teal d-flex align-items-center justify-content-center mx-auto mb-3">
                      <i class="fa fa-file-text-o fa-lg"></i>
                    </div>
                    <h6 class="font-weight-bold">No office orders yet</h6>
                    <p class="text-muted small mb-0">Office orders and circulars will appear here once they're issued.</p>
                  </div>
                </div>
              </div>
              <div class="card shadow-sm h-50">
                <div class="card-header bg-white font-weight-bold"><i class="fa fa-calendar text-teal mr-2"></i>Work Anniversary</div>
                <div class="card-body d-flex align-items-center justify-content-center" style={{minHeight: "300px"}}>
                  <div class="text-center">
                    <div class="icon-box-lg bg-teal-light text-teal d-flex align-items-center justify-content-center mx-auto mb-3">
                      <i class="fa fa-birthday-cake fa-lg"></i>
                    </div>
                    <h6 class="font-weight-bold">No anniversaries today</h6>
                    <p class="text-muted small mb-0">Upcoming work anniversaries will be shown here.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 mb-4">
            <div class="card shadow-sm mb-4">
              <div class="card-header bg-white font-weight-bold"><i class="fa fa-calendar text-teal mr-2"></i>Leave Register</div>
              <div class="card-body text-center py-4">
                <div class="icon-box-lg bg-teal-light text-teal d-flex align-items-center justify-content-center mx-auto mb-3"><i class="fa fa-calendar-check-o fa-lg"></i></div>
                <p class="font-weight-bold mb-1">Nothing logged yet</p>
                <small class="text-muted">Your leave history will appear here once available.</small>
              </div>
            </div>

           <div class="card shadow-sm mb-4">
            <div class="card-header bg-white font-weight-bold d-flex align-items-center">
              <i class="fa fa-newspaper-o text-teal mr-2"></i>Latest News & Updates
              <span class="badge badge-pill bg-coral-light text-coral ml-auto">0</span>
            </div>
            <div class="card-body text-center py-4">
              <div class="icon-box-lg bg-teal-light text-teal d-flex align-items-center justify-content-center mx-auto mb-3">
                <i class="fa fa-newspaper-o fa-lg"></i>
              </div>
              <p class="font-weight-bold mb-1">No news yet</p>
              <small class="text-muted">New updates and announcements will appear here.</small>
            </div>
          </div>
            <div class="card shadow-sm mb-4">
              <div class="card-header bg-white font-weight-bold d-flex align-items-center">
                <i class="fa fa-hourglass-half text-teal mr-2"></i>Pending Approvals & Proceedings
                <span class="badge badge-pill bg-coral-light text-coral ml-auto">0</span>
              </div>
              <div class="card-body text-center py-4">
                <div class="icon-box-lg bg-teal-light text-teal d-flex align-items-center justify-content-center mx-auto mb-3"><i class="fa fa-check-circle-o fa-lg"></i></div>
                <p class="font-weight-bold mb-1">Nothing pending</p>
                <small class="text-muted">New approval requests will be listed here.</small>
              </div>
            </div>

          </div>
                </div>    
                </div>
  );
}

export default EmpDashboard;