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

import {
  GET_IN_THE_KNOW,
  EMAIL_PLACEHOLDER,
  COPYRIGHT_TEXT,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from "../../utils/constants";
import { footerConfig } from "../../config";
import { Divider, Input } from "../../styles/UIKit";

const Footer = () => (
  <FooterContainer>
    <TopFooter>
      {footerConfig.map((footerItem, index) => (
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
        <p>{COPYRIGHT_TEXT}</p>
        <p>
          {PRIVACY_POLICY} {TERMS_AND_CONDITIONS}
        </p>
      </CopyRightsContainer>
      <PaymentCardsContainer>
        <FaCcVisa size={28} style={{ margin: "0.25rem" }} />
        <FaCcMastercard size={28} style={{ margin: "0.25rem" }} />
        <FaCcPaypal size={28} style={{ margin: "0.25rem" }} />
        <FaCcAmex size={28} style={{ margin: "0.25rem" }} />
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
  font-size: 0.8rem;
`;

const ListItem = styled.li`
  list-style: none;
  font-size: 0.8rem;
`;

const UnorderdListItem = styled.ul`
  padding-inline-end: 2.5rem;
`;

const EmailInput = styled(Input)`
  border: 0;
  border-bottom: 1px solid black;
  border-radius: 0px;
  background-color: ${(props) => props.theme.footerBackground};
  font-size: 0.8rem;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4rem;

  & > * {
    cursor: pointer;
  }
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
  font-size: 0.8rem;
`;

const PaymentCardsContainer = styled.div`
  align-items: flex-end;
`;
