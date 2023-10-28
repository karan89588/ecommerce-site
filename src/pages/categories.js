import React from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/layout";
import { useNavigate } from "react-router-dom";
export default function Categories() {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-6" key={c?._id}>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/category/${c?.slug}`)}
              >
                {c?.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
