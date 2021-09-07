import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";

import { SliderRail, Handle, Track } from "./SliderComponents";

class UISlider extends Component {
  constructor(props) {
    super(props);

    const { domain, min, max } = props;

    this.state = {
      domain: domain,
      values: [min, max],
      reversed: false,
    };
  }

  static defaultProps = {
    domain: [0, 0],
    min: 0,
    max: 0,
    maxPrice: 0,
    onValuesChange: () => {},
  };

  static propTypes = {
    domain: PropTypes.arrayOf(PropTypes.number),
    min: PropTypes.number,
    max: PropTypes.number,
    maxPrice: PropTypes.number,
    onValuesChange: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    const prevValues = { min: prevProps.min, max: prevProps.max };
    const newValues = { min: this.props.min, max: this.props.max };

    if (!isEqual(prevValues, newValues)) {
      const { min, max } = this.props;

      this.setState({ values: [min, max] });
    }
  }

  onChange = (values) => {
    this.setState({ values }, () => {
      this.props.onValuesChange(values);
    });
  };

  // onUpdate = (values) => {
  // this.setState({ values }, () => {
  //   this.props.onValuesChange(values);
  // });
  // };

  render() {
    const {
      state: { domain, values, reversed },
    } = this;

    return (
      <SliderContainer>
        <StyledSlider
          mode={1}
          step={5}
          domain={domain}
          reversed={reversed}
          onChange={this.onChange}
          // onUpdate={this.onUpdate}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div>
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </StyledSlider>
      </SliderContainer>
    );
  }
}

export default UISlider;

const SliderContainer = styled.div`
  min-height: 35px;
  margin: 0 0.5em;
`;

const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  top: 1em;
  bottom: 1.5em;
`;
