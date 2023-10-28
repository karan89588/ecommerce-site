import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchInput() {
  const navigation = useNavigate();
  const [Search, setSearch] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/product/search/${Search.keyword}`
      );
      if (data.success) {
        setSearch({ ...Search, results: data });
        navigation("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="form-inline d-flex flex-row mx-2" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={Search?.keyword}
        onChange={(e) => {
          setSearch({ ...Search, keyword: e.target.value });
        }}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
