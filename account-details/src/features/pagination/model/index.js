export const getItemsForPage = (items, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export const calculateTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};

export const DEFAULT_PAGE_SIZE = 15; 