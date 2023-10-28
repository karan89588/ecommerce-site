import React from "react";
import Layout from "../../components/Layout/layout";
import { useAuth } from "../../context/auth";
import Usermenu from "../../components/Layout/usermenu";
export default function UserDashboard() {
  const [Auth] = useAuth();
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 mt-5 p-2">
              <Usermenu />
            </div>
            <div className="col-9 mt-5 p-2">
              <div className="text-justify mx-5 mt-5">
                <h5>Name : {Auth?.user?.name}</h5>
                <h5>Address : {Auth?.user?.address}</h5>
                <h5>Phone : {Auth?.user?.phone}</h5>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
