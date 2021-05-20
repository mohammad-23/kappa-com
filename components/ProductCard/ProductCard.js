import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

const ProductCard = ({ name, price, media, _id }) => (
  <Link href={`/products/${_id}`}>
    <Container>
      <Card>
        <StyledImage src={media.source} />
      </Card>
      <div>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price.formatted_with_symbol}</ProductPrice>
      </div>
    </Container>
  </Link>
);

ProductCard.defaultProps = {
  _id: "",
  name: "",
  price: {},
  media: {},
};

ProductCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.shape({
    formatted_with_symbol: PropTypes.string,
  }),
  media: PropTypes.shape({
    source: PropTypes.string,
  }),
};

export default ProductCard;

const Container = styled.div`
  text-align: center;
  margin: 0 0 1em 0;
`;

const Card = styled.div`
  height: 300px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  border: 0.5px solid ${(props) => props.theme.background};
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
`;

const ProductName = styled.div`
  font-size: 16px;
  margin: 0.25em auto;
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
