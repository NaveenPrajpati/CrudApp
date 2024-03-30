import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InputTag from "./components/InputTag";
import { addApi, getApi, removeApi, updateApi } from "./services/endPoints";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import { MyContex } from "./App";
import { deleteTask, fetchTasks } from "./services/operations";
import { filterData, sortData } from "./utils/uitilyFunctions";

export default function Dashboard() {
  const [isEdit, setIsEdit] = useState("");
  const {
    addNew,
    setAddNew,
    searchQuery,
    setSearchQuery,
    sortValue,
    setSortValue,
  } = useContext(MyContex);
  const [data, setData] = useState([]);

  const getFilteredAndSortedTasks = () => {
    let tasksToDisplay = [...data];
    tasksToDisplay = filterData(tasksToDisplay, searchQuery);
    tasksToDisplay = sortData(tasksToDisplay, sortValue);
    return tasksToDisplay;
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
    // completed: null,
  });

  function handleSubmit() {
    axios
      .post(addApi, formData)
      .then((res) => {
        console.log(res.data);
        fetchTasks(setData);
        setFormData({});
        setAddNew(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdate() {
    axios
      .put(updateApi(formData._id), formData)
      .then((res) => {
        setIsEdit("");
        setFormData({});
        fetchTasks(setData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInputChange(e) {
    if (e.target.name == "completed") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  }
  function getdata() {
    fetchTasks(setData);
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className=" w-full h-screen bg-white">
      <div className=" w-4/5 h-full  mx-auto">
        <Navbar />
        <div className=" flex flex-row flex-wrap gap-2 p-2">
          {addNew && (
            <div className=" p-4 w-[300px] h-[400px] border-4 border-purple-700 rounded-xl flex flex-col justify-between">
              <fieldset>
                <div className="flex justify-between items-center">
                  <legend className="text-lg font-medium">
                    Add Information
                  </legend>
                  <button
                    onClick={() => {
                      setAddNew(false);
                      setFormData({});
                    }}
                    className=" text-2xl font-bold text-red-500"
                  >
                    x
                  </button>
                </div>
                <InputTag
                  label="Title"
                  id="title"
                  value={formData.title}
                  name="title"
                  onChange={handleInputChange}
                />

                <InputTag
                  label="Description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                />

                <InputTag
                  label="Category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  name="category"
                />

                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-1">
                    priority
                  </label>
                  <select
                    name="priority"
                    id=""
                    value={formData.priority}
                    onChange={handleInputChange}
                    className={`p-2 rounded-full border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-black font-semibold`}
                  >
                    <option value=""></option>
                    <option value="2">High</option>
                    <option value="1">Medium</option>
                    <option value="0">Low</option>
                  </select>
                </div>
              </fieldset>
              <div className="flex flex-row justify-between items-center">
                <Button
                  text={"Add"}
                  bgColor={"bg-green-500"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          )}
          {getFilteredAndSortedTasks()?.map((item, index) => (
            <div
              className={`p-2 w-[300px] h-[400px] border-4 ${
                item.completed
                  ? "border-green-500 bg-green-300"
                  : isEdit == item._id
                  ? "border-blue-700 bg-blue-300"
                  : "border-gray-700 bg-gray-300"
              } rounded-xl flex flex-col justify-between`}
            >
              <fieldset className="flex flex-col gap-2">
                <InputTag
                  label="Title"
                  id="title"
                  name="title"
                  onChange={handleInputChange}
                  value={isEdit == item._id ? formData.title : item.title}
                  readOnly={isEdit != item._id}
                />

                <InputTag
                  label="Description"
                  id="description"
                  value={
                    isEdit == item._id ? formData.description : item.description
                  }
                  readOnly={isEdit != item._id}
                  onChange={handleInputChange}
                  name="description"
                />

                <InputTag
                  label="Category"
                  id="category"
                  value={isEdit == item._id ? formData.category : item.category}
                  readOnly={isEdit != item._id}
                  onChange={handleInputChange}
                  name="category"
                />

                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    id=""
                    disabled={isEdit != item._id}
                    value={
                      isEdit == item._id ? formData.priority : item.priority
                    }
                    onChange={handleInputChange}
                    className="p-2 rounded-full border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300 disabled:text-black disabled:font-semibold"
                  >
                    <option value="2">High</option>
                    <option value="1">Medium</option>
                    <option value="0">Low</option>
                  </select>
                </div>

                <div className="flex flex-row justify-between mt-2">
                  <label htmlFor="">Completed</label>
                  <input
                    className=" w-5 h-5 rounded-lg"
                    type="checkbox"
                    name="completed"
                    checked={
                      isEdit == item._id ? formData.completed : item.completed
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </fieldset>
              <div className="flex flex-row justify-end gap-2 items-center">
                {isEdit == item._id ? (
                  <>
                    <Button
                      text={"Cancel"}
                      bgColor={"bg-red-500"}
                      onClick={() => {
                        setIsEdit(null);
                        setFormData({});
                      }}
                    />
                    <Button
                      text={"Update"}
                      bgColor={"bg-green-500"}
                      onClick={handleUpdate}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      text={"Edit"}
                      bgColor={"bg-blue-500"}
                      onClick={() => {
                        setFormData(item);
                        setIsEdit(item._id);
                      }}
                    />
                    <Button
                      text={"Delete"}
                      bgColor={"bg-red-500"}
                      onClick={() => deleteTask(item._id, getdata)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
