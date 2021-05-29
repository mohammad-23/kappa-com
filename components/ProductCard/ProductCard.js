import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";

import { Button } from "../../styles/UIKit";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const ProductCard = ({
  name,
  price,
  media,
  _id,
  hideInfo,
  hoverable,
  addToCart,
}) => {
  const { user, deleteWishlistItem, updateUserInfo } = useContext(AuthContext);

  const checkIsWishlisted = () => {
    const isWishlisted = user.wishlist.findIndex((item) => item._id === _id);

    return isWishlisted >= 0;
  };

  return (
    <Link href={`/products/${_id}`}>
      <Container>
        <Card>
          <StyledImage src={media.source} />
          <WishlistActionContainer
            className="drawer"
            onClick={(event) => {
              event.stopPropagation();

              if (checkIsWishlisted) {
                deleteWishlistItem(_id);
              } else {
                updateUserInfo({ wishlist: _id });
              }
            }}
            isWishlisted={checkIsWishlisted()}
          >
            <FiHeart />
          </WishlistActionContainer>
          {hoverable ? (
            <HoverableContainer
              className="drawer"
              onClick={(event) => event.stopPropagation()}
            >
              <Button onClick={addToCart}>Add To Cart</Button>
            </HoverableContainer>
          ) : null}
        </Card>
        {hideInfo ? null : (
          <div>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price.formatted_with_symbol}</ProductPrice>
          </div>
        )}
      </Container>
    </Link>
  );
};

ProductCard.defaultProps = {
  _id: "",
  name: "",
  price: {},
  media: {},
  hideInfo: false,
  hoverable: false,
  addToCart: () => {},
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
  hideInfo: PropTypes.bool,
  hoverable: PropTypes.bool,
  addToCart: PropTypes.func,
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

  :hover {
    .drawer {
      visibility: visible;
      opacity: 1;
    }
  }
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

const HoverableContainer = styled.div`
  margin: 0 auto;
  position: relative;
  bottom: 100px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s linear;
  z-index: 999;
`;

const WishlistActionContainer = styled.div`
  position: relative;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s linear;
  z-index: 999;
  bottom: 300px;
  width: fit-content;
  margin: auto 1em auto auto;
  border-radius: 50%;
  padding: 0.5em;
  height: 1.2em;
  width: 1.2em;
  background-color: ${(props) =>
    props.isWishlisted ? props.theme.primary : props.theme.white};

  svg {
    ${(props) => {
      if (props.isWishlisted) {
        return {
          fill: props.theme.white,
          stroke: props.theme.white,
        };
      }

      return {
        fill: props.theme.white,
        stroke: props.theme.textPrimary,
      };
    }};
  }
`;
