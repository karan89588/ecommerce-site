import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import Adminmenu from "../../components/Layout/adminmenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/categoryForm";
import { Modal } from "antd";
export default function CreateCategory() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([{}]);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/category/get-categories/"
      );
      //console.log(data.categories);
      if (data?.success) {
        setCategories(data?.categories);
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
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    //console.log("called");
    e.preventDefault();
    //console.log("called1");
    try {
      //console.log("called2");
      const { data } = await axios.post(
        "http://localhost:9000/api/v1/category/create-category",
        {
          name: name,
        }
      );
      //console.log(data);
      if (data?.success) {
        //console.log("called4");
        toast.success(`${name} category created.`);
        getCategories();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    //console.log("called");
    e.preventDefault();
    //console.log("called1");
    try {
      //console.log("called2");
      const { data } = await axios.put(
        `http://localhost:9000/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      //console.log(data);
      if (data?.success) {
        //console.log("called4");
        toast.success(`${name} category created.`);
        setSelected(null);
        setVisible(false);
        setUpdatedName("");
        getCategories();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      //console.log("called2");
      const { data } = await axios.delete(
        `http://localhost:9000/api/v1/category/delete-category/${id}`
      );
      //console.log(data);
      if (data?.success) {
        //console.log("called4");
        toast.success(`Category Deleted.`);
        getCategories();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
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
              <div className="text-center mb-5">
                <h4>Manage Category</h4>
                {
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                }
              </div>
              <div>
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => {
                      return (
                        <>
                          <tr>
                            <td key={c?._id}>{c?.name}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-primary"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(c?.name);
                                  setSelected(c);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                class="btn btn-danger ms-2"
                                onClick={() => handleDelete(c?._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  handleSubmit={handleUpdate}
                  value={updatedName}
                  setValue={setUpdatedName}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
