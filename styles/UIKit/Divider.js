import styled from "styled-components";

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${(props) => props.margin || "2.5rem 1.5rem 1.5rem"};

  :before {
    content: "";
    flex: 1;
    border-bottom: 1px solid
      ${(props) =>
        props.color ? props.theme[props.color] : props.theme.textSecondary};
  }

  :after {
    content: "";
    flex: 1;
    border-bottom: 1px solid
      ${(props) =>
        props.color ? props.theme[props.color] : props.theme.textSecondary};
  }

  &:not(:empty)::before {
    margin-right: 1.5rem;
  }

  &:not(:empty)::after {
    margin-left: 1.5rem;
  }
`;

export default Divider;
