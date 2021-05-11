import styled from "styled-components";
import freeshippingicon from "./img/freeshippingicon.svg";
import paymentsecurityicon from "./img/100-percent-payment-secure.svg";
import thirtydaysreturn from "./img/30-days-return.svg";
import supporticon from "./img/support247icon.svg";
const Benefit = () => {
  return (
    <BenefitContainer>
      <BenefitItem>
      <BenefitIconContainer>
        <FreeShippingIcon />
        </BenefitIconContainer>
        <BenefitDiv>
          <BenefitTitle>FREE SHIPPING</BenefitTitle>
          <BenefitDescription>
            Free shipping on all US order or order above $100
          </BenefitDescription>
        </BenefitDiv>
      </BenefitItem>
      <BenefitItem>
      <BenefitIconContainer>
        <Support247Icon />
        </BenefitIconContainer>
        <BenefitDiv>
          <BenefitTitle>SUPPORT 24/7</BenefitTitle>
          <BenefitDescription>
            Contact us 24 hours a day, 7 days a week
          </BenefitDescription>
        </BenefitDiv>
      </BenefitItem>
      <BenefitItem>
      <BenefitIconContainer>
        <ThirtyDaysReturn />
        </BenefitIconContainer>
        <BenefitDiv>
          <BenefitTitle>30 DAYS RETURN</BenefitTitle>
          <BenefitDescription>
            Simply return it within 30 days for an exchange.
          </BenefitDescription>
        </BenefitDiv>
      </BenefitItem>
      <BenefitItem>
      <BenefitIconContainer>
        <PaymentSecurityIcon />
        </BenefitIconContainer>
        <BenefitDiv>
          <BenefitTitle>100% PAYMENT SECURE</BenefitTitle>
          <BenefitDescription>
            We ensure secure payment process.
          </BenefitDescription>
        </BenefitDiv>
      </BenefitItem>
    </BenefitContainer>
  );
};

const BenefitContainer = styled.div`
  height: 13rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BenefitTitle = styled.h3`
display:inline;`;
const BenefitDescription = styled.p``;
const BenefitItem = styled.div`
display:flex;
flex-direction:row;
align-items:flex-start;
justify-content:space-around;
`;
const BenefitDiv = styled.div`
margin-left:1rem;
width:15rem;
`;
const FreeShippingIcon = styled.img`
`;
const BenefitIconContainer = styled.div`
`;

FreeShippingIcon.defaultProps = {
  src: freeshippingicon,
};
const PaymentSecurityIcon = styled.img``;

PaymentSecurityIcon.defaultProps = {
  src: paymentsecurityicon,
};

const ThirtyDaysReturn = styled.img``;

ThirtyDaysReturn.defaultProps = {
  src: thirtydaysreturn,
};

const Support247Icon = styled.img``;

Support247Icon.defaultProps = {
  src: supporticon,
};

export default Benefit;
