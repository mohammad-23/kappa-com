import styled from "styled-components";

import shoes from "../../assets/images/jordan1.jpg";

const ProductCard = () => (
  <Container>
    <Card>
      <Image src={shoes} />
    </Card>
    <ProductInfo>
      <ProductName>Greta White Midi Dress</ProductName>
      <ProductPrice>$59.99</ProductPrice>
    </ProductInfo>
  </Container>
);

export default ProductCard;

const Container = styled.div`
  display: grid;
  text-align: center;
  margin: 0 0 1em 0;
`;

const Card = styled.div`
  height: 200px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  border: 0.5px solid ${(props) => props.theme.background};
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const ProductInfo = styled.div``;

const ProductName = styled.div`
  font-size: 16px;
  margin: auto;
  margin-bottom: 0.25em;
  cursor: pointer;
  width: fit-content;

  :hover {
    color: ${(props) => props.theme.textSecondary};
  }
`;

const ProductPrice = styled.div`
  color: ${(props) => props.theme.primary};
  font-weight: 700;
  cursor: pointer;
  width: fit-content;
  margin: auto;

  :hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;
