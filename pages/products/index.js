import { useState } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { Dropdown, Pagination } from "../../styles/UIKit";
import ProductFilter from "../../components/ProductFilter";

const Products = (props) => {
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    pageLimit: 15,
    offset: 0,
  });

  const onNextClick = () => {
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
      offset: prevState.offset + prevState.pageLimit,
    }));
  };

  const onPreviousClick = () => {
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage - 1,
      offset: prevState.offset - prevState.pageLimit,
    }));
  };

  const onPageClick = ({ clickedPage }) => {
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: clickedPage,
      offset: (prevState.currentPage - 1) * prevState.pageLimit,
    }));
  };

  return (
    <div>
      <Header />
      <ContentContainer>
        <ProductFilter />
        <ListingContent>
          <ResultsHeader>
            <ResultsNumber>Showing 1-12 of 1500 results</ResultsNumber>
            <MiniFilters>
              <Dropdown
                options={["Price: High to low", "Price: Low to high", "Newest"]}
                onOptionSelect={console.log}
              />
            </MiniFilters>
          </ResultsHeader>
          <Grid>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
              <ProductCard key={item} />
            ))}
          </Grid>
          <Pagination
            totalPages={4}
            currentPage={paginationState.currentPage}
            siblingRange={1}
            onPageClick={onPageClick}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
          />
        </ListingContent>
      </ContentContainer>
    </div>
  );
};

export default Products;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin: 6rem 3rem 3rem;
`;

const ListingContent = styled.div``;

const ResultsHeader = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
  margin-top: 3rem;
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
