import "../styles/index.css";

import { Fragment } from "react";
import PropTypes from "prop-types";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "../utils";

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
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
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
