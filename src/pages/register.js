import React, { useState } from "react";
import Layout from "../components/Layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [nameu, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [answer, setAnswer] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:9000/api/v1/auth/register`, {
      name: nameu,
      email,
      password,
      role: 0,
      phone,
      address,
      answer,
    });
    //console.log(res.data.msg);
    if (res.data.success === false) toast.error(res.data.msg);
    else {
      toast.success(res.data.msg);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAddress("");
      setAnswer("");
      navigate("/login");
    }
  };
  return (
    <>
      <Layout>
        <div className="regmain">
          <div className="regCont">
            <div className="regtitle">Register</div>
            <form onSubmit={handleSubmit} className="regform">
              <div className="regfield">
                <input
                  type="text"
                  value={nameu}
                  id="name"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  type="number"
                  value={phone}
                  id="phone"
                  placeholder="Enter Phone Numner"
                  onChange={(e) => setPhone(e.target.value)}
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
                  type="text"
                  value={address}
                  id="address"
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="regfield">
                <input
                  type="text"
                  value={answer}
                  id="answer"
                  placeholder="Enter Answer"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <div className="regfield">
                <input type="submit" id="regsubmit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
