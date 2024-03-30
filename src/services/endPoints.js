const baseurl = "http://localhost:5000/task/";
export const addApi = baseurl + "add";
export const getApi = baseurl + "getAll";
export const removeApi = (id) => baseurl + `remove/${id}`;
export const updateApi = (id) => baseurl + `update/${id}`;
