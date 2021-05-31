import Carousel from "react-multi-carousel";
import styled from "styled-components";

import { Button } from "../../../styles/UIKit";
import { homeConfig } from "../../../config";

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

const Hero = () => (
  <CarouselContainer>
    <StyledCarousel
      responsive={responsive}
      autoPlay={true}
      infinite={true}
      showDots={true}
    >
      {homeConfig.heroData.map((HeroItem) => (
        <CarouselItem key={HeroItem.id}>
          <HeroTitle>{HeroItem.title}</HeroTitle>
          <HeroDescription>{HeroItem.description}</HeroDescription>
          <Button inverted>{HeroItem.buttonText}</Button>
        </CarouselItem>
      ))}
    </StyledCarousel>
  </CarouselContainer>
);

export default Hero;

const CarouselContainer = styled.div`
  width: 100%;
`;

const StyledCarousel = styled(Carousel)`
  padding: 0 0 2em 0;

  .react-multiple-carousel__arrow--right {
    right: 10px;
  }

  .react-multiple-carousel__arrow--left {
    left: 10px;
  }

  .react-multi-carousel-dot-list {
    margin-bottom: 1em;
  }

  .react-multiple-carousel__arrow--right::before {
    content: ">";
  }

  .react-multiple-carousel__arrow--left::before {
    content: "<";
  }
`;

const CarouselItem = styled.div`
  background-color: ${(props) => props.theme.textPrimary};
  color: ${(props) => props.theme.white};
  text-align: center;
  height: 100%;
  padding: 4em 0;
`;

const HeroTitle = styled.h1`
  margin: 0;
  text-align: center;
`;

const HeroDescription = styled.p`
  font-size: 1.8rem;
  text-align: center;
`;
