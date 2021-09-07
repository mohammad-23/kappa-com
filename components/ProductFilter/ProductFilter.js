/* eslint-disable camelcase */
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import ProductsContext from "../../contexts/ProductsContext";
import { Button, Input, Slider, Checkbox } from "../../styles/UIKit";

const selectFilters = ["Size", "Color"];

const SliderFilter = ({ title }) => {
  const { maxPrice, onRangeSelect } = useContext(ProductsContext);

  const [sliderValues, setSliderValues] = useState({
    min: 0,
    max: maxPrice || 1,
  });

  const onValuesChange = (sliderValues) => {
    setSliderValues({ min: sliderValues[0], max: sliderValues[1] });
  };

  const onInputChange = (type) => (event) => {
    const { value } = event.target;
    const { max, min } = sliderValues;

    if (Number(value) >= min && Number(value) <= max) {
      setSliderValues((prevState) => ({
        ...prevState,
        [type]: Number(value),
      }));
    }
  };

  const handleChange = () => {
    const { min, max } = sliderValues;

    if (min > 0 && max > 0) {
      onRangeSelect({ min, max });
    }
  };

  return (
    <React.Fragment>
      <FilterTitle>{title}</FilterTitle>
      <Slider
        domain={[0, maxPrice || 1]}
        min={sliderValues.min}
        max={maxPrice ?? sliderValues.max}
        onValuesChange={onValuesChange}
        maxPrice={maxPrice}
      />
      <span style={{ fontSize: "12px" }}>Range:</span>
      <SliderRange>
        <StyledInput
          type="number"
          placeholder="min"
          width="15%"
          size="sm"
          max={sliderValues.max}
          value={sliderValues.min}
          onChange={onInputChange("min")}
        />
        <StyledInput
          type="number"
          placeholder="max"
          width="15%"
          size="sm"
          min={sliderValues.min}
          value={sliderValues.max}
          onChange={onInputChange("max")}
        />
        <Button
          inverted
          size="sm"
          style={{ padding: "0.5em 1em" }}
          onClick={handleChange}
        >
          Go
        </Button>
      </SliderRange>
    </React.Fragment>
  );
};

const SelectableFilterItem = ({ name, amount, title }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { query } = useRouter();
  const { onFilterSelect } = useContext(ProductsContext);

  useEffect(() => {
    if (query.variant) {
      if (query.variant.split(",").includes(name)) {
        setIsChecked(true);
      }
    }
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setIsChecked((prevState) => !prevState);

    onFilterSelect({ filterName: "variant", filterValue: name });
  }, []);

  return (
    <FilterItem key={name}>
      <Checkable>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        {name}
      </Checkable>
      <div>({amount})</div>
    </FilterItem>
  );
};

const SelectableFilter = ({ title }) => {
  const { totalProductsList } = useContext(ProductsContext);

  const [filter, setFilter] = useState([]);

  const getAvailableFilterValues = () => {
    const filterObject = {};
    const allOptions = [];

    for (const item of totalProductsList) {
      const { variant_groups } = item;

      const selectedVariant = variant_groups.find(
        (item) => item.name === title
      );

      if (selectedVariant) {
        selectedVariant.options.map((option) => allOptions.push(option));
      }
    }

    allOptions.forEach((option) => {
      if (option) {
        if (filterObject[option.name]) {
          filterObject[option.name] += 1;
        } else {
          filterObject[option.name] = 1;
        }
      }
    });

    setFilter(filterObject);
  };

  useEffect(() => {
    if (totalProductsList.length) {
      getAvailableFilterValues();
    }
  }, []);

  return (
    <React.Fragment>
      <FilterTitle>{title}</FilterTitle>
      <FilterItemsGroup>
        {Object.keys(filter).map((item) => (
          <SelectableFilterItem
            key={item}
            name={item}
            amount={filter[item]}
            title={title.toLowerCase()}
          />
        ))}
      </FilterItemsGroup>
    </React.Fragment>
  );
};

const ListFilter = ({ listData }) => {
  const { onFilterSelect } = useContext(ProductsContext);

  return (
    <React.Fragment>
      <FilterTitle>Categories</FilterTitle>
      <FilterItemsGroup>
        {listData.map((item) => {
          if (item.category_type === "secondary_cat") {
            return (
              <FilterItem key={item.name}>
                <Checkable
                  selectable
                  onClick={() => {
                    onFilterSelect({
                      filterName: "category",
                      filterValue: item.name,
                    });
                  }}
                >
                  {item.name}
                </Checkable>
              </FilterItem>
            );
          }

          return null;
        })}
      </FilterItemsGroup>
    </React.Fragment>
  );
};

const FilterSection = () => {
  const {
    query: { category = "" },
  } = useRouter();
  const { productFilters, categories } = useContext(ProductsContext);

  return (
    <FilterContainer>
      {!category || category.split(",").length !== 2 ? (
        <FilterItemContainer>
          <ListFilter listData={categories} />
        </FilterItemContainer>
      ) : null}
      {productFilters.map((name) => (
        <FilterItemContainer key={name}>
          {(() => {
            if (selectFilters.includes(name)) {
              return <SelectableFilter title={name} />;
            }

            return <SelectableFilter title={name} />;
          })()}
        </FilterItemContainer>
      ))}
      <FilterItemContainer>
        <SliderFilter title={name} />
      </FilterItemContainer>
    </FilterContainer>
  );
};

SliderFilter.defaultProps = {
  title: null,
};

SliderFilter.propTypes = {
  title: PropTypes.string,
};

SelectableFilterItem.defaultProps = {
  name: "",
  title: "",
  amount: 0,
};

SelectableFilterItem.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number,
};

SelectableFilter.defaultProps = {
  title: null,
};

SelectableFilter.propTypes = {
  title: PropTypes.string,
};

ListFilter.propTypes = {
  listData: [],
};

ListFilter.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
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
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

const FilterItemsGroup = styled.div`
  max-height: 14em;
  padding: 0em 0.5em 0em 0em;
  overflow: auto;
  color: ${(props) => props.theme.textPrimary};

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: none;
  }

  &:hover ::-webkit-scrollbar {
    display: block;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

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
  font-size: 14px;
`;

const Checkable = styled.label`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.selectable ? "pointer" : "default")};

  & > * {
    margin-right: 0.5em;
  }

  & * :last-child {
    :hover {
      color: ${(props) => props.theme.textSecondary};
    }
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
