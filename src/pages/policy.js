import React from "react";
import Layout from "../components/Layout/layout";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Policy() {
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-6 py-5">
              <img
                src={require("../images/policy.jpg")}
                width={500}
                height={400}
                className="policyImg"
                alt="Policy Us Image"
              />
            </div>
            <div className="col-md-6 col-lg-6 cu-left">
              <div className="cu-box">Policy</div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
