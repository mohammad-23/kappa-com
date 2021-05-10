import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import useOutsideAlerter from "../../utils/useOutsideAlerter";

const Dropdown = ({ options, onOptionSelect }) => {
  const [sortBy, setSortBy] = useState("");

  const wrapperRef = useRef(null);
  const { isOpen, setIsOpen } = useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (options.length) {
      setSortBy(options[0]);
    }
  }, []);

  const toggleDropdownOpen = useCallback(
    () => setIsOpen((prevState) => !prevState),
    []
  );

  const onOptionClick = (item) => () => {
    setSortBy(item);
    toggleDropdownOpen();
    onOptionSelect(item);
  };

  return (
    <DropdownContainer ref={wrapperRef}>
      <DropdownButton onClick={toggleDropdownOpen} className="dropbtn">
        <div>{sortBy}</div>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {options.length
          ? options.map((item) => (
              <Option key={item} onClick={onOptionClick(item)}>
                {item}
              </Option>
            ))
          : null}
      </DropdownContent>
    </DropdownContainer>
  );
};

Dropdown.defaultProps = {
  options: [],
  onOptionSelect: () => {},
};

Dropdown.propTypes = {
  options: PropTypes.array,
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

  :hover {
    background-color: ${(props) => props.theme.background};
  }
`;
