import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import Layout from "../components/Layout/layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function CartPage() {
  const Navigate = useNavigate();
  const [token, settoken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");
  const [Cart, setCart] = useCart();
  const [Auth] = useAuth();
  const removeItem = (pid) => {
    let myCart = [...Cart];
    let index = myCart.findIndex((c) => c._id === pid);
    myCart.splice(index, 1);
    setCart((Cart) => myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };
  const totalBill = () => {
    let total = 0;
    console.log(Cart);
    Cart?.map((p) => (total += p?.price * p?.quantityTaken));
    return total;
  };
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/product/braintree/token"
      );
      settoken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
    //eslint-disable-next-line
  }, []);
  const updateQuantity = async (c) => {
    try {
      const { data } = await axios.put(
        `http://localhost:9000/api/v1/product/update-quantity/${c._id}`,
        { newQuantity: c.quantity - c.quantityTaken }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = axios.post(
        "http://localhost:9000/api/v1/product/braintree/payment",
        {
          nonce,
          Cart,
        }
      );
      setLoading(false);
      await Cart?.map((c) => updateQuantity(c));
      //console.log("check here ", data);
      localStorage.removeItem("cart");
      setCart([]);
      Navigate("/dashboard/user/orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
    }
  };
  const handleIncre = (p) => {
    const myCart = [...Cart];
    const index = myCart?.findIndex((c) => c._id === p._id);
    if (myCart[index].quantity > myCart[index].quantityTaken) {
      myCart[index].quantityTaken += 1;
      setCart(myCart);
    }
  };
  const handleDecre = (p) => {
    const myCart = [...Cart];
    const index = myCart?.findIndex((c) => c._id === p._id);
    if (myCart[index].quantityTaken > 1) {
      myCart[index].quantityTaken -= 1;
      setCart(myCart);
    }
  };
  return (
    <Layout>
      <h3 className="text-center">Cart Details</h3>

      {Auth?.user?.name ? (
        Cart?.length > 0 ? (
          <div className="container">
            <div className="row">
              <div className="col-8">
                {Cart?.map((p) => (
                  <div key={p?._id} className="card d-flex flex-row">
                    <div className="col-4 m-4">
                      <img
                        className="card-img-top img-responsive"
                        src={`http://localhost:9000/api/v1/product/get-photo/${p?._id}`}
                        alt={`${p?.name}`}
                        height="100px"
                        width="50px"
                      />
                    </div>
                    <div className="col-8 m-4">
                      <h6>Name : {p?.name}</h6>
                      <h6>Quantity present : {p?.quantity} kg</h6>
                      <h6>Price : ${p?.price}</h6>
                      <div className="d-flex flex-row">
                        <div className="increDecreFunction">
                          <button
                            className="btn btn-primary decre"
                            onClick={() => handleDecre(p)}
                          >
                            -
                          </button>
                          <p className="quantityTaken">{p?.quantityTaken}</p>
                          <button
                            className="btn btn-primary incre"
                            onClick={() => handleIncre(p)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-danger mx-3"
                          onClick={() => removeItem(p?._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-4">
                <h4 className="text-center">Cart Billing</h4>
                <h5 className="text-center">Total | Checkout | Payment</h5>
                <hr />
                <h5 className="text-center">Bill : ${totalBill()}</h5>
                {!token || !Cart?.length ? (
                  ""
                ) : (
                  <>
                    <div>
                      <DropIn
                        options={{
                          authorization: token,
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Buy
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h5 className="text-center">No Record Found</h5>
        )
      ) : (
        <div className="text-center">Your are Not Log in</div>
      )}
    </Layout>
  );
}
