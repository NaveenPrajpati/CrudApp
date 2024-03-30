import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContex } from "../App";

export default function Navbar() {
  const [showFilter, setShowFilter] = useState(true);
  const [showSort, setShowSort] = useState(true);
  const filterRef = useRef();
  const {
    addNew,
    setAddNew,
    searchQuery,
    setSearchQuery,
    sortValue,
    setSortValue,
  } = useContext(MyContex);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" bg-teal-400 flex justify-between p-2">
      <h1 className="text-3xl font-bold text-center">CURD Dashboard</h1>

      <div className="flex gap-4 items-center mr-6">
        <input
          type="text"
          name=""
          id=""
          className=" rounded-full p-1"
          placeholder="Search Category"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setAddNew(true)}
          className=" text-white font-bold text-xl"
        >
          Add
        </button>
        <div className=" relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className=" font-bold"
          >
            filter
          </button>
          <div
            hidden={showFilter}
            ref={filterRef}
            className=" absolute right-0 top-6 space-y-2 bg-slate-700 text-white p-2"
          >
            <button
              onClick={() => setSearchQuery("")}
              className=" bg-slate-600 w-full"
            >
              All
            </button>
            <button
              onClick={() => setSearchQuery("completed")}
              className="bg-slate-600 w-full "
            >
              Completed
            </button>
            <button
              onClick={() => setSearchQuery("notCompleted")}
              className=" bg-slate-600 w-full"
            >
              Not Completed
            </button>
          </div>
        </div>
        <div className=" relative">
          <button onClick={() => setShowSort(!showSort)} className=" font-bold">
            Sort
          </button>
          <div
            hidden={showSort}
            className=" absolute right-0 top-6 space-y-2 bg-slate-700 text-white p-2"
          >
            <button
              className=" bg-slate-600 w-full"
              onClick={() => setSortValue("priority")}
            >
              Priority
            </button>
            <button
              className=" bg-slate-600 w-full"
              onClick={() => setSortValue("name")}
            >
              Name
            </button>
            <button
              className=" bg-slate-600 w-full text-nowrap"
              onClick={() => setSortValue("")}
            >
              No short
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
