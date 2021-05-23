import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "./Spinner";

const UIBUtton = ({ children, loading, ...props }) => (
  <Button {...props}>
    <ContentContainer loading={loading ? 1 : 0}>
      {loading ? <Spinner {...props} /> : null} {children}
    </ContentContainer>
  </Button>
);

UIBUtton.defaultProps = {
  size: "md",
  children: null,
  loading: false,
};

UIBUtton.propTypes = {
  size: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default UIBUtton;

const Button = styled.button`
  ${(props) => {
    switch (props.size) {
      case "sm":
        return {
          padding: "0.5rem 0.75rem",
          fontSize: "0.75em",
        };

      case "md":
        return {
          padding: "0.75rem 1rem",
          fontSize: "1em",
        };

      case "lg":
        return {
          padding: "1rem 1.25rem",
          fontSize: "1.25em",
        };

      case "xl":
        return {
          padding: "1.25rem 1.5rem",
          fontSize: "1.5em",
        };

      default:
        return {
          padding: "0.75rem 1rem",
          fontSize: "1.25em",
        };
    }
  }}

  ${(props) => {
    if (props.compact) {
      return {
        padding: "0.25em",
      };
    }
  }}

  color: ${(props) => {
    if (props.inverted) {
      return props.theme.primary;
    }

    if (props.basic) {
      return props.theme.textPrimary;
    }

    return "#fff";
  }};
  background-color: ${(props) => {
    if (props.inverted) {
      return "#fff";
    }

    if (props.basic) {
      return props.theme.background;
    }

    return props.theme.primary;
  }};
  border: ${(props) =>
    props.basic
      ? `1px solid ${props.theme.background}`
      : `1px solid ${props.theme.primary}`};
  outline: none;
  border-radius: 4px;

  /* add hover effect for disabled also */
  :hover {
    color: ${(props) => (props.basic ? props.theme.textPrimary : "#fff")};
    background-color: ${(props) => {
      if (props.inverted) {
        return props.theme.primary;
      }

      if (props.basic) {
        return props.theme.backgroundLight;
      }

      return props.theme.primaryHover;
    }};

    border: ${(props) => {
      if (props.inverted) {
        return `1px solid ${props.theme.primary}`;
      }

      if (props.basic) {
        return `1px solid ${props.theme.background}`;
      }

      return `1px solid ${props.theme.primaryHover}`;
    }};
  }

  :active {
    transform: ${(props) => (props.disabled ? "scale(1)" : "scale(0.98)")};
  }

  :disabled {
    border: 1px solid ${(props) => props.theme.background};
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.backgroundLight};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & * :first-child {
    margin-right: ${(props) => (props.loading ? "5px" : 0)};
  }
`;
