import React from "react";
import Layout from "../../components/Layout/layout";
import Adminmenu from "../../components/Layout/adminmenu";

export default function Users() {
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 mt-5 p-2">
              <Adminmenu />
            </div>
            <div className="col-9 mt-5 p-2">
              <div className="text-justify mx-5 mt-5">All Users</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
