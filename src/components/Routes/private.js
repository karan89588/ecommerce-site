import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner";
export default function PrivateRoute() {
  const [ok, setok] = useState(false);
  const [Auth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      console.log(Auth?.token);
      const res = await axios.get(
        "http://localhost:9000/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (Auth?.token) authCheck();
  }, [Auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
}
