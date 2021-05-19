import styled from "styled-components";

import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import Benefit from "../components/Home/Benefit";
import Favourites from "../components/Home/Favourites";
import Register from "../components/Home/Register";
import HotDeals from "../components/Home/HotDeals";
import Footer from "../components/Footer";

const Home = () => (
  <Container>
    <Header />
    <Hero />
    <Benefit />
    <Favourites />
    <Register />
    <HotDeals />
    <Footer />
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
