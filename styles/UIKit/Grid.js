import styled from "styled-components";

import { mediaQuerySize } from "../../utils";

const Grid = styled.div`
  display: grid;
  grid-gap: 1.5em;
  margin-top: 3rem;
  min-height: 75%;

  @media ${mediaQuerySize.lg} {
    grid-template-columns: ${(props) => {
      if (props.lg) {
        return Array(props.lg + 1)
          .toString()
          .split("")
          .map(() => "1fr")
          .join(" ");
      }

      return "1fr 1fr 1fr";
    }};
  }

  @media ${mediaQuerySize.md} {
    grid-template-columns: ${(props) => {
      if (props.md) {
        return Array(props.md + 1)
          .toString()
          .split("")
          .map(() => "1fr")
          .join(" ");
      }

      return "1fr 1fr";
    }};
  }

  @media ${mediaQuerySize.sm} {
    grid-template-columns: ${(props) => {
      if (props.sm) {
        return Array(props.sm + 1)
          .toString()
          .split("")
          .map(() => "1fr")
          .join(" ");
      }

      return "1fr";
    }};
  }

  @media ${mediaQuerySize.xl} {
    grid-template-columns: ${(props) => {
      if (props.xl) {
        return Array(props.xl + 1)
          .toString()
          .split("")
          .map(() => "1fr")
          .join(" ");
      }

      return "1fr 1fr 1fr 1fr";
    }};
  }
`;

export default Grid;
