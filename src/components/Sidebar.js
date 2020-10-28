import React from 'react';
import {Link} from 'react-router-dom';

function Sidebar() {
  return (
     <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Link to="/listDevices" className="brand-link">
      <img src="assets/dist/img/logo1.png" alt="ADA Logo" className="brand-image img-circle elevation-3"
           style={{"opacity": ".8","backgroundColor":"white"}}/>
      <span className="brand-text font-weight-light">ADA</span>
    </Link>
    <div className="sidebar">     
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item has-treeview">
            <Link to="#" className="nav-link">
              <i className="nav-icon fas fa-laptop"></i>
              <p>
                Devices
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/addDevices" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Add Devices</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/listDevices" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>List Devices</p>
                </Link>
              </li>              
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <Link to="#" className="nav-link">
              <i className="nav-icon fas fa-users"></i>
              <p>Users<i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/addUsers" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Add Users</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/listUsers" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>List Users</p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <Link to="#" className="nav-link">
              <i className="nav-icon fas fa-cart-plus"></i>
              <p>
                Assign Devices
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/assignDevices" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Assign Devices</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/listAssigned" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>List Assigned</p>
                </Link>
              </li>  
            </ul>
          </li>          
        </ul>
      </nav>
    </div>
  </aside>

  
  );
}

export default Sidebar;

