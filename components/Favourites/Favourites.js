import styled from "styled-components";

import { Divider, ItemCard } from "../../styles/UIKit";
import { FAVOURITES_TITLE } from "../../utils/constants";
const Favourites = () => (
  <FavoritesContainer>
    <FavouritesTitle>{FAVOURITES_TITLE}</FavouritesTitle>
    <Divider></Divider>
    <FavouritesImageDiv>
      <ItemCard
        itemName={"Greta White Midi Dress"}
        itemPrice={"159.00"}
      ></ItemCard>
      <ItemCard itemName={"Lilika Silver Mini"} itemPrice={"99.00"}></ItemCard>
      <ItemCard
        itemName={"Crystal Off White Dress"}
        itemPrice={"250.00"}
      ></ItemCard>
      <ItemCard itemName={"Carson Shoulder"} itemPrice={"175.00"}></ItemCard>
      <ItemCard itemName={"Dylan Polo Shirt"} itemPrice={"250.00"}></ItemCard>
    </FavouritesImageDiv>
  </FavoritesContainer>
);

const FavouritesTitle = styled.h1`
  margin-left: 1.5rem;
  padding: 0;
`;
const FavoritesContainer = styled.div`
  height: 40rem;
  width: 100%;
`;
const FavouritesImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default Favourites;
