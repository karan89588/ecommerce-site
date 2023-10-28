import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [Search, setSearch] = useState({
    keyword: "",
    results: [],
  });
  return (
    <SearchContext.Provider value={[Search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
