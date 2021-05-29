import React, { useState, useContext } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import AuthContext from "../contexts/AuthContext";
import { TextField, Grid, Pagination } from "../styles/UIKit";

const Wishlist = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 2,
  });

  const { user, addProductToCart } = useContext(AuthContext);

  const onNextClick = () => {
    const updatedPageNumber = pagination.currentPage + 1;

    setPagination((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
    }));
  };

  const onPreviousClick = () => {
    const updatedPageNumber = pagination.currentPage - 1;

    setPagination((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
    }));
  };

  const onPageClick = ({ clickedPage }) => {
    const updatedPageNumber = clickedPage;

    setPagination((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
    }));
  };

  return (
    <React.Fragment>
      <Header />
      <ContentContainer>
        <Breadcrumbs>
          <TextField size="1em" color="textSecondary" weight={600}>
            USER
          </TextField>
          /
          <TextField size="1em" color="textPrimary" weight={600}>
            WISHLIST
          </TextField>
          <TextField size="0.95em" color="textSecondary">
            &nbsp;({user.wishlist.length} results)
          </TextField>
        </Breadcrumbs>
        <Grid lg={4} xl={5} md={3} sm={1}>
          {user.wishlist
            .slice(
              (pagination.currentPage - 1) * pagination.limit,
              pagination.currentPage * pagination.limit
            )
            .map((product) => (
              <ProductCard
                key={product.permalink}
                hoverable
                {...product}
                addToCart={() => {
                  addProductToCart(product, 1);
                }}
              />
            ))}
        </Grid>
      </ContentContainer>
      <Pagination
        totalPages={Math.ceil(user.wishlist.length / 2)}
        currentPage={pagination.currentPage}
        siblingRange={1}
        onPageClick={onPageClick}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Wishlist;

const ContentContainer = styled.div`
  padding: 2em;
  min-height: 90%;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  & > * {
    font-family: "PT Sans Caption";
  }
`;
