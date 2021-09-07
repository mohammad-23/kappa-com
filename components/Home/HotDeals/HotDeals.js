import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

import ProductCard from "../../ProductCard";
import { homeConfig } from "../../../config";
import { Button, Divider, TextField } from "../../../styles/UIKit";

const HotDeals = ({ hotDealsData }) => (
  <HotDealsContainer>
    <HotDealsTitleContainer>
      <TextField size="1.5em" margin="0" weight="bold">
        {homeConfig.hotDealsData.title}
      </TextField>
      <ViewAllLink>
        <Link href={homeConfig.headerData.men.url}>VIEW ALL</Link>
      </ViewAllLink>
    </HotDealsTitleContainer>
    <Divider margin="1em 2em" />
    <HotDealsContent>
      <HotDealsOfferContainer>
        <HotDealsOfferTitle
          size="1.5em"
          color="white"
          margin="1em 0"
          weight="bold"
        >
          {homeConfig.hotDealsData.OfferText}
        </HotDealsOfferTitle>
        <HotDealsCounterContainer>
          <HotDealsCounterSquare>
            <TextField size="0.9em" color="white" margin="0" weight="bold">
              100
            </TextField>
            <TextField size="0.8em" margin="0" weight="bold" color="greyText">
              DAYS
            </TextField>
          </HotDealsCounterSquare>
          <HotDealsCounterSquare>
            <TextField size="0.9em" color="white" margin="0" weight="bold">
              23
            </TextField>
            <TextField size="0.8em" margin="0" weight="bold" color="greyText">
              HOURS
            </TextField>
          </HotDealsCounterSquare>
          <HotDealsCounterSquare>
            <TextField size="0.9em" color="white" margin="0" weight="bold">
              36
            </TextField>
            <TextField size="0.8em" margin="0" weight="bold" color="greyText">
              MINS
            </TextField>
          </HotDealsCounterSquare>
          <HotDealsCounterSquare>
            <TextField size="0.9em" color="white" margin="0" weight="bold">
              45
            </TextField>
            <TextField size="0.8em" margin="0" weight="bold" color="greyText">
              SECS
            </TextField>
          </HotDealsCounterSquare>
        </HotDealsCounterContainer>
        <ShopNowButton inverted>
          {" "}
          {homeConfig.hotDealsData.buttonText}
        </ShopNowButton>
      </HotDealsOfferContainer>

      {hotDealsData.slice(0, 3).map((hotDeal) => (
        <ProductCard key={hotDeal._id} {...hotDeal} />
      ))}
    </HotDealsContent>
  </HotDealsContainer>
);

HotDeals.defaultProps = {
  hotDealsData: [],
};

HotDeals.propTypes = {
  hotDealsData: PropTypes.array,
};

export default HotDeals;

const HotDealsContainer = styled.div`
  width: 100%;
  margin: 0 0 2em;
`;

const HotDealsTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em 2em 0;
`;

const ViewAllLink = styled.div`
  cursor: pointer;

  a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    color: ${(props) => props.theme.textPrimary};

    :hover {
      color: ${(props) => props.theme.textSecondary};
    }
  }
`;

const HotDealsOfferTitle = styled(TextField)`
  text-transform: uppercase;
  text-align: center;
`;

const HotDealsContent = styled.div`
  display: grid;
  grid-template-columns: 35% 20% 20% 20%;
  gap: 1em;
  margin: 1em 2em 2em;
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
