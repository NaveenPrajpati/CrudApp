// const baseurl = "http://localhost:5000/task/";
const baseurl = "https://crudapp-oh9m.onrender.com/task/";
export const addApi = baseurl + "add";
export const getApi = baseurl + "getAll";
export const removeApi = (id) => baseurl + `remove/${id}`;
export const updateApi = (id) => baseurl + `update/${id}`;
