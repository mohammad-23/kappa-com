import React from "react";

const ProductsContext = React.createContext({
  maxPrice: 0,
  products: [],
  categories: [],
  loading: false,
  totalProducts: [],
  productFilters: [],
  paginationState: {},
  setLoading: () => {},
  totalProductsList: [],
  onRangeSelect: () => {},
  onFilterSelect: () => {},
  updateProducts: () => {},
  updateCategories: () => {},
  setPaginationState: () => {},
});

export default ProductsContext;
