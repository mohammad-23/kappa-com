import styled from "styled-components";
const Register = () => {
  return (
    <RegisterContainer>
      <RegisterTitle>
        As KappaCom Insider, shop with 20% off always!*
      </RegisterTitle>
      <RegisterDescription>
        Not an insider? Sign up at checkout to recieve offer today.
      </RegisterDescription>
      <RegisterDescription>
        Offer valid on full price items.
      </RegisterDescription>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  background-color: ${(props) => props.theme.primary};
  height: 17.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.heroText};
`;

const RegisterTitle = styled.h1``;

const RegisterDescription = styled.p`
margin:0;
`;

export default Register;
