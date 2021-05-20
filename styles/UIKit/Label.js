import styled from "styled-components";

const Label = styled.div`
  font-size: 12px;
  text-align: left;
  margin: 0 0 0.5rem 0.2rem;
  color: ${(props) =>
    props.error ? props.theme.failure : props.theme.textPrimary};
`;

export default Label;
