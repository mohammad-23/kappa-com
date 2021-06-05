import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import Benefit from "../components/Home/Benefit";
import Favourites from "../components/Home/Favourites";
import Register from "../components/Home/Register";
import HotDeals from "../components/Home/HotDeals";
import Footer from "../components/Footer";

const Home = ({ favData, hotDealsData, error }) => (
  <Container>
    <Header />
    <Hero />
    <Benefit />
    <Favourites favData={favData} />
    <Register />
    <HotDeals hotDealsData={hotDealsData} />
    <Footer />
  </Container>
);

Home.defaultProps = {
  favData: [],
  hotDealsData: [],
  error: null,
};

Home.propTypes = {
  favData: PropTypes.array,
  hotDealsData: PropTypes.array,
  error: PropTypes.string,
};

export async function getServerSideProps() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  try {
    const favResponse = await api.get("/favourites");
    const hotDealsResponse = await api.get("hot-deals");

    return {
      props: {
        favData: favResponse.data || null,
        hotDealsData: hotDealsResponse.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;
