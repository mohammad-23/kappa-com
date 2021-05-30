import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Divider from "../styles/UIKit/Divider";
import UIBUtton from "../styles/UIKit/Button";
import useApi from "../utils/useApi";
import CartConstants from "../config/CartConfig";

const Cart = () => {
  const api = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await api.get("cart");
      const {
        data: { items },
      } = data;

      setCartItems(items);
      setCartData(data.data);
    } catch (err) {
      toast.error("Cannot fetch cart data");
      console.log("Error while fetching cart data : ", err);
    }
  };

  const handleDeleteCartItem = (itemId) => {
    deleteCartItem(itemId);
  };

  const deleteCartItem = async (itemId) => {
    const newCartItems = cartItems.filter(
      (item) => item.product._id !== itemId
    );

    setCartItems(newCartItems);

    try {
      await api.delete(`cart/product/${itemId}`);
      toast.success("Deleted cart item successfully");
    } catch (err) {
      toast.error("Some error has occurred");
      console("Error while deleting cart item : ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <CartContainer hidden={cartItems.length === 0}>
        <CartTitleContainer>
          <FlexAdjuster>
            <EmptyBox />
          </FlexAdjuster>
          <FlexAdjuster>
            <EmptyBox />
          </FlexAdjuster>
          <FlexAdjuster>
            {" "}
            <CartHeading> {CartConstants.header.product} </CartHeading>
          </FlexAdjuster>
          <FlexAdjuster>
            <CartHeading> {CartConstants.header.price} </CartHeading>
          </FlexAdjuster>
          <FlexAdjuster>
            <CartHeading> {CartConstants.header.quantity} </CartHeading>
          </FlexAdjuster>
          <FlexAdjuster>
            <CartHeading> {CartConstants.header.total} </CartHeading>
          </FlexAdjuster>
        </CartTitleContainer>
        <CartDivider />
        {cartItems.map((cartItem) => (
          <div key={cartItem._id}>
            <CartContent>
              <FlexAdjuster>
                <CloseX
                  onClick={() => handleDeleteCartItem(cartItem.product._id)}
                >
                  {" "}
                  +{" "}
                </CloseX>
              </FlexAdjuster>
              <FlexAdjuster>
                <ImageBox src={cartItem.product.media.source} />
              </FlexAdjuster>
              <FlexAdjuster>
                {" "}
                <CartText> {cartItem.product.name}</CartText>
              </FlexAdjuster>
              <FlexAdjuster>
                <CartText>
                  {" "}
                  {cartItem.product.price.formatted_with_symbol}
                </CartText>
              </FlexAdjuster>
              <FlexAdjuster>
                <QuantityBox>{cartItem.quantity}</QuantityBox>
              </FlexAdjuster>
              <FlexAdjuster>
                <CartText> ${cartItem.total_price}</CartText>
              </FlexAdjuster>
            </CartContent>
            <CartDivider />
          </div>
        ))}
        <CartTotals>
          <CartTotalDivider />
          <CartTotalContainer>
            <CartHeading>{CartConstants.totals.total}</CartHeading>
            <CartText> ${cartData.total_price}</CartText>
          </CartTotalContainer>
          <CartTotalButton>
            {CartConstants.totals.checkoutButtonText}
          </CartTotalButton>
        </CartTotals>
      </CartContainer>

      <CartContainer hidden={cartItems.length > 0}>
        <h2> {CartConstants.cartEmptyConstant}</h2>
      </CartContainer>
      <Footer />
    </div>
  );
};

export default Cart;

const CartContainer = styled.div`
  margin-top: 5rem;
`;

const CartTitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CartHeading = styled.h2`
  margin: 0;
  font-weight: 500;
`;
const EmptyBox = styled.div`
  border: 1px solid #ffff;
  height: 1rem;
  width: 1rem;
`;

const CartText = styled.p`
  margin: 0;
`;

const QuantityBox = styled.div`
  border: 1px solid #ebebeb;
  height: 1rem;
  width: 1rem;
  text-align: center;
  padding: 1rem;
  transform: translateX(100%);
`;

const CartDivider = styled(Divider)`
  margin: 0.5rem;
`;

const CartTotalDivider = styled(Divider)`
  margin: 0rem;
`;

const CartContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FlexAdjuster = styled.div`
  width: 10rem;
  text-align: center;
`;

const CloseX = styled.p`
  color: #fb4e4e;
  font-size: 2rem;
  margin: 0;
  transform: rotateZ(45deg);
  cursor: pointer;
`;

const ImageBox = styled.img`
  border: 1px solid #ebebeb;
  height: 5rem;
  width: 5rem;
  text-align: center;

  background-color: #ebebeb;
`;

const CartTotals = styled.div`
  min-width: 33rem;
  height: 8.75rem;
  margin-top: 20rem;
  float: right;
  margin-right: 1rem;
`;

const CartTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartTotalButton = styled(UIBUtton)`
  margin: 1rem 0rem 1rem 0rem;
  background-color: ${(props) => props.theme.secondary};
  border-color: ${(props) => props.theme.secondary};
`;
