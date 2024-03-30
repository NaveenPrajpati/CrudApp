import React, { createContext, useState } from "react";
import Dashboard from "./Dashboard";
export const MyContex = createContext();

export default function App() {
  const [addNew, setAddNew] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const values = {
    addNew,
    setAddNew,
    sortValue,
    setSortValue,
    searchQuery,
    setSearchQuery,
  };
  return (
    <MyContex.Provider value={values}>
      <Dashboard />
    </MyContex.Provider>
  );
}
