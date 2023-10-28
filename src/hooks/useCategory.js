import React, { useState, useEffect } from "react";
import axios from "axios";
export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/category/get-categories/`
      );
      console.log(data);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
