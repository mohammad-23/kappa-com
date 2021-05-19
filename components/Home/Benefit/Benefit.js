import styled from "styled-components";

import { BenefitsData } from "../../../config/HomeConfig";
const Benefit = () => (
  <BenefitContainer>
    {BenefitsData.map((BenefitDataItem) => (
      <BenefitItem key={BenefitDataItem.id}>
        <BenefitIconContainer>{BenefitDataItem.icon}</BenefitIconContainer>
        <BenefitDiv>
          <BenefitTitle>{BenefitDataItem.title}</BenefitTitle>
          <p>{BenefitDataItem.description}</p>
        </BenefitDiv>
      </BenefitItem>
    ))}
  </BenefitContainer>
);

export default Benefit;

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
