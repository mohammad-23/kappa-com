import styled from "styled-components";

import mediaQuerySize from "../../utils/mediaQuerySize";

const Grid = styled.div`
  display: grid;
  grid-gap: 1.5em;
  margin-top: 3rem;
  min-height: 75%;

  @media ${mediaQuerySize.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${mediaQuerySize.md} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${mediaQuerySize.sm} {
    grid-template-columns: 1fr;
  }

  @media ${mediaQuerySize.xl} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default Grid;
