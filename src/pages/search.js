import React from "react";
import Layout from "../components/Layout/layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
export default function Search() {
  const [Cart, setCart] = useCart();
  const [Search] = useSearch();
  const navigate = useNavigate();
  const handleAddCart = async (p) => {
    try {
      const found = Cart?.findIndex((c) => c._id === p._id);
      console.log(p, found);
      if (found !== -1) {
        toast.error(`${p.name} already added`);
        return;
      } else {
        setCart((Cart) => [...Cart, { ...p, quantityTaken: 1 }]);
        toast.success(`${p?.name} added to cart.`);
        localStorage.setItem("cart", JSON.stringify([...Cart, p]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="text-center">
          <h6>
            {Search?.results?.data?.length < 1
              ? "No Result Found"
              : `Found : ${Search?.results?.data?.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {Search?.results?.data?.map((p) => (
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
                    onClick={() => {
                      handleAddCart(p);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
