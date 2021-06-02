import { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import get from "lodash/get";
import { toast } from "react-toastify";

import { Spinner } from "../../styles/UIKit";
import AuthContext from "../../contexts/AuthContext";
import styled from "styled-components";

class Auth extends Component {
  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    cart: {},
    user: null,
    authToken: "",
    verifyingAuth: true,
    loadingUserInfo: false,
    isLoginModalOpen: false,
  };

  api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  componentDidMount() {
    try {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        this.setState({ authToken, loadingUserInfo: true }, () => {
          this.fetchUserInfo();
        });
      }
    } catch (error) {
      this.setState({ user: null, authToken: null });
    } finally {
      this.setState({ verifyingAuth: false });
    }
  }

  toggleLoginModalState = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoginModalOpen: !prevState.isLoginModalOpen,
    }));
  };

  fetchUserInfo = async () => {
    const { authToken } = this.state;

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        authorization: authToken,
      },
    });

    try {
      this.setState({
        loadingUserInfo: true,
      });

      const { data } = await api.get("/user");

      if (data.user) {
        this.setState({ user: data.user }, async () => {
          await this.fetchUserCart();
        });
      }
    } catch (error) {
      const errorMessage = get(
        error,
        "response.data.message",
        "Something went wrong. Please try again"
      );

      toast.error(errorMessage);

      return false;
    } finally {
      this.setState({
        loadingUserInfo: false,
      });
    }
  };

  isUserRegistered = async (email) => {
    try {
      const { data } = await this.api.get(
        `/users?email=${email.toLowerCase()}`
      );

      return data;
    } catch (error) {
      const errorMessage = get(
        error,
        "response.data.message",
        "Something went wrong. Please try again"
      );

      toast.error(errorMessage);

      return null;
    }
  };

  signInWithEmailPassword = async ({ email, password }) => {
    try {
      const { data } = await this.api.post("/login", {
        email,
        password,
      });

      if (data) {
        this.setState({ authToken: data.token, user: data.user }, () => {
          localStorage.setItem("authToken", data.token);
          this.fetchUserCart();
        });

        toast.success("Login Successful!");

        return true;
      }

      return false;
    } catch (error) {
      const errorMessage = get(
        error,
        "response.data.message",
        "Something went wrong. Please try again"
      );

      toast.error(errorMessage);

      return false;
    }
  };

  signUp = async ({ name, email, password, number }) => {
    try {
      const { data } = await this.api.post("/register", {
        name,
        email,
        password,
        number,
      });

      if (data) {
        this.setState({ authToken: data.token, user: data.user });

        toast.success("Successful Registered!");

        return true;
      }
    } catch (error) {
      const errorMessage = get(
        error,
        "response.data.message",
        "Something went wrong. Please try again"
      );

      toast.error(errorMessage);

      return false;
    }
  };

  signOut = () => {
    this.setState({ user: null, cart: {} }, () => {
      localStorage.removeItem("authToken");
    });
  };

  updateUserInfo = async (updatedData) => {
    try {
      const response = await this.api.put(
        "/users",
        { ...updatedData },
        {
          headers: {
            authorization: this.state.authToken,
          },
        }
      );

      this.setState({ user: response.data.user });
    } catch (error) {
      toast.error(error.message);
    }
  };

  fetchUserCart = async () => {
    try {
      const { data } = await this.api.get("/cart", {
        headers: {
          authorization: this.state.authToken,
        },
      });

      this.setState({ cart: data.cart });
    } catch (error) {
      toast.error(error.message);
    }
  };

  addProductToCart = async (product, quantitySelected) => {
    const productData = { id: product, quantity: quantitySelected };

    try {
      const { data } = await this.api.put(
        "/cart",
        { product: productData },
        {
          headers: {
            authorization: this.state.authToken,
          },
        }
      );

      await this.deleteWishlistItem(product._id);

      this.setState({ cart: data.cart });
    } catch (error) {
      toast.error(error.message);
    }
  };

  deleteWishlistItem = async (productId) => {
    const isProductInWishlist = this.state.user.wishlist.find(
      (item) => item._id === productId
    );

    if (isProductInWishlist) {
      try {
        const { data: user } = await this.api.delete(
          `/users/wishlist/${productId}`,
          {
            headers: {
              authorization: this.state.authToken,
            },
          }
        );

        this.setState({ user: user.user });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  updateCart = (cart) => {
    this.setState({ cart });
  };

  render() {
    const {
      cart,
      user,
      authToken,
      verifyingAuth,
      loadingUserInfo,
      isLoginModalOpen,
    } = this.state;

    if (verifyingAuth || loadingUserInfo) {
      return (
        <LoaderContainer>
          <Spinner /> Loading
        </LoaderContainer>
      );
    }

    return (
      <AuthContext.Provider
        value={{
          user,
          cart,
          authToken,
          loadingUserInfo,
          isLoginModalOpen,
          signUp: this.signUp,
          signOut: this.signOut,
          updateCart: this.updateCart,
          updateUserInfo: this.updateUserInfo,
          addProductToCart: this.addProductToCart,
          isUserRegistered: this.isUserRegistered,
          deleteWishlistItem: this.deleteWishlistItem,
          toggleLoginModalState: this.toggleLoginModalState,
          signInWithEmailPassword: this.signInWithEmailPassword,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default Auth;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1em;
`;
