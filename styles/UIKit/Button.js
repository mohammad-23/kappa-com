import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "./Spinner";

const UIBUtton = ({ children, loading, ...props }) => (
  <Button {...props}>
    <ContentContainer>
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

  color: ${(props) => (props.inverted ? props.theme.primary : "#fff")};
  background-color: ${(props) =>
    props.inverted ? "#fff" : props.theme.primary};
  border: ${(props) => `1px solid ${props.theme.primary}`};
  outline: none;
  border-radius: 4px;

  /* add hover effect for disabled also */
  :hover {
    color: #fff;
    background-color: ${(props) =>
      props.inverted ? props.theme.primary : props.theme.primaryHover};

    border: ${(props) =>
      props.inverted
        ? `1px solid ${props.theme.primary}`
        : `1px solid ${props.theme.primaryHover}`};
  }

  :active {
    transform: ${(props) => (props.disabled ? "scale(1)" : "scale(0.99)")};
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
    margin-right: 5px;
  }
`;
