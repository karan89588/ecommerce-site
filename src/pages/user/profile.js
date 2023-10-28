import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/layout";
import { useAuth } from "../../context/auth";
import Usermenu from "../../components/Layout/usermenu";
export default function Profile() {
  const [Auth, setAuth] = useAuth();
  const [nameu, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  useEffect(() => {
    setName(Auth?.user?.name);
    setEmail(Auth?.user?.email);
    setPhone(Auth?.user?.phone);
    setAddress(Auth?.user?.address);
  }, [Auth]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `http://localhost:9000/api/v1/auth/profile`,
      {
        name: nameu,
        email,
        password,
        phone,
        address,
      }
    );
    //console.log(res.data.msg);
    if (data.success === false) toast.error(data.msg);
    else {
      toast.success(data?.msg);
      //console.log(data);
      setAuth({ ...Auth, user: data?.user });
      //console.log(Auth);
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setPhone(data?.user?.phone);
      //setPassword(data?.user?.password);
      setAddress(data?.user?.address);
      //setAnswer(data?.updatedUser?.answer);
      //navigate("/login");
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data?.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 mt-5 p-2">
              <Usermenu />
            </div>
            <div className="col-9">
              <div className="regmain">
                <div className="regCont">
                  <div className="regtitle">Update Profile</div>
                  <form onSubmit={handleUpdate} className="regform">
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
                        disabled
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
                      <input type="submit" id="regsubmit" value="Update" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
