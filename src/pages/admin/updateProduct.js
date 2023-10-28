import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";
import Adminmenu from "../../components/Layout/adminmenu";
import { Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
export default function UpdateProduct() {
  const navigate = useNavigate();
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [id, setId] = useState();
  const params = useParams();
  const getProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:9000/api/v1/product/get-product/${params.slug}`
    );
    setName(data?.product.name);
    setCategory(data.product.category._id);
    setDescription(data.product.description);
    //setPhoto(data.product.photo);
    setQuantity(data.product.quantity);
    setPrice(data.product.price);
    setId(data.product._id);
  };
  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, []);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/category/get-categories/"
      );
      //console.log(data.categories);
      if (data.success) {
        setCategories(data.categories);
        //console.log(categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("errror");
    }
  };
  useEffect(() => {
    getCategories();
    //eslint-disable-next-line
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", name);
      photo && form.append("photo", photo);
      form.append("price", price);
      form.append("category", category);
      form.append("description", description);
      form.append("quantity", quantity);
      const { data } = await axios.put(
        `http://localhost:9000/api/v1/product/update-product/${id}`,
        form
      );
      if (data.success) {
        toast.success(`${data.msg}`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`${data.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt(`Are you sure to delete ?If yes type yes.`);
      //console.log(answer, typeof answer);
      if (answer === "yes") {
        //console.log("yes1");
        const { data } = await axios.delete(
          `http://localhost:9000/api/v1/product/delete-product/${id}`
        );
        //console.log("yes2");
        if (data.success) {
          toast.success(data.msg);
          navigate("/dashboard/admin/products/");
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 mt-5 p-2">
              <Adminmenu />
            </div>
            <div className="col-9 mt-5 p-2">
              <div className="text-justify mx-5 mt-5">Create Products</div>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select Category"
                  size="large"
                  showSearch
                  className="form-control mb-3"
                  onChange={(value) => setCategory(value)}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c?._id} value={c?._id}>
                      {c?.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3 w-75">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3 w-75">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Photo"
                      height={300}
                      width={400}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:9000/api/v1/product/get-photo/${id}`}
                      alt="Photo"
                      height={300}
                      width={400}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 w-75">
                <input
                  type="text"
                  placeholder="Write Product Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3 w-75">
                <input
                  type="number"
                  placeholder="Write Product Price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3 w-75">
                <input
                  type="text"
                  placeholder="Write Product Description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3 w-75">
                <input
                  type="text"
                  placeholder="Write Product Quantity"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
