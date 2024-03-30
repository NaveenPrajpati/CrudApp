import axios from "axios";
import { getApi, removeApi } from "./endPoints";

export const deleteTask = async (id, fetchTasks) => {
  axios
    .delete(removeApi(id))
    .then((res) => {
      fetchTasks();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchTasks = async (setData) => {
  axios
    .get(getApi)
    .then((res) => {
      setData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
