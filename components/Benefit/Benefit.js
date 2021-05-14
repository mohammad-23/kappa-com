import styled from "styled-components";
import {
  FaFingerprint,
  FaLifeRing,
  FaUndo,
  FaShippingFast,
} from "react-icons/fa";
import {
  BENEFIT1_DESCRIPTION,
  BENEFIT1_TITLE,
  BENEFIT2_DESCRIPTION,
  BENEFIT2_TITLE,
  BENEFIT3_DESCRIPTION,
  BENEFIT3_TITLE,
  BENEFIT4_DESCRIPTION,
  BENEFIT4_TITLE,
} from "../../utils/constants";
const Benefit = () => (
  <BenefitContainer>
    <BenefitItem>
      <BenefitIconContainer>
        <FaShippingFast size={24} />
      </BenefitIconContainer>
      <BenefitDiv>
        <BenefitTitle>{BENEFIT1_TITLE}</BenefitTitle>
        <p>{BENEFIT1_DESCRIPTION}</p>
      </BenefitDiv>
    </BenefitItem>
    <BenefitItem>
      <BenefitIconContainer>
        <FaLifeRing size={24} />
      </BenefitIconContainer>
      <BenefitDiv>
        <BenefitTitle>{BENEFIT2_TITLE}</BenefitTitle>
        <p>{BENEFIT2_DESCRIPTION}</p>
      </BenefitDiv>
    </BenefitItem>
    <BenefitItem>
      <BenefitIconContainer>
        <FaUndo size={24} />
      </BenefitIconContainer>
      <BenefitDiv>
        <BenefitTitle>{BENEFIT3_TITLE}</BenefitTitle>
        <p>{BENEFIT3_DESCRIPTION}</p>
      </BenefitDiv>
    </BenefitItem>
    <BenefitItem>
      <BenefitIconContainer>
        <FaFingerprint size={24} />
      </BenefitIconContainer>
      <BenefitDiv>
        <BenefitTitle>{BENEFIT4_TITLE}</BenefitTitle>
        <p>{BENEFIT4_DESCRIPTION}</p>
      </BenefitDiv>
    </BenefitItem>
  </BenefitContainer>
);

const BenefitContainer = styled.div`
  height: 13rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BenefitTitle = styled.h3`
  display: inline;
`;
const BenefitItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
`;
const BenefitDiv = styled.div`
  margin-left: 1rem;
  width: 15rem;
`;
const BenefitIconContainer = styled.div`
  color: ${(props) => props.theme.primary};
`;

export default Benefit;
