import styled from "styled-components";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

import { Divider } from "../../styles/UIKit";
import {
  ABOUT_US,
  BLOG,
  COMPANY_INFO,
  CONTACT_US,
  HELP_LINKS,
  LATEST_POSTS,
  RETURNS,
  STORE_LOCATION,
  SHOP,
  ORDER_STATUS,
  SIZE_GUIDE,
  DELIVERY,
  SHIPPING_INFO,
  FAQ,
  USEFUL_LINKS,
  SPECIAL_LINKS,
  GIFT_CARDS,
  ADVERTISING,
  TERMS_OF_USE,
  GET_IN_THE_KNOW,
  EMAIL_PLACEHOLDER,
  COPYRIGHT_TEXT,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from "../../utils/constants";

const Footer = () => (
  <FooterContainer>
    <TopFooter>
      <ListContainer>
        <UnorderdListItem>
          <ListHeading>{COMPANY_INFO}</ListHeading>
          <ListItem>{ABOUT_US}</ListItem>
          <ListItem>{LATEST_POSTS}</ListItem>
          <ListItem>{BLOG}</ListItem>
          <ListItem>{CONTACT_US}</ListItem>
          <ListItem>{SHOP}</ListItem>
          <ListItem>{STORE_LOCATION}</ListItem>
        </UnorderdListItem>
      </ListContainer>
      <ListContainer>
        <UnorderdListItem>
          <ListHeading>{HELP_LINKS}</ListHeading>
          <ListItem>{RETURNS}</ListItem>
          <ListItem>{ORDER_STATUS}</ListItem>
          <ListItem>{SIZE_GUIDE}</ListItem>
          <ListItem>{DELIVERY}</ListItem>
          <ListItem>{SHIPPING_INFO}</ListItem>
          <ListItem>{FAQ}</ListItem>
        </UnorderdListItem>
      </ListContainer>
      <ListContainer>
        <UnorderdListItem>
          <ListHeading>{USEFUL_LINKS}</ListHeading>
          <ListItem>{SPECIAL_LINKS}</ListItem>
          <ListItem>{GIFT_CARDS}</ListItem>
          <ListItem>{ADVERTISING}</ListItem>
          <ListItem>{TERMS_OF_USE}</ListItem>
        </UnorderdListItem>
      </ListContainer>
      <ListContainer>
        <UnorderdListItem>
          <ListHeading>{GET_IN_THE_KNOW}</ListHeading>
          <ListItem>
            <EmailInput placeholder={EMAIL_PLACEHOLDER} />
            <InputArrow> &gt; </InputArrow>
          </ListItem>
          <ListItem>
            <IconContainer>
              <FaFacebookSquare size={24} />
              <FaTwitter size={24} />
              <FaInstagram size={24} />
              <FaPinterestP size={24} />
            </IconContainer>
          </ListItem>
        </UnorderdListItem>
      </ListContainer>
    </TopFooter>
    <Divider />
    <BottomFooter>
      <CopyRightsContainer>
        <p> {COPYRIGHT_TEXT}</p>
        <p>
          {PRIVACY_POLICY} {TERMS_AND_CONDITIONS}
        </p>
      </CopyRightsContainer>
      <PaymentCardsContainer>
        <FaCcVisa size={48} style={{ margin: "0.25rem" }} />
        <FaCcMastercard size={48} style={{ margin: "0.25rem" }} />
        <FaCcPaypal size={48} style={{ margin: "0.25rem" }} />
        <FaCcAmex size={48} style={{ margin: "0.25rem" }} />
      </PaymentCardsContainer>
    </BottomFooter>
  </FooterContainer>
);

const TopFooter = styled.div`
  display: flex;
  height: 20.56rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 30.56rem;
  background-color: ${(props) => props.theme.footerBackground};
`;
const ListContainer = styled.div`
  padding-top: 4rem;
`;
const ListHeading = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
`;
const ListItem = styled.li`
  list-style: none;
  font-size: 1rem;
`;
const UnorderdListItem = styled.ul`
  padding-inline-end: 2.5rem;
`;
const EmailInput = styled.input`
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.footerBackground};
  :focus {
    outline: none;
  }
`;
const InputArrow = styled.span`
  font-size: 1.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4rem;
`;
const BottomFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline-start: 40px;
  padding-inline-end: 40px;
`;
const CopyRightsContainer = styled.div`
  align-items: flex-start;
`;
const PaymentCardsContainer = styled.div`
  align-items: flex-end;
`;
export default Footer;
