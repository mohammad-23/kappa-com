import styled from "styled-components";

const TextField = styled.div`
  font-size: ${(props) => props.size || "1em"};
  font-weight: ${(props) => props.weight || "normal"};
  color: ${(props) =>
    props.color ? props.theme[props.color] : props.theme.textPrimary};
  margin: ${(props) => props.margin || "0.5em 0"};
`;

export default TextField;
