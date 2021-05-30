import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Star = ({ grade, index, isChecked }) => (
  <Label>
    <StarRadioInput
      type="radio"
      name="rating"
      id={grade}
      value={index}
      className="stars_radio-input"
    />
    <StyledSVG
      width="58"
      height="58"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#393939"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      isChecked={isChecked}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </StyledSVG>
  </Label>
);

Star.defaultProps = {
  grade: null,
  index: null,
  isChecked: false,
};

Star.propTypes = {
  grade: PropTypes.string,
  index: PropTypes.number,
  isChecked: PropTypes.bool,
};

export default Star;

const Label = styled.label`
  position: relative;
  cursor: pointer;
`;

const StarRadioInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
`;

const StyledSVG = styled.svg`
  fill: ${(props) =>
    props.isChecked ? props.theme.secondary : props.theme.backgroundLight};
  stroke: ${(props) => props.theme.background};
  stroke-width: 1;
  width: 20px;
  height: 20px;
`;
