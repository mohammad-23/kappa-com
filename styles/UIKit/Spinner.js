import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid
    ${({ theme, disabled }) => (disabled ? theme.textSecondary : "#fff")};
  border-right: 2px solid
    ${({ theme, disabled }) => (disabled ? theme.textSecondary : "#fff")};
  border-bottom: 2px solid
    ${({ theme, disabled }) => (disabled ? theme.textSecondary : "#fff")};
  border-left: 2px solid
    ${({ theme, disabled }) => (disabled ? "#fff" : theme.textSecondary)};
  background: transparent;
  border-radius: 50%;

  ${(props) => {
    switch (props.size) {
      case "sm":
        return {
          width: "0.5rem",
          height: "0.5rem",
        };

      case "md":
        return {
          width: "1rem",
          height: "1rem",
        };

      case "lg":
        return {
          width: "1rem",
          height: "1rem",
        };

      case "xl":
        return {
          width: "1.5rem",
          height: "1.5rem",
        };

      default:
        return {
          width: "0.5rem",
          height: "0.5rem",
        };
    }
  }}
`;

export default Spinner;
