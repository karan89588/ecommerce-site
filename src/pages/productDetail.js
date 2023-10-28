import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
export default function ProductDetail() {
  const [Cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const getProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:9000/api/v1/product/get-product/${params?.slug}`
    );
    setProduct(data?.product);
  };
  useEffect(() => {
    getProduct();
  }, []);
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (product?._id && product?.category?._id)
      getSimilarProduct(product?._id, product?.category?._id);
  }, [product?._id, product?.category?._id]);
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <img
              className="card-img-top img-responsive"
              src={`http://localhost:9000/api/v1/product/get-photo/${product?._id}`}
              alt={product?.name}
              height={200}
              width={100}
            />
          </div>
          <div className="col-2"></div>
          <div className="col-6">
            <h5 className="text-center">Details:</h5>
            <h6>Name: {product?.name}</h6>
            <h6>Description: {product?.description}</h6>
            <h6>Quantity: {product?.quantity}</h6>
            <h6>Price: {product?.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
          </div>
        </div>

        <div className="row my-5">
          <h5 className="text-center">Related Products</h5>
          <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
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
                      handleAddCart();
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
