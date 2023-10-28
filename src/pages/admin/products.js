import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";
import Adminmenu from "../../components/Layout/adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/product/get-products"
      );
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error("Error in Fetching");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(`${error}`);
    }
  };
  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 mt-5 p-2">
              <Adminmenu />
            </div>
            <div className="col-9 mt-5 p-2">
              <div className="text-justify mx-5 mt-5">Products</div>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    to={`/dashboard/admin/products/${p?.slug}`}
                    className="product-links"
                  >
                    <div
                      key={p?._id}
                      className="card m-2"
                      style={{ width: "18rem" }}
                    >
                      <img
                        className="card-img-top img-responsive"
                        src={`http://localhost:9000/api/v1/product/get-photo/${p?._id}`}
                        alt={`${p?.name}`}
                        height={200}
                        width={200}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p?.name}</h5>
                        <p className="card-text">{p?.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
