import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

import UIBUtton from "../../../styles/UIKit/Button";
import { HeroData } from "../../../config/HomeConfig";

const Hero = () => (
  <CarouselContainer>
    <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
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

const CarouselContainer = styled.div`
  width: 100%;
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
`;

const HeroDescription = styled.p`
  font-size: 1.8rem;
`;
