/* eslint-disable camelcase */
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { toast } from "react-toastify";

import { useApi } from "../utils";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { COUNTRIES } from "../utils/constants";
import AuthContext from "../contexts/AuthContext";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  TextField,
} from "../styles/UIKit";

const getAddressFormConfig = () => [
  {
    id: "country",
    type: "select",
    label: "Country",
    required: true,
    placeholder: "Select Country",
    options: COUNTRIES,
  },
  {
    id: "address",
    type: "string",
    label: "Street Address",
    required: true,
  },
  {
    id: "city",
    type: "string",
    label: "Town / City",
    required: true,
  },
  {
    id: "state",
    type: "string",
    label: "State / County",
    required: true,
  },
  {
    id: "pin_code",
    type: "string",
    label: "Postcode / ZIP",
    required: true,
  },
  {
    id: "phone_number",
    type: "string",
    label: "Phone Number",
    required: true,
  },
];

const AddressModal = ({
  isModalOpen,
  closeModal,
  addNewAddress,
  loading,
  form,
  chooseAddress,
}) => {
  const [showForm, setShowForm] = useState(false);

  const { user } = useContext(AuthContext);

  const toggleContentState = useCallback(() =>
    setShowForm((prevState) => !prevState)
  );

  return (
    <Modal isOpen={isModalOpen.isOpen} closeModal={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>
        Add New Address
      </Modal.Header>
      <Modal.Content style={{ margin: "0 0 2em" }}>
        <Button
          size="sm"
          inverted
          onClick={toggleContentState}
          style={{ margin: "0 0 2em" }}
        >
          {showForm ? "Add New Address" : "Choose a current Address"}
        </Button>
        <Divider margin="0.5em 1.5em 1.25em" color="background" />
        {(() => {
          if (showForm) {
            return user.addresses.map(({ phone_number, ...address }) => {
              const addressValues = [];

              for (const item in address) {
                if (!["_id", "is_default"].includes(item)) {
                  addressValues.push(address[item]);
                }
              }

              return (
                <AddressesContainer
                  key={address._id}
                  onClick={() => {
                    chooseAddress({ phone_number, ...address });
                  }}
                >
                  <Card margin="1em auto" align="left">
                    {addressValues.join(", ")}{" "}
                    <TextField>Phone Number: {phone_number}</TextField>
                  </Card>
                </AddressesContainer>
              );
            });
          }

          return (
            <React.Fragment>
              <Form
                ref={form}
                config={getAddressFormConfig()}
                onSubmit={addNewAddress}
              />
              <Button
                size="sm"
                onClick={addNewAddress}
                disabled={loading}
                loading={loading}
              >
                Continue
              </Button>
            </React.Fragment>
          );
        })()}
      </Modal.Content>
    </Modal>
  );
};

const Checkout = () => {
  const api = useApi();
  const form = useRef();
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

  const addNewAddress = async () => {
    try {
      setLoading(true);

      const data = form.current.getData();

      const response = await api.put("/users", {
        address: { ...data },
      });

      updateUserInfo(response.data.user);
      setIsModalOpen(false);

      const { addresses } = response.data.user;
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

      const response = await api.put("/users", {
        address: { ...chosenAddress, is_default: true },
      });

      setChosenAddress((prevState) => ({
        ...prevState,
        is_default: true,
      }));
      updateUserInfo(response.data.user);
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
      <AddressModal
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

AddressModal.defaultProps = {
  isModalOpen: false,
  closeModal: () => {},
  addNewAddress: () => {},
  chooseAddress: () => {},
  loading: false,
  form: null,
};

AddressModal.propTypes = {
  isModalOpen: PropTypes.shape({
    isOpen: PropTypes.bool,
  }),
  closeModal: PropTypes.func,
  addNewAddress: PropTypes.func,
  chooseAddress: PropTypes.func,
  loading: PropTypes.bool,
  form: PropTypes.shape({}),
};

export default Checkout;

const ContentContainer = styled.div`
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

const AddressesContainer = styled.div`
  cursor: pointer;

  & > div {
    :hover {
      opacity: 0.7;
    }
  }
`;
