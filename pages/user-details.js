/* eslint-disable camelcase */
import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";

import Form from "../components/Form";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import { getNormalizedAddress, useApi } from "../utils";
import { Button, Spinner, Table, TextField, Modal } from "../styles/UIKit";
import {
  EDIT_ADDRESS,
  EDIT_PROFILE,
  addressConfig,
  userInfoConfig,
  CHANGE_PASSWORD,
  ADD_NEW_ADDRESS,
  changePasswordConfig,
} from "../utils/constants";

const { TableBody, TableCell, TableHead, TableHeaderCell, TableRow } = Table;

const EditUserInfoModal = ({ isModalOpen, closeModal }) => {
  const [loading, setLoading] = useState(null);

  const form = useRef();
  const api = useApi();
  const { user, updateUserInfo } = useContext(AuthContext);

  const onFormSubmit = async () => {
    const data = form.current.getData();

    try {
      setLoading(true);
      const response = await api.put("/users", data);

      updateUserInfo(response.data.user);

      setLoading(false);
      toast.success(response.data.message);
      closeModal();
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>
        Edit Account Details
      </Modal.Header>
      <Modal.Content style={{ margin: "0 0 2em" }}>
        <Form
          ref={form}
          onSubmit={onFormSubmit}
          config={userInfoConfig.map((item) => ({
            ...item,
            initialValue: user[item.id],
          }))}
        />
        <Button onClick={onFormSubmit} disabled={loading} loading={loading}>
          Save
        </Button>
      </Modal.Content>
    </Modal>
  );
};

const EditModal = ({
  config,
  header,
  loading,
  closeModal,
  isModalOpen,
  onFormSubmit,
}) => {
  const form = useRef();

  const onSubmit = () => {
    const data = form.current.getData();

    onFormSubmit(data);
  };

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>{header}</Modal.Header>
      <Modal.Content style={{ margin: "0 0 2em" }}>
        <Form ref={form} onSubmit={onSubmit} config={config} />
        <Button
          size="sm"
          onClick={onSubmit}
          disabled={loading}
          loading={loading}
        >
          Save
        </Button>
      </Modal.Content>
    </Modal>
  );
};

