import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";

import { Fragment } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "../utils";
import Auth from "../components/Auth";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyApp = ({ Component, pageProps }) => (
  <Fragment>
    <GlobalStyle />
    <ToastContainer />
    <ThemeProvider theme={theme}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ThemeProvider>
  </Fragment>
);

MyApp.defaultProps = {
  Component: () => {},
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default MyApp;
