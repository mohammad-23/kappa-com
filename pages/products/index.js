import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import mediaQuerySize from "../../utils/mediaQuerySize";
import ProductFilter from "../../components/ProductFilter";
import ProductsContext from "../../contexts/ProductsContext";
import { Dropdown, Pagination, Grid, Spinner } from "../../styles/UIKit";

const sortOptions = [
  {
    value: { price: "desc" },
    key: "price-desc",
    name: "Price: High to low",
  },
  {
    value: { price: "asc" },
    key: "price-asc",
    name: "Price: Low to high",
  },
  {
    value: { createDate: "desc" },
    key: "createDate-desc",
    name: "Newest",
  },
];

const getInitialSortValue = ({ initial, options }) => {
  const initialOption = options.find((item) => item.key === initial);

  return initialOption;
};

const Products = () => {
  const router = useRouter();
  const {
    loading,
    products,
    totalProducts,
    paginationState,
    setPaginationState,
  } = useContext(ProductsContext);

  const routeToPage = ({ pageNumber, offset }) => {
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
      offset: offset,
    }));

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pageNumber,
      },
    });
  };

  const onNextClick = () => {
    const updatedPageNumber = paginationState.currentPage + 1;
    const updatedOffset = paginationState.offset + paginationState.limit;

    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
      offset: updatedOffset,
    }));

    routeToPage({
      pageNumber: updatedPageNumber,
      offset: updatedOffset,
    });
  };

  const onPreviousClick = () => {
    const updatedPageNumber = paginationState.currentPage - 1;
    const updatedOffset = paginationState.offset - paginationState.limit;

    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
      offset: updatedOffset,
    }));

    routeToPage({
      pageNumber: updatedPageNumber,
      offset: updatedOffset,
    });
  };

  const onPageClick = ({ clickedPage }) => {
    const updatedPageNumber = clickedPage;
    const updatedOffset =
      (paginationState.currentPage - 1) * paginationState.limit;

    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
      offset: updatedOffset,
    }));

    routeToPage({
      pageNumber: updatedPageNumber,
      offset: updatedOffset,
    });
  };

  const onListSort = ({ key }) => {
    router.push({
      pathname: "/products",
      query: {
        ...router.query,
        orderBy: key,
      },
    });
  };

  const displayPaginationInfo = () => {
    const { currentPage, limit } = paginationState;

    const firstProductIndex = (currentPage - 1) * limit || 1;
    const lastProductIndex =
      totalProducts < currentPage * limit ? totalProducts : currentPage * limit;

    return `Showing ${firstProductIndex}-${lastProductIndex} of ${totalProducts} results`;
  };

  const renderLoader = () => (
    <LoadingContainer>
      <div>
        <SpinContainer>
          <Spinner size="xl" />
        </SpinContainer>
        <h3>Loading Products</h3>
      </div>
    </LoadingContainer>
  );

  return (
    <Container>
      <Header />
      {loading ? (
        renderLoader()
      ) : (
        <ContentContainer>
          <ProductFilter />
          <div>
            <ResultsHeader>
              <ResultsNumber>{displayPaginationInfo()}</ResultsNumber>
              <MiniFilters>
                <Dropdown
                  initialValue={getInitialSortValue({
                    initial: router.query.orderBy,
                    options: sortOptions,
                  })}
                  options={sortOptions}
                  onOptionSelect={onListSort}
                />
              </MiniFilters>
            </ResultsHeader>
            {(() => {
              if (products.length) {
                return (
                  <Grid>
                    {products.map((product) => (
                      <ProductCard key={product.name} {...product} />
                    ))}
                  </Grid>
                );
              }

              return <Grid />;
            })()}
            <Pagination
              totalPages={Math.ceil(totalProducts / paginationState.limit)}
              currentPage={paginationState.currentPage}
              siblingRange={1}
              onPageClick={onPageClick}
              onNextClick={onNextClick}
              onPreviousClick={onPreviousClick}
            />
          </div>
        </ContentContainer>
      )}
    </Container>
  );
};

export default Products;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  gap: 1.5em;
  margin: 6rem 4rem 3rem;

  @media ${mediaQuerySize.xl} {
    grid-template-columns: 20% 80%;
  }

  @media ${mediaQuerySize.md} {
    grid-template-columns: 25% 75%;
  }
`;

const ResultsHeader = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
`;

const ResultsNumber = styled.div`
  font-size: 14px;
  margin: auto 0;
  color: ${(props) => props.theme.textSecondary};
`;

const MiniFilters = styled.div`
  width: fit-content;
  min-width: 200px;
  margin: auto 0px auto auto;
`;

const LoadingContainer = styled.div`
  height: calc(100% - 4em);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinContainer = styled.div`
  width: fit-content;
  margin: auto;
`;
