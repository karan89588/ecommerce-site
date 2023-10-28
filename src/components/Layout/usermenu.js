import React from "react";
import { NavLink } from "react-router-dom";
export default function Usermenu() {
  return (
    <>
      <NavLink to="/dashboard/user">
        <h3 className="text-center">User Panel</h3>
      </NavLink>
      <div className="list-group mt-3">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Show Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Show Orders
        </NavLink>
      </div>
    </>
  );
}
