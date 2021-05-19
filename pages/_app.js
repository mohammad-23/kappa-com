import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "../utils";
import Auth from "../components/Auth";
import ProductsController from "../components/ProductsController";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyApp = ({ Component, pageProps, router }) => (
  <AppContainer>
    <GlobalStyle />
    <ToastContainer />
    <ThemeProvider theme={theme}>
      <Auth>
        {router.pathname === "/products" ? (
          <ProductsController>
            <Component {...pageProps} />
          </ProductsController>
        ) : (
          <Component {...pageProps} />
        )}
      </Auth>
    </ThemeProvider>
  </AppContainer>
);

MyApp.defaultProps = {
  Component: () => {},
  pageProps: {},
  router: {},
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default MyApp;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;
