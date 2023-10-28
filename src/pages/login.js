import React, { useState } from "react";
import Layout from "../components/Layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
export default function Register() {
  const [Auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:9000/api/v1/auth/login`, {
      email,
      password,
    });
    console.log(res.data.msg);
    setAuth({
      ...Auth,
      user: res.data.user,
      token: res.data.token,
    });
    localStorage.setItem("auth", JSON.stringify(res.data));
    if (res.data.success === false) toast.error(res.data.msg);
    else {
      toast.success(res.data.msg);
      setEmail("");
      setPassword("");
      navigate(location.state || "/");
    }
  };
  return (
    <>
      <Layout>
        <div className="regmain">
          <div className="regCont">
            <div className="regtitle">Login</div>
            <form onSubmit={handleSubmit} className="regform">
              <div className="regfield">
                <input
                  type="email"
                  value={email}
                  id="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="regfield">
                <input
                  type="password"
                  value={password}
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="regfield">
                <input
                  type="button"
                  onClick={() => navigate("/forget-password")}
                  id="regsubmit"
                  value="Forget Password"
                />
              </div>
              <div className="regfield">
                <input type="submit" id="regsubmit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
