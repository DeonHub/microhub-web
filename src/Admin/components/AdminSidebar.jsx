import React from "react";
import "../Admin.css";

const AdminSidebar = ({ active }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a className="brand-link text-center" href="/">
        <span className="brand-text font-weight-light text-center">MicroHub</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            data-accordion="false"
            role="menu"
          >
            <li className="nav-item">
              <a className={`nav-link ${
                    active === "dashboard" ? "active" : ""
                  }`} href={"/admin/dashboard"}>
                <i className="nav-icon fa fa-house-user"></i>
                Dashboard
              </a>
            </li>

            <li className="nav-item">
              <a href="/admin/officers" className={`nav-link ${
                    active === "officer" ? "active" : ""
                  }`}>
                <i class="nav-icon  fa-solid fa-user-tie"></i>
                Officers
              </a>
            </li>

            <li className="nav-item">
              <a href="/admin/clients" className={`nav-link ${
                    active === "client" ? "active" : ""
                  }`}>
                <i className="nav-icon fa fa-users"></i>
                Clients
              </a>
            </li>

            <li className="nav-item">
              <a href="/admin/loans" className={`nav-link ${
                    active === "loan" ? "active" : ""
                  }`}>
                <i className="nav-icon fa fa-hand-holding-dollar"></i>
                Loans
              </a>
            </li>

            <li className="nav-item">
              <a href="/admin/transactions" className={`nav-link ${
                    active === "transaction" ? "active" : ""
                  }`} >
                <i className="nav-icon fa fa-dollar-sign"></i>
                Transactions
              </a>
            </li>

            <li className="nav-item">
              <a href="/admin/reports" className={`nav-link ${
                    active === "report" ? "active" : ""
                  }`} >
                <i className="nav-icon fa fa-address-book"></i>
                Reports
              </a>
            </li>


            <li className="nav-item">
              <a href="/admin/tickets" className={`nav-link ${
                    active === "ticket" ? "active" : ""
                  }`}>
                <i className="nav-icon fa fa-comments"></i>
                Support Tickets
              </a>
            </li>

            <li className="nav-item">
              <a href="/admin/faqs" className={`nav-link ${
                    active === "faq" ? "active" : ""
                  }`} >
                <i className="nav-icon fa fa-file-lines"></i>
                Activity Logs
              </a>
            </li>
          
            <li className="nav-item">
                  <a href="/admin/settings" className={`nav-link ${
                    active === "setting" ? "active" : ""
                  }`}>
                    <i className="fas fa-cog nav-icon"></i>
                    Settings
                  </a>
                </li>

              {/* <li className="nav-item ">
              <span className="nav-link text-white">
                <i className="nav-icon nav-icon fas fa-gears"></i>
                <p >
                  Settings<i className="fas fa-angle-left right"></i>
                </p>
              </span>
              <ul className="nav nav-treeview">
                
              </ul>
              </li> */}

            
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
