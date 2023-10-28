import React from "react";
import Layout from "../components/Layout/layout";

export default function Pagenotfound() {
  return (
    <>
      <Layout>
        <div className="pnf-container">
          <div className="box">
            <p className="t404">404</p>
            <p className="text text-center">Page Not Found</p>
            <div className="pnf-btn">
              <div className="pnf-btn-text">Go Back</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
