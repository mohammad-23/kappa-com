import styled from "styled-components";

export const UIButtonPrimary = styled.button`
  ${(props) => {
    switch (props.size) {
      case "sm":
        return {
          padding: "6px 12px",
        };

      case "md":
        return {
          padding: "9px 18px",
        };

      case "lg":
        return {
          padding: "12px 24px",
        };

      case "xl":
        return {
          padding: "18px 36px",
        };

      default:
        return {
          padding: "6px 12px",
        };
    }
  }}

  color: ${(props) => (props.inverted ? props.theme.primary : "#fff")};
  background-color: ${(props) =>
    props.inverted ? "#fff" : props.theme.primary};
  border: ${(props) => `1px solid ${props.theme.primary}`};
  outline: none;

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
    transform: scale(0.99);
  }
`;

export const UIInput = styled.input`
  font-family: "PT Sans Caption", sans-serif;
  line-height: 127.5%;
  padding: 10px;
  outline: none;
  font-size: 16px;
  border: 1.5px solid ${(props) => props.theme.background};
  border-radius: 4px;

  ${(props) => {
    if (props.width) {
      return {
        width: props.width,
      };
    }

    if (props.fluid) {
      return {
        width: "100%",
      };
    }

    switch (props.size) {
      case "sm":
        return {
          width: "175px",
        };

      case "md":
        return {
          width: "200px",
        };

      case "lg":
        return {
          width: "250px",
        };

      default:
        return {
          width: "200px",
        };
    }
  }}
`;
