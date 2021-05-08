import PropTypes from "prop-types";
import styled from "styled-components";

const Toggle = ({ checked, onToggle, disabled }) => (
  <ToggleContainer>
    <input
      disabled={disabled}
      className="tgl tgl-light"
      id="cb1"
      type="checkbox"
      checked={checked}
      onChange={onToggle}
    />
    <label className="tgl-btn" htmlFor="cb1"></label>
  </ToggleContainer>
);

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  onToggle: () => {},
};

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Toggle;

const ToggleContainer = styled.div`
  .tgl {
    display: none;
  }

  .tgl,
  .tgl:after,
  .tgl:before,
  .tgl *,
  .tgl *:after,
  .tgl *:before,
  .tgl + .tgl-btn {
    box-sizing: border-box;
  }

  .tgl::selection,
  .tgl:after::selection,
  .tgl:before::selection,
  .tgl *::selection,
  .tgl *:after::selection,
  .tgl *:before::selection,
  .tgl + .tgl-btn::selection {
    background: none;
  }

  .tgl + .tgl-btn {
    outline: 0;
    display: block;
    ${(props) => {
      switch (props.size) {
        case "sm":
          return {
            width: "24px",
            height: "12px",
          };

        case "md":
          return {
            width: "36px",
            height: "18px",
          };

        case "lg":
          return {
            width: "48px",
            height: "24px",
          };

        case "xl":
          return {
            width: "54px",
            height: "27px",
          };

        default:
          return {
            width: "36px",
            height: "18px",
          };
      }
    }}

    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .tgl + .tgl-btn:after,
  .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }

  .tgl + .tgl-btn:after {
    left: 0;
  }

  .tgl + .tgl-btn:before {
    display: none;
  }

  .tgl:checked + .tgl-btn:after {
    left: 50%;
  }

  .tgl-light + .tgl-btn {
    background: #f0f0f0;
    border-radius: 2em;
    padding: 2px;
    transition: all 0.4s ease;
  }

  .tgl-light + .tgl-btn:after {
    border-radius: 50%;
    background: #fff;
    transition: all 0.2s ease;
  }

  .tgl-light:checked + .tgl-btn {
    background: ${(props) => props.theme.primary};
  }
`;
