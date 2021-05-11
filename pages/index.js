import styled from "styled-components";


import Header from "../components/Header";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit";
import Favourites from "../components/Favourites";

const Home = () => (
  <Container>
    <Header />
    <Hero/>
    <Benefit/>
    <Favourites/>
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
