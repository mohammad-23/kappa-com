import styled from "styled-components";
import { Divider } from "../../styles/UIKit";
const Favourites = () => {
  return (
    <FavoritesContainer>
      <FavouritesTitle>THE FAVOURITES</FavouritesTitle>
      <Divider></Divider>
      <FavouritesImageDiv>
        <FavouriteItem>
          <FavouritesImageContainer></FavouritesImageContainer>
          <FavouriteItemName>Greta White Midi Dress</FavouriteItemName>
          <FavouriteItemPrice>$159.00</FavouriteItemPrice>
        </FavouriteItem>
        <FavouriteItem>
          <FavouritesImageContainer></FavouritesImageContainer>
          <FavouriteItemName>Lilika Silver Mini</FavouriteItemName>
          <FavouriteItemPrice>$99.00</FavouriteItemPrice>
        </FavouriteItem>
        <FavouriteItem>
          <FavouritesImageContainer></FavouritesImageContainer>
          <FavouriteItemName>Crystal Off White Dress</FavouriteItemName>
          <FavouriteItemPrice>$250.00</FavouriteItemPrice>
        </FavouriteItem>
        <FavouriteItem>
          <FavouritesImageContainer></FavouritesImageContainer>
          <FavouriteItemName>Carson Shoulder</FavouriteItemName>
          <FavouriteItemPrice>$175.00</FavouriteItemPrice>
        </FavouriteItem>
        <FavouriteItem>
          <FavouritesImageContainer></FavouritesImageContainer>
          <FavouriteItemName>Dylan Polo Shirt</FavouriteItemName>
          <FavouriteItemPrice>$250.00</FavouriteItemPrice>
        </FavouriteItem>
      </FavouritesImageDiv>
    </FavoritesContainer>
  );
};

const FavouritesTitle = styled.h1`
  margin-left: 1.5rem;
  padding: 0;
`;
const FavoritesContainer = styled.div`
  height: 40rem;
  width: 100%;
`;
const FavouritesImageContainer = styled.div`
  height: 21rem;
  width: 14.5rem;
  background-color: ${(props) => props.theme.favouritesImagePlaceHolderColor};
`;
const FavouriteItem = styled.div`
  height: 25.75rem;
  width: 14.5rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const FavouritesImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const FavouriteItemName = styled.p`
margin-bottom:0;
`;
const FavouriteItemPrice = styled.p`
    color: ${(props) => props.theme.primary};
    margin-top:0;
`;

export default Favourites;
