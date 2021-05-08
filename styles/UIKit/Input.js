import styled from "styled-components";

const Input = styled.input`
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

export default Input;
