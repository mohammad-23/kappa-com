import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UIBUtton from "../styles/UIKit/Button";
import PaymentCompleteConfig from "../config/PaymentCompleteConfig";

export default class PaymentStatus extends Component {
  static async getInitialProps({ query }) {
    const status = query.status;

    return {
      status,
    };
  }

  render() {
    const status = this.props.status ?? "success";

    return (
      <React.Fragment>
        <Header />
        <PaymentStatusContainer>
          {PaymentCompleteConfig[status].icon}
          <PaymentStatusTitle>
            {PaymentCompleteConfig[status].title}
          </PaymentStatusTitle>
          <PaymentStatusMessage>
            {PaymentCompleteConfig[status].message}
          </PaymentStatusMessage>
          {status === "success" ? <Button>CONTINUE SHOPPING</Button> : ""}
        </PaymentStatusContainer>
        <Footer />
      </React.Fragment>
    );
  }
}

PaymentStatus.propTypes = {
  status: PropTypes.string,
};

const PaymentStatusContainer = styled.div`
  height: 50rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const PaymentStatusTitle = styled.h1`
  font-size: 4rem;
  margin: 2rem;
`;

const PaymentStatusMessage = styled.p`
  font-size: 1.8rem;
  margin: 2rem;
  width: 50%;
  text-align: center;
`;

const Button = styled(UIBUtton)`
  padding: 1rem 8rem 1rem 8rem;
  font-size: 1.5rem;
  margin: 2rem;
`;
