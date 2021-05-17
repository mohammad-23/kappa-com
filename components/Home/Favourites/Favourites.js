import styled from "styled-components";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Divider, ItemCard } from "../../../styles/UIKit";
import UIBUtton from "../../../styles/UIKit/Button";
import { FavouritesData } from "../../../config/HomeConfig";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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

const ButtonGroup = ({ next, previous, _, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <CarouselButtonGroup>
      <UIButtonLeft
        inverted
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
      >
        {" "}
        &lt;
      </UIButtonLeft>
      <UIButtonRight inverted onClick={() => next()}>
        {" "}
        &gt;{" "}
      </UIButtonRight>
    </CarouselButtonGroup>
  );
};

const Favourites = () => (
  <FavoritesContainer>
    <FavouritesTitleContainer>
      <FavouritesTitle>{FavouritesData.title}</FavouritesTitle>
    </FavouritesTitleContainer>
    <Divider />
    <CarouselContainer>
      <Carousel
        responsive={responsive}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {FavouritesData.items.map((favouriteItem) => (
          <ItemCard
            key={favouriteItem.id}
            itemName={favouriteItem.name}
            itemPrice={favouriteItem.price}
          />
        ))}
      </Carousel>
    </CarouselContainer>
  </FavoritesContainer>
);

export default Favourites;

ButtonGroup.PropTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
};

const FavouritesTitleContainer = styled.div`
  display: flex;
`;

const CarouselContainer = styled.div`
  margin-left: 2rem;
`;
const CarouselButtonGroup = styled.div`
  transform: translateY(-256px);
  .disable {
    display: none;
  }
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

const UIButtonLeft = styled(UIBUtton)`
  float: left;
`;

const UIButtonRight = styled(UIBUtton)`
  float: right;
`;
