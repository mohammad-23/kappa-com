import styled from "styled-components";

import { benefitsData } from "../../../config/HomeConfig";

const Benefit = () => (
  <BenefitContainer>
    {benefitsData.map((BenefitDataItem) => (
      <BenefitItem key={BenefitDataItem.id}>
        <BenefitIconContainer>{BenefitDataItem.icon}</BenefitIconContainer>
        <div>
          <BenefitTitle>{BenefitDataItem.title}</BenefitTitle>
          <BenefitDescription>{BenefitDataItem.description}</BenefitDescription>
        </div>
      </BenefitItem>
    ))}
  </BenefitContainer>
);

export default Benefit;

const BenefitContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 1.5em 0;
  background-color: ${(props) => props.theme.background};
`;

const BenefitTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  display: inline;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 1em;

  & > * {
    margin-right: 1em;
  }
`;

const BenefitDescription = styled.div`
  font-size: 16px;
`;

const BenefitIconContainer = styled.div`
  color: ${(props) => props.theme.primary};
  margin-top: 0.25em;
`;
