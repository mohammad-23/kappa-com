import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button, Input, Slider } from "../../styles/UIKit";

const SliderFilter = ({ title }) => {
  const [sliderValues, setSliderValues] = useState({ min: 0, max: 0 });

  const onValuesChange = (sliderValues) => {
    setSliderValues({ min: sliderValues[0], max: sliderValues[1] });
  };

  const onInputChange = (type) => (event) => {
    const { value } = event.target;

    if (value >= 0) {
      setSliderValues((prevState) => ({
        ...sliderValues,
        [type]: Number(value),
      }));
    }
  };

  return (
    <React.Fragment>
      <FilterTitle>{title}</FilterTitle>
      <Slider
        domain={[0, 1500]}
        min={sliderValues.min}
        max={sliderValues.max}
        onValuesChange={onValuesChange}
      />
      <span>Range:</span>
      <SliderRange>
        <StyledInput
          type="number"
          placeholder="min"
          width="15%"
          size="sm"
          value={sliderValues.min}
          onChange={onInputChange("min")}
        />
        <StyledInput
          type="number"
          placeholder="max"
          width="15%"
          size="sm"
          value={sliderValues.max}
          onChange={onInputChange("max")}
        />
        <Button inverted size="sm" style={{ padding: "0.5em 1em" }}>
          Go
        </Button>
      </SliderRange>
    </React.Fragment>
  );
};

const ProductFilter = ({ title, type }) => {
  const renderSelectableFilter = () => (
    <React.Fragment>
      <FilterTitle>{title}</FilterTitle>
      <FilterItemsGroup>
        {[1, 2, 3].map((item) => (
          <FilterItem key={item}>
            vercel <div>(3)</div>
          </FilterItem>
        ))}
      </FilterItemsGroup>
    </React.Fragment>
  );

  return (
    <FilterItemContainer>
      {(() => {
        if (type === "select") {
          return renderSelectableFilter();
        }

        if (type === "slider") {
          return <SliderFilter title={title} />;
        }

        return renderSelectableFilter();
      })()}
    </FilterItemContainer>
  );
};

const FilterSection = () => (
  <FilterContainer>
    {[
      { title: "black", type: "list" },
      { title: "black", type: "select" },
      { title: "Price", type: "slider" },
    ].map((item) => (
      <ProductFilter key={item.type} title={item.title} type={item.type} />
    ))}
  </FilterContainer>
);

SliderFilter.defaultProps = {
  title: null,
};

SliderFilter.propTypes = {
  title: PropTypes.string,
};

ProductFilter.defaultProps = {
  type: "",
  title: "",
};

ProductFilter.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

export default FilterSection;

const FilterContainer = styled.div`
  margin: 1em 2em 1em 0em;
  overflow: auto;
`;

const FilterItemContainer = styled.div`
  margin: 1em 0 1.5em;
`;

const FilterTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

const FilterItemsGroup = styled.div`
  & > * {
    padding: 0 0 5px 0;
    margin: 0 0 5px 0;
    border-bottom: 1px solid ${(props) => props.theme.background};
  }
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.textSecondary};
  }
`;

const SliderRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > * {
    margin-right: 10px;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const StyledInput = styled(Input)`
  padding: 0.4em;
  font-size: 0.9em;

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
