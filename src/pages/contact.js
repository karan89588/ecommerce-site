import React from "react";
import Layout from "../components/Layout/layout";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Contact() {
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-6 py-5">
              <img
                src={require("../images/contact.jpg")}
                width={600}
                height={400}
                className="contactImg"
                alt="Contact Us Image"
              />
            </div>
            <div className="col-md-6 col-lg-6 cu-left">
              <div className="cu-box">Contact Us</div>
              <p className="cu-text text-justify">We are Available 24 x 7.</p>
              <p className="cu-text text-justify">For Any Query Contact us </p>
              <p className="cu-text text-justify">
                <MdEmail />
                <a href="mailto:karanmouryadmp@gmail.com">
                  &nbsp;&nbsp;karanmouryadmp@gmail.com
                </a>
              </p>
              <p className="cu-text text-justify">
                <BsFillTelephoneFill />
                &nbsp;&nbsp;6396851756
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
