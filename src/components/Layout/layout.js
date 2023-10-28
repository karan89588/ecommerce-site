import React from "react";
import Header from "./header.js";
import Footer from "../footer.js";
import { Helmet } from "react-helmet";
export default function Layout(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="author" content={props.author} />
        <meta name="keyword" content={props.keyword} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "78vh" }}>{props.children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce Site",
  description: "You can Shop anytime",
  keyword: "cheap-clothes,reliable,resanable-price",
  author: "Karan Maurya",
};
