import styled from "styled-components";

import Header from "../components/Header";

const Home = () => (
  <Container>
    <Header />
  </Container>
);

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;
