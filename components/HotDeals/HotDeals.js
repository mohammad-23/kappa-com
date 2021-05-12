import styled from "styled-components";
import ItemCard from "../../styles/UIKit/ItemCard";
import UIButton from "../../styles/UIKit/Button";
import Divider from "../../styles/UIKit/Divider";
const HotDeals = () => {
  return (
    <HotDealsContainer>
      <HotDealsTitle>HOT DEALS</HotDealsTitle>
      <Divider/>
      <HotDealsContent>
        <HotDealsOfferContainer>
          <HotDealsOfferTitle>Winter sales <br/> 50 % off</HotDealsOfferTitle>
          <HotDealsCounterContainer>
          <HotDealsCounterSquare>
          <SquareCounter>100</SquareCounter>
          <SquareTime>DAYS</SquareTime>
          </HotDealsCounterSquare>
          <HotDealsCounterSquare>
          <SquareCounter>23</SquareCounter>
          <SquareTime>HOURS</SquareTime>
          </HotDealsCounterSquare>
          <HotDealsCounterSquare>
          <SquareCounter>36</SquareCounter>
          <SquareTime>MINS</SquareTime>
          </HotDealsCounterSquare>
          <HotDealsCounterSquare>
          <SquareCounter>45</SquareCounter>
          <SquareTime>SECS</SquareTime>
          </HotDealsCounterSquare>
          </HotDealsCounterContainer>
          <UIButton inverted> SHOP NOW</UIButton>
        </HotDealsOfferContainer>
        <ItemCard itemName={"Carson Shoulder"} itemPrice={"175.00"}></ItemCard>
        <ItemCard itemName={"Jaxson Jacket"} itemPrice={"175.00"}></ItemCard>
        <ItemCard
          itemName={"Zinnia Scallop Applique Mini"}
          itemPrice={"199.00"}
        ></ItemCard>
      </HotDealsContent>
    </HotDealsContainer>
  );
};

const HotDealsContainer = styled.div`
width:100%;
height:30.25rem;
`;

const HotDealsTitle = styled.h1`
margin-left: 1.5rem;
`;
const HotDealsOfferTitle = styled.h1`
text-transform:uppercase;
text-align:center;

`;
const HotDealsContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const HotDealsOfferContainer = styled.div`
  width: 30.25rem;
  height: 25.75rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.heroText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HotDealsCounterSquare = styled.div`
height:4.25rem;
width:4.25rem;
margin:0.5rem 0.5rem 1rem 0.5rem;
border:1px solid #FFFFFF;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const SquareCounter = styled.h2`
margin:0;
`;
const SquareTime = styled.p`
color:${(props)=> props.theme.greyText};
font-size:0.8rem;
margin:0;
display:inline;
font-weight:bold;
`;

const HotDealsCounterContainer = styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
`;

export default HotDeals;
