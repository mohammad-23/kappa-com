import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Button, Divider } from "../../../styles/UIKit";
import { headerData, hotDealsData } from "../../../config/HomeConfig";
import useApi from "../../../utils/useApi";
import ProductCard from "../../ProductCard";

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState([]);
  const api = useApi();

  const fetchData = async () => {
    const { data } = await api.get("/hot-deals");

    setHotDeals(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HotDealsContainer>
      <HotDealsTitleContainer>
        <HotDealsTitle>{hotDealsData.title}</HotDealsTitle>
        <ViewAllLink>
          {" "}
          <Link href={headerData.men.url}>VIEW ALL</Link>{" "}
        </ViewAllLink>
      </HotDealsTitleContainer>
      <Divider />
      <HotDealsContent>
        <HotDealsOfferContainer>
          <HotDealsOfferTitle>{hotDealsData.OfferText}</HotDealsOfferTitle>
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
          <ShopNowButton inverted> {hotDealsData.buttonText}</ShopNowButton>
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
  display: grid;
  grid-template-columns: 35% 20% 20% 20%;
  gap: 0.5em;
`;

const HotDealsOfferContainer = styled.div`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  height: 100%;
  text-align: center;
  display: grid;
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
  margin: auto;
`;
