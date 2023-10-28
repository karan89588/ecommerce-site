import React from "react";
import { NavLink } from "react-router-dom";
export default function Adminmenu() {
  return (
    <>
      <NavLink to="/dashboard/admin">
        <h3 className="text-center">Admin Panel</h3>
      </NavLink>
      <div className="list-group mt-3">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          Show Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/show-users"
          className="list-group-item list-group-item-action"
        >
          Show Users
        </NavLink>
      </div>
    </>
  );
}
