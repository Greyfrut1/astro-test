const useTotalPages = (items, itemsPerPage) => {
  return Math.ceil(parseInt(items) / itemsPerPage);
};

export default useTotalPages;
