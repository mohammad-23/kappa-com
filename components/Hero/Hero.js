import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

import UIBUtton from "../../styles/UIKit/Button";
import {
  CAROUSEL1_BUTTON_TEXT,
  CAROUSEL1_TITLE,
  CAROUSEL2_BUTTON_TEXT,
  CAROUSEL2_DESCRIPTION,
  CAROUSEL2_TITLE,
  CAROUSEL3_BUTTON_TEXT,
  CAROUSEL3_DESCRIPTION,
  CAROUSEL3_TITLE,
  CARUOSEL1_DESCRIPTION,
} from "../../utils/constants";

const Hero = () => (
  <Carousel showThumbs={false} autoPlay showStatus={false}>
    <CarouselItem>
      <HeroTitle>{CAROUSEL1_TITLE}</HeroTitle>
      <HeroDescription>{CARUOSEL1_DESCRIPTION}</HeroDescription>
      <UIBUtton inverted>{CAROUSEL1_BUTTON_TEXT}</UIBUtton>
    </CarouselItem>
    <CarouselItem>
      <HeroTitle>{CAROUSEL2_TITLE}</HeroTitle>
      <HeroDescription>{CAROUSEL2_DESCRIPTION}</HeroDescription>
      <UIBUtton inverted>{CAROUSEL2_BUTTON_TEXT}</UIBUtton>
    </CarouselItem>
    <CarouselItem>
      <HeroTitle>{CAROUSEL3_TITLE}</HeroTitle>
      <HeroDescription>{CAROUSEL3_DESCRIPTION}</HeroDescription>
      <UIBUtton inverted>{CAROUSEL3_BUTTON_TEXT}</UIBUtton>
    </CarouselItem>
  </Carousel>
);

const CarouselItem = styled.div`
  background-color: ${(props) => props.theme.textPrimary};
  color: ${(props) => props.theme.heroText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 33rem;
`;
const HeroTitle = styled.h1`
  font-size: 4.8rem;
  margin: 0;
`;
const HeroDescription = styled.p`
  font-size: 1.8rem;
`;

export default Hero;
