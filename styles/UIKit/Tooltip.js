import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Tooltip = ({ delay, children, direction, content }) => {
  const [active, setActive] = useState(false);

  let timeout;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = async () => {
    clearInterval(timeout);
    setTimeout(() => setActive(false), delay);
  };

  const renderTooltipContent = () => (
    <ContentContainer>
      {(() => {
        if (typeof content !== "string") {
          return content();
        }

        return <ContentItem>{content}</ContentItem>;
      })()}
    </ContentContainer>
  );

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active ? (
        <TooltipTip direction={direction}>{renderTooltipContent()}</TooltipTip>
      ) : null}
    </TooltipWrapper>
  );
};

Tooltip.defaultProps = {
  children: null,
  delay: 400,
  direction: "top",
  content: null,
};

Tooltip.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  direction: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default Tooltip;

const ContentContainer = styled.div`
  & > div {
    border-bottom: 1px solid ${(props) => props.theme.background};
  }

  & * :last-child {
    border-bottom: none;
  }
`;

const ContentItem = styled.div`
  padding: 10px;
  font-size: 14px;
`;

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipTip = styled.div`
  max-height: 150px;
  max-width: 150px;

  position: absolute;
  overflow: auto;
  left: 50%;
  transform: translateX(-50%);

  padding: 0px 10px;
  font-size: 14px;
  border-radius: 4px;
  font-family: sans-serif;
  color: ${(props) => props.theme.textPrimary};
  background: ${(props) => props.theme.backgroundLight};
  border: 1px solid ${(props) => props.theme.background};
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

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

  :before {
    content: "";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: calc(6px * -1);
  }

  ${(props) => {
    switch (props.direction) {
      case "top":
        return {
          bottom: "100%",
          transform: "translateX(-50%) translateY(-10px)",
        };

      case "bottom":
        return {
          top: "75%",
          transform: "translateX(-50%) translateY(0)",
        };

      case "bottom-right":
        return {
          top: "90%",
          transform: "translateX(-15%) translateY(0)",
        };

      case "bottom-left":
        return {
          top: "90%",
          transform: "translateX(-85%) translateY(0)",
        };

      case "left":
        return {
          left: "auto",
          right: "calc(100% + 20px)",
          top: "50%",
          transform: "translateX(0) translateY(-50%)",
        };

      case "right":
        return {
          left: "calc(100% + 10px)",
          top: "50%",
          transform: "translateX(0) translateY(-50%)",
        };

      default:
        return {
          bottom: "calc(30px * -1)",
        };
    }
  }}

  :before {
    ${(props) => {
      switch (props.direction) {
        case "top":
          return {
            top: "100%",
            borderTopColor: "#000",
          };

        case "bottom":
          return {
            bottom: "100%",
            borderBottomColor: "#000",
          };

        case "bottom-right":
          return {
            bottom: "100%",
            left: "15%",
            borderBottomColor: "#000",
          };

        case "bottom-left":
          return {
            bottom: "100%",
            left: "85%",
            borderBottomColor: "#000",
          };

        case "left":
          return {
            left: "auto",
            right: "-12px",
            top: "50%",
            transform: "translateX(0) translateY(-50%)",
            borderLeftColor: "#000",
          };

        case "right":
          return {
            left: "-6px",
            top: "50%",
            transform: "translateX(0) translateY(-50%)",
            borderRightColor: `${props.theme.textPrimary}`,
          };

        default:
          return {};
      }
    }}
  }
`;
