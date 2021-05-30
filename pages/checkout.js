import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import AddNewAddress from "../components/AddNewAddress";
import { Button, Checkbox, Input, TextField } from "../styles/UIKit";

const Checkout = () => {
  const { cart, user, updateUserInfo } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [chosenAddress, setChosenAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    action: "change",
  });

  useEffect(() => {
    if (user) {
      const defaultAddress = user?.addresses.find((item) => item.is_default);

      setChosenAddress(defaultAddress);
    }
  }, []);

  const getNormalizedAddress = useCallback(() => {
    let addressToDisplay;

    if (chosenAddress) {
      addressToDisplay = chosenAddress;
    } else {
      const defaultAddress = user?.addresses.find((item) => item.is_default);

      addressToDisplay = defaultAddress;
    }

    const addressValues = [];

    for (const item in addressToDisplay) {
      if (!["_id", "is_default"].includes(item)) {
        addressValues.push(addressToDisplay[item]);
      }
    }

    return addressValues.join(", ");
  }, [chosenAddress]);

  const addNewAddress = async (data) => {
    try {
      setLoading(true);

      await updateUserInfo({ address: data });

      setIsModalOpen(false);

      const { addresses } = user;
      let updatedAddress = {};

      for (const address of addresses) {
        const isSame = Object.values(data).every((item) =>
          Object.values(address).includes(item)
        );

        if (isSame) {
          updatedAddress = { ...address };

          break;
        }
      }

      setChosenAddress(updatedAddress);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async () => {
    try {
      setLoading(true);

      await updateUserInfo({ address: { ...chosenAddress, is_default: true } });

      setChosenAddress((prevState) => ({
        ...prevState,
        is_default: true,
      }));
    } catch (error) {
      toast.error("An error occurred! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen({ isOpen: false, action: null });
  };

  const renderAddressContent = () => (
    <div>
      <h2>Choose Address</h2>
      <Card>
        {(() => {
          if (!user.addresses.length) {
            return (
              <React.Fragment>
                <StyledCard raised background="white">
                  <TextField>No Address Added!</TextField>
                </StyledCard>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsModalOpen({ isOpen: true, action: "first" });
                  }}
                >
                  Add an address
                </Button>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment>
              <ChangeAddress
                weight="500"
                color="primary"
                size="0.75em"
                onClick={() => {
                  setIsModalOpen({ isOpen: true, action: "change" });
                }}
              >
                Change
              </ChangeAddress>
              <StyledCard raised background="white">
                <Checkbox checked />
                <div>
                  <TextField align="left" margin="0" weight="500">
                    {user?.name}
                  </TextField>
                  <TextField align="left" margin="0" weight="500">
                    {getNormalizedAddress()}
                  </TextField>
                </div>
              </StyledCard>
              <Button
                size="sm"
                loading={loading}
                disabled={chosenAddress?.is_default || loading}
                onClick={setDefaultAddress}
              >
                Set as default address
              </Button>
            </React.Fragment>
          );
        })()}
      </Card>
    </div>
  );

  const renderNotesContent = () => (
    <div style={{ width: "75%" }}>
      <h3>Order Notes (optional)</h3>
      <Input
        fluid
        disabled
        placeholder="Notes about your order, e.g., special notes for delivery"
      />
    </div>
  );

  const renderCouponContent = () => (
    <CouponContainer>
      <Input placeholder="Enter Coupon Code" />
      <Button size="sm" disabled>
        Apply Coupon
      </Button>
    </CouponContainer>
  );

  const renderOrderSummary = () => (
    <div>
      <Card raised fluid compact>
        <OrderColumn>
          <TextField margin="0" weight="500">
            Subtotal
          </TextField>{" "}
          <TextField margin="0" weight="500">
            ${Number(cart.total_price).toFixed(2)}
          </TextField>
        </OrderColumn>
        <OrderColumn>
          <TextField margin="0" weight="500">
            Shipping
          </TextField>
          <TextField margin="0" weight="500">
            $0.00
          </TextField>
        </OrderColumn>
        <OrderColumn>
          <TextField margin="0" weight="500">
            Total
          </TextField>{" "}
          <TextField margin="0" weight="500">
            ${Number(cart.total_price).toFixed(2)}
          </TextField>
        </OrderColumn>
      </Card>
      <br />
      <Button type="secondary" size="sm" style={{ float: "right" }}>
        Place Order
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      <Header />
      <ContentContainer>
        <Breadcrumbs>
          <TextField size="1em" color="textSecondary" weight={600}>
            PRODUCTS
          </TextField>
          &nbsp;/&nbsp;
          <TextField size="1em" color="textPrimary" weight={600}>
            CHECKOUT
          </TextField>
        </Breadcrumbs>
        <Content>
          <div>
            {renderAddressContent()}
            {renderNotesContent()}
            {renderCouponContent()}
          </div>
          <div>
            <h2>Order Summary</h2>
            {renderOrderSummary()}
          </div>
        </Content>
      </ContentContainer>
      <Footer />
      <AddNewAddress
        loading={loading}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        addNewAddress={addNewAddress}
        chooseAddress={(address) => {
          setChosenAddress(address);
          closeModal();
        }}
      />
    </React.Fragment>
  );
};

export default Checkout;

const ContentContainer = styled.div`
  min-height: 75%;
  padding: 2em;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;

  & > * {
    font-family: "PT Sans Caption";
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
`;

const Card = styled.div`
  width: ${(props) => (props.fluid ? "100%" : "75%")};
  border: 1px solid ${(props) => props.theme.background};
  background-color: ${(props) =>
    props.theme[props.background] || props.theme.backgroundLight};
  padding: ${(props) => (props.compact ? "0em" : "1em 2em")};
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.raised ? "0px 2px 2px rgba(0, 0, 0, 0.25)" : "none"};
  text-align: ${(props) => props.align || "center"};
  margin: ${(props) => props.margin || "0"};
`;

const StyledCard = styled(Card)`
  width: calc(100% - 2em);
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
  margin: 1em 0;
`;

const ChangeAddress = styled(TextField)`
  cursor: pointer;
  text-align: right;

  :hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;

const CouponContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: initial;
  gap: 0.5em;
  margin: 4em 0;
`;

const OrderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em;
`;
