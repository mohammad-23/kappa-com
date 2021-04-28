import styled from "styled-components";

import { config } from "../config";

const Home = () => (
  <Container>
    <h1>{config.appName}</h1>
    <p>
      <em>{config.appTagline}</em>
    </p>
  </Container>
);

export default Home;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
