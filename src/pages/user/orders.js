import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import { useAuth } from "../../context/auth";
import Usermenu from "../../components/Layout/usermenu";
import axios from "axios";
import moment from "moment";
export default function Orders() {
  const [Auth] = useAuth();
  const [orders, setOrders] = useState();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/auth/orders"
      );
      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Auth?.token) getOrders();
  }, [Auth?.token]);
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 mt-5 p-2">
              <Usermenu />
            </div>
            <div className="col-9 mt-5 p-2">
              <div className="text-center mx-5 mt-5">Orders</div>
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
                          <td>{o?.status}</td>
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
