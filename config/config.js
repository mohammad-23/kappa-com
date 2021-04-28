const packageJson = require("../package.json");

const serverPort = process.env.PORT || 3000;

const completeConfig = {
  default: {
    serverPort,
    appSlug: "kappa-com",
    appVersion: packageJson.version,
    appName: "KappaCom",
    appTagline: "A Kappa Group E-Commerce Platform",
    appDescription: "KappaCom – A Kappa Group E-Commerce Platform",
    locale: "en_US",
    googleAnalyticsId: "",
    googleSiteVerification: false,
    themeColor: "",
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`,
    googleAnalyticsId: null,
  },

  production: {},
};

const config = {
  ...completeConfig.default,
  ...completeConfig[process.env.NODE_ENV],
};

export default config;
