import styled from "styled-components";

const ItemCard = (props) => {
  return (
    <ItemCardContainer>
      <ItemCardImageContainer></ItemCardImageContainer>
      <ItemName>{props.itemName}</ItemName>
      <ItemPrice>${props.itemPrice}</ItemPrice>
    </ItemCardContainer>
  );
};



const ItemCardImageContainer = styled.div`
  height: 21rem;
  width: 14.5rem;
  background-color: ${(props) => props.theme.favouritesImagePlaceHolderColor};
`;
const ItemCardContainer = styled.div`
  height: 25.75rem;
  width: 14.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemName = styled.p`
  margin-bottom: 0;
`;
const ItemPrice = styled.p`
  color: ${(props) => props.theme.primary};
  margin-top: 0;
`;

export default ItemCard;
