/* eslint-disable camelcase */
import React, { useState, useContext, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Form from "../Form";
import AuthContext from "../../contexts/AuthContext";
import { addressConfig, ADD_NEW_ADDRESS } from "../../utils/constants";
import { Button, Divider, Modal, TextField } from "../../styles/UIKit";

const AddNewAddress = ({
  isModalOpen,
  closeModal,
  addNewAddress,
  loading,
  chooseAddress,
}) => {
  const [showForm, setShowForm] = useState(false);

  const form = useRef();
  const { user } = useContext(AuthContext);

  const toggleContentState = useCallback(() =>
    setShowForm((prevState) => !prevState)
  );

  const onFormSubmit = () => {
    const data = form.current.getData();

    addNewAddress(data);
  };

  return (
    <Modal isOpen={isModalOpen.isOpen} closeModal={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>
        {ADD_NEW_ADDRESS}
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
              <Form ref={form} config={addressConfig} onSubmit={onFormSubmit} />
              <Button
                size="sm"
                onClick={onFormSubmit}
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

AddNewAddress.defaultProps = {
  isModalOpen: false,
  closeModal: () => {},
  addNewAddress: () => {},
  chooseAddress: () => {},
  loading: false,
};

AddNewAddress.propTypes = {
  isModalOpen: PropTypes.shape({
    isOpen: PropTypes.bool,
  }),
  closeModal: PropTypes.func,
  addNewAddress: PropTypes.func,
  chooseAddress: PropTypes.func,
  loading: PropTypes.bool,
};

export default AddNewAddress;

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

const AddressesContainer = styled.div`
  cursor: pointer;

  & > div {
    :hover {
      opacity: 0.7;
    }
  }
`;
