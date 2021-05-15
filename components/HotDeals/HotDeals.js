import styled from "styled-components";

import { ItemCard, Button, Divider } from "../../styles/UIKit";
import {
  HOTDEALS_OFFER_BUTTON_TEXT,
  HOTDEALS_OFFER_TEXT1,
  HOTDEALS_OFFER_TEXT2,
  HOTDEALS_TITLE,
  VIEW_ALL,
} from "../../utils/constants";
const HotDeals = () => (
  <HotDealsContainer>
    <HotDealsTitleContainer>
      <HotDealsTitle>{HOTDEALS_TITLE}</HotDealsTitle>
      <ViewAllLink>{VIEW_ALL} </ViewAllLink>
    </HotDealsTitleContainer>
    <Divider />
    <HotDealsContent>
      <HotDealsOfferContainer>
        <HotDealsOfferTitle>
          {HOTDEALS_OFFER_TEXT1} <br /> {HOTDEALS_OFFER_TEXT2}
        </HotDealsOfferTitle>
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
        <Button inverted> {HOTDEALS_OFFER_BUTTON_TEXT}</Button>
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

export default HotDeals;

const HotDealsContainer = styled.div`
  width: 100%;
  min-height: 40.25rem;
`;

const HotDealsTitle = styled.h1`
  margin-left: 1.5rem;
  display: inline;
`;
const HotDealsTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ViewAllLink = styled.a`
  color: ${(props) => props.theme.primary};
  font-size: 1rem;
  margin-left: auto;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  margin-right: 1rem;
`;
const HotDealsOfferTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
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
  height: 4.25rem;
  width: 4.25rem;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  border: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SquareCounter = styled.h2`
  margin: 0;
`;
const SquareTime = styled.p`
  color: ${(props) => props.theme.greyText};
  font-size: 0.8rem;
  margin: 0;
  display: inline;
  font-weight: bold;
`;

const HotDealsCounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
