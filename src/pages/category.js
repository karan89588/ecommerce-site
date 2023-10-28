import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/layout";
import axios from "axios";
export default function Category() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:9000/api/v1/category/category-products/${params.slug}`
    );
    if (data.success) {
      setProducts(data?.product);
    }
  };
  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);
  return (
    <Layout>
      <h5 className="text-center">{params.slug.toUpperCase()}</h5>
      <h6 className="text-center">{products?.length} records found</h6>
      <div className="d-flex flex-wrap">
        {products?.map((p) => (
          <div key={p?._id} className="card m-2" style={{ width: "18rem" }}>
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
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/product/${p?.slug}`)}
              >
                More Details
              </button>
              <button
                className="btn btn-secandary"
                onClick={() => navigate("")}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
