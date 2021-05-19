import Carousel from "react-multi-carousel";
import styled from "styled-components";
import PropTypes from "prop-types";

import UIBUtton from "../../../styles/UIKit/Button";
import { HeroData } from "../../../config/HomeConfig";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
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

const ButtonGroup = ({ next, previous }) => (
  <CarouselButtonGroup>
    <UIButtonLeft inverted onClick={() => previous()}>
      {" "}
      &lt;
    </UIButtonLeft>
    <UIButtonRight inverted onClick={() => next()}>
      {" "}
      &gt;{" "}
    </UIButtonRight>
  </CarouselButtonGroup>
);

const Hero = () => (
  <CarouselContainer>
    <Carousel
      responsive={responsive}
      arrows={false}
      renderButtonGroupOutside={true}
      customButtonGroup={<ButtonGroup />}
      autoPlay={true}
      infinite={true}
      showDots={true}
    >
      {HeroData.map((HeroItem) => (
        <CarouselItem key={HeroItem.id}>
          <HeroTitle>{HeroItem.title}</HeroTitle>
          <HeroDescription>{HeroItem.description}</HeroDescription>
          <UIBUtton inverted>{HeroItem.buttonText}</UIBUtton>
        </CarouselItem>
      ))}
    </Carousel>
  </CarouselContainer>
);

export default Hero;

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
};

const CarouselContainer = styled.div`
  width: 100%;
`;

const CarouselButtonGroup = styled.div`
  .disable {
    display: none;
  }
  transform: translateY(-40vh);
`;

const CarouselItem = styled.div`
  background-color: ${(props) => props.theme.textPrimary};
  color: ${(props) => props.theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 33rem;
`;

const HeroTitle = styled.h1`
  font-size: 4.8rem;
  margin: 0;
  text-align: center;
`;

const HeroDescription = styled.p`
  font-size: 1.8rem;
  text-align: center;
`;

const UIButtonLeft = styled(UIBUtton)`
  float: left;
  color: #ffff;
  background-color: #0000;
  :hover {
    background-color: #555555;
  }
  opacity: 50%;
`;

const UIButtonRight = styled(UIBUtton)`
  float: right;
  color: #ffff;
  :hover {
    background-color: #555555;
  }
  background-color: #0000;
  opacity: 50%;
`;
