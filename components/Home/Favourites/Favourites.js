import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";

import { Divider } from "../../../styles/UIKit";
import UIBUtton from "../../../styles/UIKit/Button";
import { favouritesData } from "../../../config/HomeConfig";
import useApi from "../../../utils/useApi";
import ProductCard from "../../ProductCard";

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

const ButtonGroup = ({ next, previous, favLength, ...rest }) => {
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
      <UIButtonRight
        inverted
        onClick={() => next()}
        className={currentSlide === favLength / 2 ? "disable" : ""}
      >
        {" "}
        &gt;{" "}
      </UIButtonRight>
    </CarouselButtonGroup>
  );
};

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const api = useApi();

  useEffect(() => {
    api.get("/favourites").then(({ data }) => {
      setFavourites(data);
    });
  }, []);

  return (
    <FavoritesContainer>
      <FavouritesTitle>{favouritesData.title}</FavouritesTitle>
      <Divider margin="0.5em 1.5em" />
      <CarouselContainer>
        <Carousel
          responsive={responsive}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup favLength={favourites.length} />}
        >
          {favourites.map((favouriteItem) => (
            <ProductCard key={favouriteItem._id} {...favouriteItem} />
          ))}
        </Carousel>
      </CarouselContainer>
    </FavoritesContainer>
  );
};

export default Favourites;

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  favLength: PropTypes.number,
};

const CarouselContainer = styled.div`
  margin-left: 2rem;
  .react-multi-carousel-list {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    height: 32rem;
  }
`;

const CarouselButtonGroup = styled.div`
  transform: translateY(-256px);

  .disable {
    display: none;
  }
`;

const FavouritesTitle = styled.h1`
  padding: 0.5em 1.5em 0;
  margin: 0;
  align-items: flex-start;
`;

const FavoritesContainer = styled.div`
  width: 100%;
  padding: 0 2em;
`;

const UIButtonLeft = styled(UIBUtton)`
  float: left;
`;

const UIButtonRight = styled(UIBUtton)`
  float: right;
`;
