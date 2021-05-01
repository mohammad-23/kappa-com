import { useState } from "react";
import styled from "styled-components";

import { config } from "../config";
import { UIButtonPrimary, Toggle, UIInput } from "../styles";

const Home = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Container>
      <h1>{config.appName}</h1>
      <UIButtonPrimary>Continue</UIButtonPrimary>
      <br />
      <br />
      <UIButtonPrimary inverted>Login</UIButtonPrimary>
      <br />
      <br />
      <Toggle
        checked={checked}
        onToggle={() => setChecked((prevState) => !prevState)}
      />
      <br />
      <br />
      <UIInput width="35%" />
      <p>
        <em>{config.appTagline}</em>
      </p>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;
