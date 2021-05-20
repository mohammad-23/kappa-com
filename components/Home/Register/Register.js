import styled from "styled-components";

import {
  REGISTER_TITLE,
  REGISTER_TEXT1,
  REGISTER_TEXT2,
} from "../../../utils/constants";

const Register = () => (
  <RegisterContainer>
    <h1>{REGISTER_TITLE}</h1>
    <RegisterDescription>{REGISTER_TEXT1}</RegisterDescription>
    <RegisterDescription>{REGISTER_TEXT2}</RegisterDescription>
  </RegisterContainer>
);

export default Register;

const RegisterContainer = styled.div`
  background-color: ${(props) => props.theme.primary};
  height: 17.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.white};
`;

const RegisterDescription = styled.p`
  margin: 0;
`;
