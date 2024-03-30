export const filterData = (tasksToFilter, searchQuery) => {
  return tasksToFilter.filter((task) => {
    if (searchQuery === "completed") {
      return task?.completed === true;
    } else if (searchQuery === "notCompleted") {
      return task?.completed === false;
    } else {
      return task?.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
};

export const sortData = (tasksToSort, sortValue) => {
  return tasksToSort.sort((a, b) => {
    if (sortValue === "name") {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    } else if (sortValue === "priority") {
      return a.priority - b.priority;
    } else if (sortValue === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });
};
