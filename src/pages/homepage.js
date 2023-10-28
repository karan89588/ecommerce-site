import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../components/Layout/layout";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Price } from "./user/price";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

export default function Homepage() {
  const [Auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [all, setAll] = useState([]);
  const [priceC, setPrice] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [Cart, setCart] = useCart();

  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data.success) {
        setProducts(data.list);
      } else {
        toast.error("Error in Fetching");
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      toast.error(`${error}`);
    }
  };
  const loadmore = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.list]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    else loadmore();
  }, [page]);

  const applyFilter = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/v1/product/filter/",
        { all, priceC }
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (all.length || priceC.length) applyFilter();
  }, [all.length, priceC.length]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/category/get-categories/"
      );
      //console.log(data.categories);
      if (data.success) {
        setCategories(data.categories);
        console.log(categories);
      }
    } catch (error) {
      console.log(error);
      //toast.error("errror");
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/product/product-count/"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    getCategories();
    getTotal();
    //eslint-disable-next-line
  }, []);

  const handleFilter = async (value, id) => {
    let arr = [...all];
    console.log(value);
    if (value) {
      arr.push(id);
    } else {
      console.log("yes");
      arr = arr.filter((c) => c !== id);
    }
    console.log(arr);
    setAll(arr);
  };
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
    <>
      <Layout>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-3 d-flex flex-column">
              <div className="d-flex flex-column">
                <h4 className="text-center">Filters By Category</h4>

                {categories.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <div className="d-flex flex-column">
                <h4 className="text-center">Filters By Price</h4>

                <Radio.Group onChange={(e) => setPrice(e.target.value)}>
                  <div className="d-flex flex-column">
                    {Price.map((p) => (
                      <Radio key={p._id} value={p.arr}>
                        {p.name}
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            <div className="col-9">
              <h4 className="text-center">All Products</h4>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
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
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p?.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secandary"
                        onClick={() => handleAddCart(p)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
