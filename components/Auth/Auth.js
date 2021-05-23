import { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import get from "lodash/get";
import { toast } from "react-toastify";

import AuthContext from "../../contexts/AuthContext";

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
  };

  api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  componentDidMount() {
    try {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        this.setState({ authToken }, () => {
          this.fetchUserInfo();
        });
      }
    } catch (error) {
      this.setState({ user: null, authToken: null });
    } finally {
      this.setState({ verifyingAuth: false });
    }
  }

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
        this.setState({ user: data.user }, () => {
          this.fetchUserCart();
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

  updateCart = async (cart) => {
    this.setState({ cart });
  };

  render() {
    const {
      authToken,
      user,
      verifyingAuth,
      loadingUserInfo,
      cart,
    } = this.state;

    if (verifyingAuth) {
      return <div>Loading....</div>;
    }

    return (
      <AuthContext.Provider
        value={{
          user,
          cart,
          authToken,
          loadingUserInfo,
          signUp: this.signUp,
          isUserRegistered: this.isUserRegistered,
          signInWithEmailPassword: this.signInWithEmailPassword,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default Auth;
