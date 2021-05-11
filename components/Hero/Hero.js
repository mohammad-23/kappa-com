import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import UIBUtton from "../../styles/UIKit/Button";

const Hero = () => {
  return (
    <Carousel showThumbs={false} autoPlay>
      <CarouselItem>
        <HeroTitle>HOT RIGHT NOW</HeroTitle>
        <HeroDescription>
          Create your ever-evolving wardrobe today with 500+ styles to discover
        </HeroDescription>
        <UIBUtton inverted>BUILD YOUR WARDROBE</UIBUtton>
      </CarouselItem>
      <CarouselItem>
        <HeroTitle>HOT RIGHT YESTERDAY</HeroTitle>
        <HeroDescription>
          Create your ever-evolving wardrobe YESTERDAY with 500+ styles to
          discover
        </HeroDescription>
        <UIBUtton inverted>BUILD YOUR WARDROBE</UIBUtton>
      </CarouselItem>
      <CarouselItem>
        <HeroTitle>HOT RIGHT TOMORROW</HeroTitle>
        <HeroDescription>
          Create your ever-evolving wardrobe TOMORROW with 500+ styles to
          discover
        </HeroDescription>
        <UIBUtton inverted>BUILD YOUR WARDROBE</UIBUtton>
      </CarouselItem>
    </Carousel>
  );
};

const CarouselItem = styled.div`
  background-color: ${(props) => props.theme.textPrimary};
  color: ${(props) => props.theme.heroText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 26rem;
`;
const HeroTitle = styled.h1`
  font-size: 4.8rem;
  margin: 0;
`;
const HeroDescription = styled.p`
  font-size: 1.8rem;
`;

export default Hero;
