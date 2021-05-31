import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import { Button } from "../styles/UIKit";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { postCheckoutConfig } from "../config";

const PaymentStatus = () => {
  const { query } = useRouter();

  return (
    <React.Fragment>
      <Header />
      <PaymentStatusContainer>
        {postCheckoutConfig[query.status]?.icon}
        <PaymentStatusTitle>
          {postCheckoutConfig[query.status]?.title}
        </PaymentStatusTitle>
        <PaymentStatusMessage>
          {postCheckoutConfig[query.status]?.message}
        </PaymentStatusMessage>
        {query.status === "success" ? (
          <Link href="/products">
            <div>
              <Button size="sm">CONTINUE SHOPPING</Button>
            </div>
          </Link>
        ) : (
          ""
        )}
      </PaymentStatusContainer>
      <Footer />
    </React.Fragment>
  );
};

PaymentStatus.propTypes = {
  status: PropTypes.string,
};

export default PaymentStatus;

const PaymentStatusContainer = styled.div`
  height: 55%;
  text-align: center;
  margin: 3em 0 0;
`;

const PaymentStatusTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem 0;
`;

const PaymentStatusMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem 0;
  text-align: center;
`;
