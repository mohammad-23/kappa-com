import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";

import { Divider, ItemCard } from "../../styles/UIKit";
import { FAVOURITES_TITLE } from "../../utils/constants";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

let nextOne, previousOne;

const ButtonGroup = ({ next, previous, ..._ }) => {
  nextOne = next;
  previousOne = previous;
  return <div></div>;
};

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
};
const GotoNext = () => {
  nextOne();
};
const GotoPrevious = () => {
  previousOne();
};
const Favourites = () => (
  <FavoritesContainer>
    <FavouritesTitleContainer>
      <FavouritesTitle>{FAVOURITES_TITLE}</FavouritesTitle>
      <FavouriteArrowContainer>
        <FavouriteArrow onClick={GotoPrevious}> &lt; </FavouriteArrow>
        <FavouriteArrow onClick={GotoNext}> &gt;</FavouriteArrow>
      </FavouriteArrowContainer>
    </FavouritesTitleContainer>

    <Divider></Divider>
    <CarouselContainer>
      <Carousel
        arrows={false}
        responsive={responsive}
        customButtonGroup={<ButtonGroup />}
        renderButtonGroupOutside={true}
      >
        <ItemCard
          itemName={"Greta White Midi Dress"}
          itemPrice={"159.00"}
        ></ItemCard>
        <ItemCard
          itemName={"Lilika Silver Mini"}
          itemPrice={"99.00"}
        ></ItemCard>
        <ItemCard
          itemName={"Crystal Off White Dress"}
          itemPrice={"250.00"}
        ></ItemCard>
        <ItemCard itemName={"Carson Shoulder"} itemPrice={"175.00"}></ItemCard>
        <ItemCard itemName={"Dylan Polo Shirt"} itemPrice={"250.00"}></ItemCard>
        <ItemCard
          itemName={"Greta White Midi Dress"}
          itemPrice={"159.00"}
        ></ItemCard>
        <ItemCard
          itemName={"Lilika Silver Mini"}
          itemPrice={"99.00"}
        ></ItemCard>
        <ItemCard
          itemName={"Crystal Off White Dress"}
          itemPrice={"250.00"}
        ></ItemCard>
        <ItemCard
          itemName={"Alexander Immanuel"}
          itemPrice={"175.00"}
        ></ItemCard>
        <ItemCard itemName={"Dylan Polo Shirt"} itemPrice={"250.00"}></ItemCard>
      </Carousel>
    </CarouselContainer>
  </FavoritesContainer>
);

export default Favourites;

const FavouritesTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const FavouriteArrow = styled.button`
  width: 1.75rem;
  height: 1.875rem;
  background: none;
  margin: 0.25rem;
  border: 1px solid #ebebeb;
`;
const CarouselContainer = styled.div`
  margin-left: 2rem;
`;

const FavouriteArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;
const FavouritesTitle = styled.h1`
  margin-left: 1.5rem;
  padding: 0;
  align-items: flex-start;
`;
const FavoritesContainer = styled.div`
  height: 40rem;
  width: 100%;
`;
