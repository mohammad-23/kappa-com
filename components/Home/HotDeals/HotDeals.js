import styled from "styled-components";
import Link from "next/link";

import { Button, Divider } from "../../../styles/UIKit";
import { HeaderData, HotDealsData } from "../../../config/HomeConfig";
import { useEffect, useState } from "react";
import useApi from "../../../utils/useApi";
import ProductCard from "../../ProductCard";

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState([]);
  const api = useApi();

  useEffect(() => {
    api.get("/hot-deals").then(({ data }) => {
      setHotDeals(data);
    });
  }, []);

  return (
    <HotDealsContainer>
      <HotDealsTitleContainer>
        <HotDealsTitle>{HotDealsData.title}</HotDealsTitle>
        <ViewAllLink>
          {" "}
          <Link href={HeaderData.men.url}>VIEW ALL</Link>{" "}
        </ViewAllLink>
      </HotDealsTitleContainer>
      <Divider />
      <HotDealsContent>
        <HotDealsOfferContainer>
          <HotDealsOfferTitle>{HotDealsData.OfferText}</HotDealsOfferTitle>
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
          <ShopNowButton inverted> {HotDealsData.buttonText}</ShopNowButton>
        </HotDealsOfferContainer>

        {hotDeals.slice(0, 3).map((hotDeal) => (
          <ProductCard key={hotDeal._id} {...hotDeal} />
        ))}
      </HotDealsContent>
    </HotDealsContainer>
  );
};

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
`;

const ViewAllLink = styled.div`
  margin-left: auto;
  cursor: pointer;
  margin-top: 2rem;
  margin-right: 1rem;
  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    color: ${(props) => props.theme.textPrimary};

    :hover {
      color: ${(props) => props.theme.textSecondary};
    }
  }
`;

const HotDealsOfferTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;

const HotDealsContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const HotDealsOfferContainer = styled.div`
  width: 30.25rem;
  height: 25.75rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
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

const ShopNowButton = styled(Button)`
  :hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.primary};
  }
`;
