/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { uniq } from "lodash";

import useApi from "../../utils/useApi";
import ProductsContext from "../../contexts/ProductsContext";

const ProductsController = ({ children }) => {
  const [productsState, setProductsState] = useState({
    products: [],
    totalProducts: [],
    total: 0,
    maxPrice: 0,
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productFilters, setProductFilters] = useState([]);
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    limit: 15,
    offset: 0,
  });

  const api = useApi();
  const router = useRouter();

  const fetchProducts = async () => {
    if (Object.keys(router.query).length) {
      try {
        setLoading(true);

        const { page, orderBy, range, category, variant } = router.query;

        const currentOffset =
          Number(page) > 1 ? (Number(page) - 1) * paginationState.limit : 0;

        const { data } = await api.get("/products", {
          params: {
            limit: paginationState.limit,
            offset: currentOffset,
            orderBy: orderBy || "price-desc",
            range,
            category,
            variant,
          },
        });

        const maxPriceAvailable = Math.max(
          ...data.totalProducts.map((item) => item.price.raw)
        );

        setCategories(data.categories);

        const filterTypes = getProductFiltersTypes(data.totalProducts);

        setProductFilters(filterTypes);

        setProductsState({
          products: data.products,
          totalProducts: data.totalProducts,
          total: data.total,
          maxPrice:
            maxPriceAvailable > 0
              ? Math.ceil(maxPriceAvailable / 100) * 100
              : 0,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getProductFiltersTypes = (products) => {
    let variantNames = [];

    for (const item of products) {
      const { variant_groups } = item;

      const names = variant_groups.map((item) => item.name);

      variantNames = [...variantNames, ...names];
    }

    return uniq(variantNames);
  };

  useEffect(() => {
    fetchProducts();
  }, [router.query]);

  const updateProducts = (updatedState) => {
    setProductsState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  const updateCategories = (updatedState) => {
    setCategories((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  const onRangeSelect = ({ min, max }) => {
    router.push({
      pathname: "/products",
      query: {
        ...router.query,
        range: `${min}-${max}`,
      },
    });
  };

  const onFilterSelect = ({ filterName, filterValue }) => {
    let updatedQueryString = "";

    if (router.query[filterName]) {
      const queryParamsList = router.query[filterName].split(",");

      if (queryParamsList.includes(filterValue)) {
        updatedQueryString = queryParamsList
          .filter((item) => item !== filterValue)
          .join(",");
      } else {
        updatedQueryString = `${router.query[filterName]},${filterValue}`;
      }
    } else {
      updatedQueryString = filterValue;
    }

    router.push(
      {
        pathname: "/products",
        query: {
          ...router.query,
          [filterName]: updatedQueryString,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        loading,
        setLoading,
        categories,
        onRangeSelect,
        onFilterSelect,
        productFilters,
        updateProducts,
        paginationState,
        updateCategories,
        setPaginationState,
        products: productsState.products,
        maxPrice: productsState.maxPrice,
        totalProducts: productsState.total,
        totalProductsList: productsState.totalProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsController.defaultProps = {
  children: null,
};

ProductsController.propTypes = {
  children: PropTypes.node,
};

export default ProductsController;
