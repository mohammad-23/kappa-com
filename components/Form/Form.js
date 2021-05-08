import React, { Component } from "react";
import PropTypes from "prop-types";
import find from "lodash/find";
import validator from "validator";
import isEqual from "lodash/isEqual";
import styled from "styled-components";

import { Input } from "../../styles/UIKit";

class Form extends Component {
  static propTypes = {
    config: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    config: [],
    onSubmit: () => {},
  };

  getInitialStates = () => {
    const states = {
      errors: {},
      fields: {},
    };
    const { config } = this.props;

    config.forEach((item) => {
      if (
        ["email", "string", "text", "number", "password"].includes(item.type)
      ) {
        states.fields[item.id] = item.initialValue || "";
      } else {
        states.fields[item.id] = item.initialValue || null;
      }
      states.errors[item.id] = null;
    });

    return states;
  };

  state = this.getInitialStates();

  componentDidUpdate(prevProps) {
    const { config } = this.props;
    const { config: prevConfig } = prevProps;

    if (!isEqual(prevConfig, config)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(this.getInitialStates());
    }
  }

  componentWillUnmount() {
    this.setState(this.getInitialStates());
  }

  onEnter = () => {
    const data = this.getData();

    if (data) {
      const { onSubmit } = this.props;

      onSubmit(data);
    }
  };

  renderFields = () => {
    const { config } = this.props;
    const { errors } = this.state;

    const fields = config.map((item) => {
      if (item.invisible) {
        if (typeof item.invisible === "function") {
          if (item.invisible(this.state)) {
            return null;
          }
        } else if (item.invisible) {
          return null;
        }
      }

      if (["string", "email", "number", "password"].includes(item.type)) {
        const inputType = ["email", "string"].includes(item.type)
          ? "text"
          : item.type;

        return (
          <InputField key={item.id}>
            <Label required={item.required}>{item.label}</Label>
            <Input
              fluid
              value={this.state.fields[item.id] || ""}
              onChange={({ target: { value } }) => {
                this.updateField(item.id, value);
              }}
              placeholder={item.placeholder}
              type={inputType}
            />
            {errors[item.id] && <Label error>{errors[item.id]}</Label>}
          </InputField>
        );
      }

      return null;
    });

    return <React.Fragment>{fields}</React.Fragment>;
  };

  updateField = (fieldName, value) => {
    this.setState((state) => ({
      fields: {
        ...state.fields,
        [fieldName]: value,
      },
      errors: {
        ...state.errors,
        [fieldName]: null,
      },
    }));
  };

  getData = () => {
    const { valid, errors } = this.validate();

    if (valid) {
      const { fields } = this.state;
      const { config } = this.props;

      const validatedData = Object.keys(fields).reduce((acc, key) => {
        const item = find(config, { id: key });

        if (item.type === "number") {
          const number = Number.parseFloat(fields[key]);

          acc[key] = !Number.isNaN(number) ? number : null;
        } else {
          acc[key] = fields[key];
        }

        return acc;
      }, {});

      return validatedData;
    }

    this.setState({ errors });

    return null;
  };

  validate = () => {
    const errors = {};

    const { config } = this.props;

    config.forEach((item) => {
      let isItemRequired;

      if (item.required) {
        if (typeof item.required === "function") {
          isItemRequired = item.required(this.state.fields);
        } else {
          isItemRequired = true;
        }
      } else {
        isItemRequired = false;
      }

      let isItemInvisible;

      if (item.invisible) {
        if (typeof item.invisible === "function") {
          isItemInvisible = item.invisible(this.state.fields);
        } else {
          isItemInvisible = true;
        }
      } else {
        isItemInvisible = false;
      }

      if (isItemRequired && !this.state.fields[item.id]) {
        errors[item.id] = `${item.label} is required`;
        return;
      }

      if (
        !isItemInvisible &&
        item.type === "email" &&
        !validator.isEmail(this.state.fields[item.id])
      ) {
        errors[item.id] = "Invalid email";
      }

      if (item.type === "number") {
        if (
          item.required === true &&
          typeof this.state.fields[item.id] === "string" &&
          !validator.isNumeric(this.state.fields[item.id])
        ) {
          errors[item.id] = "Invalid number";
        } else if (
          item.minValue &&
          Number.parseFloat(this.state.fields[item.id]) < item.minValue
        ) {
          errors[
            item.id
          ] = `${item.label} cannot be less than ${item.minValue}`;
        } else if (
          item.maxValue &&
          Number.parseFloat(this.state.fields[item.id]) > item.maxValue
        ) {
          errors[
            item.id
          ] = `${item.label} cannot be more than ${item.maxValue}`;
        }
      }
    });

    const valid = Object.keys(errors).length === 0;

    return {
      errors,
      valid,
    };
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          console.log("submit");
          event.preventDefault();

          this.onEnter();
        }}
      >
        {this.renderFields()}
      </form>
    );
  }
}

export default Form;

const InputField = styled.div`
  width: 50%;
  margin: 0 auto 1.5rem;
`;

const Label = styled.div`
  font-size: 12px;
  text-align: left;
  margin: 0 0 0.5rem 0.2rem;
  color: ${(props) =>
    props.error ? props.theme.failure : props.theme.textPrimary};
`;
