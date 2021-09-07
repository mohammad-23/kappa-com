import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SliderRail = ({ getRailProps }) => (
  <React.Fragment>
    <OuterRail {...getRailProps()} />
    <InnerRail />
  </React.Fragment>
);

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => (
  <React.Fragment>
    <HandleContainer percent={percent} {...getHandleProps(id)} />
    <HandleSlider
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      percent={percent}
      disabled={disabled}
    />
  </React.Fragment>
);

const Track = ({ source, target, getTrackProps, disabled = false }) => (
  <StyledTrack
    source={source}
    disabled={disabled}
    target={target}
    {...getTrackProps()}
  />
);

SliderRail.defaultProps = {
  getRailProps: () => {},
};

SliderRail.propTypes = {
  getRailProps: PropTypes.func,
};

Handle.defaultProps = {
  domain: [],
  handle: {},
  disabled: false,
  getHandleProps: () => {},
};

Handle.propTypes = {
  domain: PropTypes.arrayOf(PropTypes.number),
  handle: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.number,
    percent: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  getHandleProps: PropTypes.func,
};

Track.defaultProps = {
  source: {},
  target: {},
  disabled: false,
  getTrackProps: () => {},
};

Track.propTypes = {
  source: PropTypes.shape({
    percent: PropTypes.number,
  }),
  target: PropTypes.shape({
    percent: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  getTrackProps: PropTypes.func,
};

export { SliderRail, Handle, Track };

const OuterRail = styled.div`
  position: absolute;
  width: 100%;
  height: 42px;
  transform: translate(0%, -50%);
  border-radius: 7px;
  cursor: pointer;
`;

const InnerRail = styled.div`
  position: absolute;
  width: 100%;
  height: 8px;
  transform: translate(0%, -50%);
  border-radius: 7px;
  pointer-events: none;
  background-color: ${(props) => props.theme.background};
`;

const HandleContainer = styled.div`
  left: ${(props) => props.percent}%;
  position: absolute;
  transform: translate(-50%, -50%);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  z-index: 5;
  width: 28px;
  height: 42px;
  cursor: pointer;
`;

const HandleSlider = styled.div`
  left: ${(props) => props.percent}%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.disabled ? "#666" : props.theme.primary};
`;

const StyledTrack = styled.div`
  position: absolute;
  transform: translate(0%, -50%);
  height: 8px;
  z-index: 1;
  background-color: ${(props) =>
    props.disabled ? "#999" : props.theme.background};
  border-radius: 7px;
  cursor: pointer;
  left: ${(props) => props.source.percent}%;
  width: ${(props) => props.target.percent - props.source.percent}%;
`;
