import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import styled from "styled-components";

import Form from "../Form";
import AuthContext from "../../contexts/AuthContext";
import { Button, Divider } from "../../styles/UIKit";
import { userLoginConfig } from "../../utils/constants";

const LoginModal = ({ closeModal, isOpen }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(null);
  const [authStep, setAuthStep] = useState("LOGIN");

  const form = useRef();

  const { isUserRegistered, signInWithEmailPassword, signUp } = useContext(
    AuthContext
  );

  useEffect(() => {
    setUser(null);
    setEmail(null);
    setAuthStep("LOGIN");
  }, [isOpen]);

  const resetStateAndClose = () => {
    closeModal();
  };

  const checkUserExists = async (event) => {
    const { email } = form.current.getData();

    if (email.length) {
      setLoading("IS_USER_REGISTERED");

      const registeredUser = await isUserRegistered(email);

      if (registeredUser) {
        setUser(registeredUser);
        setEmail(email);
      }

      setLoading(null);
    }
  };

  const submitWithPassword = async () => {
    const { password } = form.current.getData();

    setLoading("LOGIN_WITH_PASSWORD");

    const isSignInSuccessfull = await signInWithEmailPassword({
      email,
      password,
    });

    if (!isSignInSuccessfull) {
      setLoading(null);
    }
  };

  const registerUser = async () => {
    const data = form.current.getData();

    if (data) {
      const { name, password, number, email } = data;

      if (password.match(/^.{8,}$/)) {
        setLoading("SIGN_UP");

        await signUp({ name, email, password, number });
      } else {
        toast.warning("Password must have atleast 8 characters.");
      }

      setLoading(null);
    }
  };

  const renderModalHeader = () => {
    if (authStep === "LOGIN") {
      return "Login to Continue";
    }

    return "Signup";
  };

  const renderAuthStepForm = () => {
    if (authStep === "LOGIN") {
      setAuthStep("SIGNUP");
    } else {
      setAuthStep("LOGIN");
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClick={resetStateAndClose}>
      <ModalMain onClick={(event) => event.stopPropagation()}>
        <ModalHeader>{renderModalHeader()}</ModalHeader>
        <ModalContent>
          <Button size="sm">Signin with Google</Button>
          <Divider>OR</Divider>
          {(() => {
            if (authStep === "LOGIN") {
              if (!user) {
                return (
                  <React.Fragment>
                    <Form
                      ref={form}
                      config={[
                        {
                          id: "email",
                          type: "email",
                          label: "Email",
                          required: true,
                        },
                      ]}
                      onSubmit={checkUserExists}
                    />
                    <Button
                      size="sm"
                      onClick={checkUserExists}
                      disabled={loading === "IS_USER_REGISTERED"}
                      loading={loading === "IS_USER_REGISTERED"}
                    >
                      Continue
                    </Button>
                  </React.Fragment>
                );
              }

              if (user) {
                return (
                  <React.Fragment>
                    <Form
                      ref={form}
                      config={[
                        {
                          id: "password",
                          type: "password",
                          label: "Password",
                          required: true,
                        },
                      ]}
                      onSubmit={submitWithPassword}
                    />
                    <Button
                      size="sm"
                      onClick={submitWithPassword}
                      disabled={loading === "LOGIN_WITH_PASSWORD"}
                    >
                      Login
                    </Button>
                  </React.Fragment>
                );
              }
            }

            return (
              <React.Fragment>
                <Form
                  ref={form}
                  config={userLoginConfig}
                  onSubmit={registerUser}
                />
                <Button
                  size="sm"
                  onClick={registerUser}
                  disabled={loading === "SIGNUP"}
                >
                  Signup
                </Button>
              </React.Fragment>
            );
          })()}
          <SignupMessage onClick={renderAuthStepForm}>
            {authStep === "LOGIN"
              ? "Not a user? Create Account"
              : "Login to existing account"}
          </SignupMessage>
        </ModalContent>
      </ModalMain>
    </ModalContainer>
  );
};

LoginModal.defaultProps = {
  closeModal: () => {},
  isOpen: false,
};

LoginModal.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default LoginModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  user-select: none;
  will-change: opacity;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.isOpen ? "block" : "none")};

  animation-fill-mode: both;
  animation-duration: 0.5s;
  transition: background-color 0.5s linear;
`;

const ModalMain = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  display: grid;
  z-index: 1001;
  min-height: 50%;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  width: 40%;
  max-height: 65%;
  background-color: #fff;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: block;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ModalHeader = styled.h2`
  margin: 1rem 1rem 2.5rem;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const SignupMessage = styled.div`
  text-align: center;
  cursor: pointer;
  margin: 10px 0;
  font-size: 14px;
  color: ${(props) => props.theme.primary};

  :hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;
