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
import { userInfoConfig, changePasswordConfig } from "../utils/constants";
import { Button, Spinner, Table, TextField, Modal } from "../styles/UIKit";

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

const ChangePasswordModal = ({ isModalOpen, closeModal }) => {
  const [loading, setLoading] = useState(null);

  const api = useApi();
  const form = useRef();

  const onFormSubmit = async () => {
    const {
      currentPassword,
      newPassword,
      confirm_password,
    } = form.current.getData();

    if (newPassword !== confirm_password) {
      toast.error("Passwords don't match!");
    } else {
      try {
        setLoading(false);

        await api.post("/users/change-password", {
          currentPassword,
          newPassword,
        });

        setLoading(false);
        toast.success("Password changed successfully!");
        closeModal();
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message || error.message);
      }
    }
  };

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>
        Change Password
      </Modal.Header>
      <Modal.Content style={{ margin: "0 0 2em" }}>
        <Form
          ref={form}
          onSubmit={onFormSubmit}
          config={changePasswordConfig}
        />
        <Button onClick={onFormSubmit} disabled={loading} loading={loading}>
          Save
        </Button>
      </Modal.Content>
    </Modal>
  );
};

const UserDetails = () => {
  const [loading, setLoading] = useState(null);
  const [modalState, setModalState] = useState(null);

  const api = useApi();
  const { user, updateUserInfo } = useContext(AuthContext);

  const makeAddressDefault = async (address) => {
    try {
      setLoading(address._id);

      const response = await api.put("/users", {
        address: { ...address, is_default: true },
      });

      updateUserInfo(response.data.user);
    } catch (error) {
      toast.error("An error occurred! Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const closeModal = () => {
    setModalState(null);
  };

  const renderTag = (address) => {
    const { is_default } = address;

    if (is_default) {
      return (
        <DefaultAddress>
          <TextField margin="0" color="white" weight="bold">
            Default
          </TextField>
        </DefaultAddress>
      );
    }

    return (
      <TextField
        margin="0"
        weight="bold"
        color="success"
        style={{ cursor: "pointer" }}
        onClick={() => {
          makeAddressDefault(address);
        }}
      >
        {loading === address._id ? (
          <LoaderContainer style={{ margin: "0 0 0 3em" }}>
            <Spinner />
          </LoaderContainer>
        ) : (
          "Make Default"
        )}
      </TextField>
    );
  };

  const renderAddressActions = (address) => (
    <ActionsContainer>
      <TextField weight="bold" margin="0" color="primary">
        EDIT
      </TextField>
      <TextField weight="bold" margin="0" color="failure">
        REMOVE
      </TextField>
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
            <TableCell>{renderAddressActions()}</TableCell>
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
              <TextField size="0.75em" margin="0" weight="700">
                {user.email}
              </TextField>
              <TextField size="0.75em" margin="0" weight="700">
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
                setModalState("change-password");
              }}
            >
              Change Password
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setModalState("edit-user");
              }}
            >
              Edit Profile
            </Button>
          </UserActions>
        </ProfileHeader>
        <AddressesContainer>
          <TextField weight="bold" size="1.5em">
            Addresses
          </TextField>
          {renderAddresses()}
        </AddressesContainer>
      </Content>
      <Footer />
      {modalState === "edit-user" ? (
        <EditUserInfoModal
          isModalOpen={modalState === "edit-user"}
          closeModal={closeModal}
        />
      ) : null}
      {modalState === "change-password" ? (
        <ChangePasswordModal
          isModalOpen={modalState === "change-password"}
          closeModal={closeModal}
        />
      ) : null}
    </React.Fragment>
  );
};

ChangePasswordModal.defaultProps = {
  isModalOpen: false,
  closeModal: () => {},
};

ChangePasswordModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

EditUserInfoModal.defaultProps = {
  isModalOpen: false,
  closeModal: () => {},
};

EditUserInfoModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
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
`;

const LoaderContainer = styled.div``;
