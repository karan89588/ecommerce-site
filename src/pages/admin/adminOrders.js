import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import Adminmenu from "../../components/Layout/adminmenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import toast from "react-hot-toast";
export default function AdminOrders() {
  const { Option } = Select;
  const [status] = useState([
    "Not Processing",
    "Processing",
    "Shipping",
    "Deleivered",
    "Cancelled",
  ]);
  const [Auth] = useAuth();
  const [orders, setOrders] = useState();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/auth/admin-orders"
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Auth?.token) getOrders();
  }, [Auth?.token]);
  const handleStatus = async (oid, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:9000/api/v1/auth/status-change/${oid}`,
        { status: value }
      );
      if (data?.success) {
        toast.success(data?.msg);
        getOrders();
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
              <div className="text-justify mx-5 mt-5">All Orders</div>
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => {
                                handleStatus(o?._id, value);
                              }}
                              defaultValue={o?.status}
                            >
                              {status?.map((s, i) => (
                                <Option value={s} key={i}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
