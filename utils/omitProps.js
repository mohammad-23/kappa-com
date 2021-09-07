/* eslint-disable react/display-name */
import React from "react";
import omit from "lodash/omit";

const omitProps = (component, propsToOmit = []) => (props) =>
  React.createElement(component, omit(props, propsToOmit));

export default omitProps;