const UserDetails = () => {
  const [loading, setLoading] = useState({ type: null, value: null });
  const [modalState, setModalState] = useState({
    isOpen: false,
    config: [],
    type: null,
  });

  const api = useApi();
  const { user, updateUserInfo } = useContext(AuthContext);

  const shouldShowLoader = ({ type, value }) => {
    if (loading.type === type && loading.value === value) {
      return true;
    }

    return false;
  };

  const makeAddressDefault = async (address) => {
    try {
      setLoading({ type: "tag", value: address._id });

      const response = await api.put("/users", {
        address: { ...address, is_default: true },
      });

      updateUserInfo(response.data.user);
    } catch (error) {
      toast.error("An error occurred! Please try again.");
    } finally {
      setLoading({ type: null, value: null });
    }
  };

  const removeAddress = (address) => async () => {
    try {
      setLoading({ type: "action", value: address._id });

      const { data } = await api.delete(`/users/address/${address._id}`);

      updateUserInfo(data.user);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    } finally {
      setLoading({ type: null, value: null });
    }
  };

  const editAddress = async (address) => {
    try {
      setLoading({ type: "address", value: address._id });

      const { data } = await api.put("/users", {
        address: { ...address, _id: modalState.id },
      });

      updateUserInfo(data.user);
      setLoading({ type: null, value: null });
      closeModal();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      setLoading({ type: null, value: null });
    }
  };

  const editUserInfo = async (formData) => {
    try {
      setLoading({ type: "user" });
      const response = await api.put("/users", formData);

      updateUserInfo(response.data.user);

      setLoading({ type: null, value: null });
      toast.success(response.data.message);
      closeModal();
    } catch (error) {
      setLoading({ type: null, value: null });
      toast.error(error.response?.data.message || error.message);
    }
  };

  const changePassword = async ({
    currentPassword,
    newPassword,
    confirm_password,
  }) => {
    if (newPassword !== confirm_password) {
      toast.error("Passwords don't match!");
    } else {
      try {
        setLoading({ type: "password" });

        await api.post("/users/change-password", {
          currentPassword,
          newPassword,
        });

        setLoading({ type: null, value: null });
        toast.success("Password changed successfully!");
        closeModal();
      } catch (error) {
        setLoading({ type: null, value: null });
        toast.error(error.response?.data.message || error.message);
      }
    }
  };

  const addNewAddress = async (data) => {
    try {
      setLoading({ type: "new-address" });

      const response = await api.put("/users", {
        address: { ...data },
      });

      updateUserInfo(response.data.user);
      closeModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading({ type: null, value: null });
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      config: [],
      type: null,
    });
  };

  const renderTag = (address) => {
    const { is_default } = address;

    if (is_default) {
      return (
        <DefaultAddress>
          <TextField size="0.9em" margin="0" color="white" weight="bold">
            Default
          </TextField>
        </DefaultAddress>
      );
    }

    return (
      <TextField
        size="0.9em"
        margin="0"
        weight="bold"
        color="success"
        style={{ cursor: "pointer", width: "fit-content" }}
        onClick={() => {
          makeAddressDefault(address);
        }}
      >
        {shouldShowLoader({ type: "tag", value: address._id }) ? (
          <div style={{ margin: "0 0 0 3em" }}>
            <Spinner />
          </div>
        ) : (
          "Make Default"
        )}
      </TextField>
    );
  };

  const renderAddressActions = (address) => (
    <ActionsContainer>
      {shouldShowLoader({ type: "action", value: address._id }) ? (
        <div style={{ margin: "0 0 0 3em" }}>
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          <TextField
            size="0.9em"
            weight="bold"
            margin="0"
            color="primary"
            onClick={() => {
              setModalState({
                isOpen: true,
                config: addressConfig.map((item) => ({
                  ...item,
                  initialValue: address[item.id],
                })),
                header: EDIT_ADDRESS,
                type: "address",
                id: address._id,
              });
            }}
          >
            EDIT
          </TextField>
          <TextField
            size="0.9em"
            weight="bold"
            margin="0"
            color="failure"
            onClick={removeAddress(address)}
          >
            REMOVE
          </TextField>
        </React.Fragment>
      )}
    </ActionsContainer>
  );

  const renderAddresses = () => (
    <Table basic>
      <TableHead>
        <TableRow>
          <TableHeaderCell width="45%">Address</TableHeaderCell>
          <TableHeaderCell width="20%">Mobile</TableHeaderCell>
          <TableHeaderCell width="20%"></TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {user.addresses.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <TextField margin="0">{getNormalizedAddress(item)}</TextField>
            </TableCell>
            <TableCell>{item.phone_number}</TableCell>
            <TableCell>{renderTag(item)}</TableCell>
            <TableCell>{renderAddressActions(item)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <React.Fragment>
      <Header />
      <Content>
        <Breadcrumbs>
          <TextField size="1em" color="textSecondary" weight={600}>
            Home
          </TextField>
          &nbsp;/&nbsp;
          <TextField size="1em" color="textPrimary" weight={600}>
            Profile
          </TextField>
        </Breadcrumbs>
        <ProfileHeader>
          <div>
            <AvatarHolder>
              <Avatar size="medium" circular />

              <StyledCamera>
                <StyledIcon />
              </StyledCamera>
            </AvatarHolder>
          </div>
          <div>
            <TextField size="1.25em" margin="0">
              {user.name}
            </TextField>
            <UserSecondaryDetails>
              <TextField size="0.9em" margin="0" weight="700">
                {user.email}
              </TextField>
              <TextField size="0.9em" margin="0" weight="700">
                {user.number}
              </TextField>
            </UserSecondaryDetails>
          </div>
          <UserActions>
            <Button
              inverted
              size="sm"
              type="secondary"
              onClick={() => {
                setModalState({
                  isOpen: true,
                  type: "password",
                  config: changePasswordConfig,
                  header: CHANGE_PASSWORD,
                });
              }}
            >
              Change Password
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setModalState({
                  isOpen: true,
                  type: "user",
                  config: userInfoConfig.map((item) => ({
                    ...item,
                    initialValue: user[item.id],
                  })),
                  header: EDIT_PROFILE,
                });
              }}
            >
              Edit Profile
            </Button>
          </UserActions>
        </ProfileHeader>
        <AddressesContainer>
          <AddressHeader>
            <TextField weight="bold" size="1.5em">
              Addresses
            </TextField>
            <Button
              type="secondary"
              size="sm"
              onClick={() => {
                setModalState({
                  isOpen: true,
                  type: "new-address",
                  config: addressConfig,
                  header: ADD_NEW_ADDRESS,
                });
              }}
            >
              {ADD_NEW_ADDRESS}
            </Button>
          </AddressHeader>
          {renderAddresses()}
        </AddressesContainer>
      </Content>
      <Footer />
      <EditModal
        isModalOpen={modalState.isOpen}
        onFormSubmit={(formData) => {
          if (modalState.type === "user") {
            editUserInfo(formData);
          } else if (modalState.type === "password") {
            changePassword(formData);
          } else if (modalState.type === "address") {
            editAddress(formData);
          } else if (modalState.type === "new-address") {
            addNewAddress(formData);
          }
        }}
        loading={loading.type === modalState.type}
        header={modalState.header}
        config={modalState.config}
        closeModal={closeModal}
      />
    </React.Fragment>
  );
};

EditUserInfoModal.defaultProps = {
  isModalOpen: false,
  closeModal: () => {},
};

EditUserInfoModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

EditModal.defaultProps = {
  config: [],
  loading: false,
  isModalOpen: false,
  header: "Edit User",
  closeModal: () => {},
  onFormSubmit: () => {},
};

EditModal.propTypes = {
  config: PropTypes.array,
  loading: PropTypes.bool,
  header: PropTypes.string,
  closeModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  onFormSubmit: PropTypes.func,
};

export default UserDetails;

const flexStyle = css`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  padding: 2em;
  min-height: 75%;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;

  & > * {
    font-family: "PT Sans Caption";
  }
`;

const ProfileHeader = styled.div`
  display: grid;
  grid-template-columns: 5% 50% auto;
  align-items: flex-start;
  gap: 2em;
  margin: 1em 0;
`;

const AvatarHolder = styled.div`
  position: relative;
`;

const StyledCamera = styled.div`
  position: absolute;
  bottom: 0.5em;
  right: 0.4em;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  color: #fff;
`;

const StyledIcon = styled(FiCamera)`
  margin: 0 !important;
  color: ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.primary};
  cursor: pointer;
  border-radius: 10px;
`;

const UserActions = styled.div`
  ${flexStyle};
  justify-content: flex-end;
  gap: 1em;
`;

const AddressesContainer = styled.div`
  margin: 3em 0;
`;

const UserSecondaryDetails = styled.div`
  ${flexStyle};
  gap: 1em;
  margin: 0.5em 0;
`;

const DefaultAddress = styled.div`
  width: fit-content;
  background: ${(props) => props.theme.success};
  border-radius: 10px;
  padding: 0 0.75em;
  cursor: pointer;
`;

const ActionsContainer = styled.div`
  ${flexStyle};
  gap: 1em;

  & > * {
    cursor: pointer;
  }
`;

const AddressHeader = styled.div`
  ${flexStyle};
  justify-content: space-between;
`;
