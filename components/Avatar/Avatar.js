import React, { useContext } from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";
import AuthContext from "../../contexts/AuthContext";

const Avatar = ({ circular, size, ...restProps }) => {
  const { user } = useContext(AuthContext);

  if (user.picture?.length) {
    return (
      <Container circular={circular} size={size} {...restProps}>
        <Image src={user.picture} />
      </Container>
    );
  }

  return (
    <Container circular={circular} size={size} {...restProps}>
      <span>{(user.name || user.email)[0].toUpperCase()}</span>
    </Container>
  );
};

Avatar.propTypes = {
  circular: PropTypes.bool,
  size: PropTypes.oneOf(["mini", "small", "medium"]),
};

Avatar.defaultProps = {
  circular: false,
  size: "small",
};

export default Avatar;

const containerStyle = css`
  ${(props) => {
    let avatarSize = 2.25;
    let fontSize = 1;

    if (props.size === "mini") {
      avatarSize = 1.75;
      fontSize = 0.9;
    } else if (props.size === "small") {
      avatarSize = 2.25;
      fontSize = 1;
    } else if (props.size === "medium") {
      avatarSize = 4;
      fontSize = 2;
    }

    return css`
      width: ${avatarSize}rem;
      height: ${avatarSize}rem;
      min-width: ${avatarSize}rem;
      min-height: ${avatarSize}rem;
      font-size: ${fontSize}em !important;
    `;
  }}
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.primary} !important;
  cursor: pointer;

  &&&& {
    & * {
      color: ${(props) => props.theme.background}
  }

  border-radius: ${(props) => (props.circular ? "50%" : "0.1em")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  overflow: hidden;

  ${containerStyle};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
