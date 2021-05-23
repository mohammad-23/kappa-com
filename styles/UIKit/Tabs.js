import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import omitProps from "../../utils/omitProps";

const TabContext = React.createContext({
  activeTab: null,
  setActiveTab: null,
});

const TabList = ({ children, className, width }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  const clonedChildren = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      isActive: index === activeTab,
      onClick: () => {
        setActiveTab(index);
      },
    })
  );

  return (
    <TabButtonsContainer className={className} width={width}>
      <TabButtonsContentContainer>{clonedChildren}</TabButtonsContentContainer>
    </TabButtonsContainer>
  );
};

const Tab = ({ isActive, onClick, isDisabled, children, ...restProps }) => (
  <TabButton
    isActive={isActive}
    onClick={() => {
      if (!isDisabled) {
        onClick();
      }
    }}
    {...restProps}
  >
    {children}
  </TabButton>
);

const TabPanels = ({ children }) => {
  const { activeTab } = useContext(TabContext);

  return children[activeTab];
};

const TabPanel = ({ children }) => children;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

Tabs.TabPanel = TabPanel;
Tabs.TabList = TabList;
Tabs.TabPanels = TabPanels;
Tabs.Tab = Tab;

TabList.defaultProps = {
  children: null,
  className: null,
  width: "100%",
};

TabList.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  width: PropTypes.string,
};

Tab.defaultProps = {
  isActive: false,
  children: null,
  isDisabled: false,
  onClick: () => {},
};

Tab.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
  isDisabled: PropTypes.bool,
};

TabPanels.propTypes = {
  children: PropTypes.node.isRequired,
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tabs;

const TabButtonsContainer = styled.div`
  margin: 0;
  width: ${(props) => props.width || "100%"};
`;

const TabButtonsContentContainer = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: auto auto;

  & * :first-child {
    border-right: 1px solid ${(props) => props.theme.background};
  }
`;

const GridColumn = styled.div``;

const TabButton = styled(
  omitProps(GridColumn, ["isActive", "onActivate", "isDisabled"])
)`
  height: 3em;
  padding: 0 0.75em;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  background: transparent;
  position: relative;
  font-weight: 700;
  cursor: pointer;

  ${(props) => {
    const { isActive, theme } = props;
    const activeColor = theme.primary;
    const inActiveColor = theme.textPrimary;

    return css`
      color: ${isActive ? activeColor : inActiveColor};

      :hover {
        color: ${isActive ? activeColor : theme.textSecondary};
      }
    `;
  }};

  ${(props) =>
    props.isActive &&
    css`
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.25em;
        background-color: ${props.theme.primary};
      }
    `}
`;
