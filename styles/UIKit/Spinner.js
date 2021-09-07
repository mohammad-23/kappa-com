import styled, { keyframes } from "styled-components";

const getSize = (size) => {
  switch (size) {
    case "sm":
      return "2px";

    case "md":
      return "4px";

    case "lg":
      return "5px";

    case "xl":
      return "5px";

    default:
      return "5px";
  }
};

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

  border-top: ${({ theme, disabled, size }) =>
    disabled
      ? `${getSize(size)} solid ${theme.textSecondary}`
      : `${getSize(size)} solid  #fff`};

  border-right: ${({ theme, disabled, size }) =>
    disabled
      ? `${getSize(size)} solid ${theme.textSecondary}`
      : `${getSize(size)} solid  #fff`};

  border-bottom: ${({ theme, disabled, size }) =>
    disabled
      ? `${getSize(size)} solid ${theme.textSecondary}`
      : `${getSize(size)} solid  #fff`};

  border-left: ${({ theme, disabled, size }) =>
    disabled
      ? `${getSize(size)} solid #fff`
      : `${getSize(size)} solid ${theme.textSecondary}`};

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
