import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";

import { Divider, TextField } from "../../../styles/UIKit";
import UIBUtton from "../../../styles/UIKit/Button";
import ProductCard from "../../ProductCard";
import { homeConfig } from "../../../config";

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

const Favourites = ({ favData, error }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(favData);
  }, []);

  return (
    <FavoritesContainer>
      <TextField size="1.5em" margin="1em 0 0 2em" weight="bold">
        {homeConfig.FAVOURITES_TITLE}
      </TextField>
      <Divider margin="1em 2em" />
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

Favourites.defaultProps = {
  favData: [],
  error: null,
};

Favourites.propTypes = {
  favData: PropTypes.array,
  error: PropTypes.string,
};

export default Favourites;

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  favLength: PropTypes.number,
};

const CarouselContainer = styled.div`
  padding: 0 2rem;

  .react-multi-carousel-list {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
`;

const CarouselButtonGroup = styled.div`
  transform: translateY(-256px);

  .disable {
    display: none;
  }
`;

const FavoritesContainer = styled.div`
  width: 100%;

  ul.react-multi-carousel-track {
    gap: 0.5em;
    margin: 1em 0;
  }
`;

const UIButtonLeft = styled(UIBUtton)`
  float: left;
`;

const UIButtonRight = styled(UIBUtton)`
  float: right;
`;
