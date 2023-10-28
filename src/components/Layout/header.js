import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/searchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
export default function Header() {
  const [Auth, setAuth] = useAuth();
  const categories = useCategory();
  const [Cart] = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...Auth,
      user: null,
      token: "",
    });
    //console.log("pass0");
    localStorage.removeItem("auth");
    //console.log("pass1");
    navigate("/login");
    toast.success("Logout Successfully");
    //console.log("pass2");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <i className="fa-solid fa-bag-shopping"></i>
          <span className="navbar-brand-text">Ecommmerce Site</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Category
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to={`/categories`} className="dropdown-item">
                    All Categories
                  </NavLink>
                </li>
                {categories?.map((c) => (
                  <li key={c?._id}>
                    <NavLink
                      to={`/category/${c?.slug}`}
                      className="dropdown-item"
                    >
                      {c?.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            {!Auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {Auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={
                          Auth?.user?.role === 1
                            ? "/dashboard/admin"
                            : "/dashboard/user"
                        }
                        className="dropdown-item"
                      >
                        Dashborad
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                <Badge count={Cart?.length > 0 ? Cart?.length : ""}>Cart</Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
