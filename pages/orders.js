import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthContext from "../contexts/AuthContext";
import { getStatusColor, useApi, getFormatterDate } from "../utils";
import { TextField, Table, Pagination, Spinner } from "../styles/UIKit";

const { TableBody, TableCell, TableHead, TableHeaderCell, TableRow } = Table;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8,
  });

  const api = useApi();
  const router = useRouter();
  const { authToken } = useContext(AuthContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/orders");

      setOrders(data.orders);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authToken) {
      router.push({ pathname: "/" });
    } else {
      fetchOrders();
    }
  }, []);

  const onNextClick = () => {
    const updatedPageNumber = pagination.currentPage + 1;

    setPagination((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
    }));
  };

  const onPreviousClick = () => {
    const updatedPageNumber = pagination.currentPage - 1;

    setPagination((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
    }));
  };

  const onPageClick = ({ clickedPage }) => {
    const updatedPageNumber = clickedPage;

    setPagination((prevState) => ({
      ...prevState,
      currentPage: updatedPageNumber,
    }));
  };

  const renderTag = (status) => (
    <TextField
      size="0.9em"
      margin="0"
      weight="bold"
      color={getStatusColor(status)}
      style={{ cursor: "pointer", width: "fit-content" }}
    >
      {status.toUpperCase()}
    </TextField>
  );

  const renderAddress = ({ address, country, city }) =>
    `${address}, ${country}, ${city}`;

  const renderOrders = () => (
    <Table basic style={{ margin: "2em 0 0" }}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Order Date</TableHeaderCell>
          <TableHeaderCell>Address</TableHeaderCell>
          <TableHeaderCell>Items</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Payment Status</TableHeaderCell>
          <TableHeaderCell>Amount Paid</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <TextField margin="0">
                {getFormatterDate(item.createDate)}
              </TextField>
            </TableCell>
            <TableCell>{renderAddress(item.shipping_address)}</TableCell>
            <TableCell>{item.items.length}</TableCell>
            <TableCell>{renderTag(item.status)}</TableCell>
            <TableCell>{renderTag(item.payment.status)}</TableCell>
            <TableCell>${item.total_price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <React.Fragment>
      <Header />
      <ContentContainer>
        <Breadcrumbs>
          <TextField size="1em" color="textSecondary" weight={600}>
            USER
          </TextField>
          /
          <TextField size="1em" color="textPrimary" weight={600}>
            ORDER HISTORY
          </TextField>
        </Breadcrumbs>
        {(() => {
          if (loading) {
            return (
              <LoaderContainer>
                <Spinner />
              </LoaderContainer>
            );
          }

          if (!orders.length) {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField align="center">No orders yet!</TextField>
              </div>
            );
          }

          return renderOrders();
        })()}
      </ContentContainer>
      {orders.length ? (
        <Pagination
          totalPages={Math.ceil(orders.length / pagination.limit)}
          currentPage={pagination.currentPage}
          siblingRange={1}
          onPageClick={onPageClick}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
        />
      ) : null}
      <Footer />
    </React.Fragment>
  );
};

export default Orders;

const ContentContainer = styled.div`
  min-height: 50%;
  padding: 2em;
  display: grid;
  grid-template-rows: 0.1fr 0.5fr;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  & > * {
    font-family: "PT Sans Caption";
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1em;
`;
