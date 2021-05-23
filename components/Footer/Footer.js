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

import { Divider, Input } from "../../styles/UIKit";
import {
  GET_IN_THE_KNOW,
  EMAIL_PLACEHOLDER,
  COPYRIGHT_TEXT,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from "../../utils/constants";
import FooterData from "../../config/FooterConfig";

const Footer = () => (
  <FooterContainer>
    <TopFooter>
      {FooterData.map((footerItem, index) => (
        <div key={footerItem.key}>
          <UnorderdListItem key={index}>
            <ListHeading key={footerItem.title}>{footerItem.title}</ListHeading>
            {footerItem.links.map((link) => (
              <ListItem key={link}> {link}</ListItem>
            ))}
          </UnorderdListItem>
        </div>
      ))}
      <div>
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
      </div>
    </TopFooter>
    <Divider margin="1em" />
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

export default Footer;

const TopFooter = styled.div`
  display: flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.footerBackground};
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

const EmailInput = styled(Input)`
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
