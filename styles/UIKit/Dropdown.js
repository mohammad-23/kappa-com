import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { useOutsideAlerter } from "../../utils";

const Dropdown = ({
  options,
  onOptionSelect,
  initialValue,
  placeholder,
  hasInitialValue,
}) => {
  const [selected, setSelected] = useState({
    name: "",
    value: "",
  });

  const wrapperRef = useRef(null);
  const { isOpen, setIsOpen } = useOutsideAlerter(wrapperRef);

  const setInitialSort = () => {
    if (Object.keys(initialValue).length) {
      setSelected({ name: initialValue.name, value: initialValue.value });
    } else {
      if (typeof options[0] === "string") {
        setSelected({ name: options[0], value: options[0] });
      } else {
        setSelected({ name: options[0].name, value: options[0].value });
      }
    }
  };

  useEffect(() => {
    if (options.length && hasInitialValue) {
      setInitialSort();
    }
  }, []);

  const toggleDropdownOpen = useCallback(
    () => setIsOpen((prevState) => !prevState),
    []
  );

  const onOptionClick = (item) => () => {
    if (typeof options[0] === "string") {
      setSelected({ name: item, value: item });
      toggleDropdownOpen();
      onOptionSelect(item);
    } else {
      const { name, value } = item;

      setSelected({ name, value });
      toggleDropdownOpen();
      onOptionSelect(item);
    }
  };

  return (
    <DropdownContainer ref={wrapperRef}>
      <DropdownButton onClick={toggleDropdownOpen} className="dropbtn">
        <div>{selected.name.length ? selected.name : placeholder}</div>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {options.length
          ? options.map((item) => {
              if (typeof item === "string") {
                return (
                  <Option key={item} onClick={onOptionClick(item)}>
                    {item}
                  </Option>
                );
              }

              const { name, key } = item;

              return (
                <Option key={key} onClick={onOptionClick(item)}>
                  {name}
                </Option>
              );
            })
          : null}
      </DropdownContent>
    </DropdownContainer>
  );
};

Dropdown.defaultProps = {
  options: [],
  placeholder: "",
  initialValue: {},
  hasInitialValue: true,
  onOptionSelect: () => {},
};

Dropdown.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  hasInitialValue: PropTypes.bool,
  initialValue: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
  }),
  onOptionSelect: PropTypes.func,
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  background-color: #fbfbfb;
  border: 1px solid ${(props) => props.theme.background};
`;

const DropdownButton = styled.div`
  font-size: 16px;
  cursor: pointer;
  padding: 0.75em 1em;
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #fbfbfb;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const Option = styled.div`
  color: black;
  padding: 0.75em 1em;
  text-decoration: none;
  text-align: left;

  :hover {
    background-color: ${(props) => props.theme.background};
  }
`;
