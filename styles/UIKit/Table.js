import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const TableContext = React.createContext({
  basic: false,
});

const TableCell = ({ children, ...props }) => {
  const { basic } = useContext(TableContext);

  return (
    <StyledTableCell basic={basic} {...props}>
      {children}
    </StyledTableCell>
  );
};

const TableHeaderCell = (props) => {
  const { basic } = useContext(TableContext);

  return (
    <StyledTableHeaderCell basic={basic} {...props}>
      {props.children}
    </StyledTableHeaderCell>
  );
};

const TableHead = (props) => (
  <StyledTableHead>{props.children}</StyledTableHead>
);

const TableBody = (props) => (
  <StyledTableBody>{props.children}</StyledTableBody>
);

const TableRow = (props) => (
  <TableRowContainer>{props.children}</TableRowContainer>
);

const Table = ({ children, ...props }) => {
  const { basic } = props;

  return (
    <TableContext.Provider value={{ basic }}>
      <StyledTable {...props}>{children}</StyledTable>
    </TableContext.Provider>
  );
};

Table.TableHeaderCell = TableHeaderCell;
Table.TableCell = TableCell;
Table.TableHead = TableHead;
Table.TableBody = TableBody;
Table.TableRow = TableRow;

TableCell.defaultProps = {
  children: null,
};

TableCell.propTypes = {
  children: PropTypes.node,
};

TableHeaderCell.defaultProps = {
  children: null,
};

TableHeaderCell.propTypes = {
  children: PropTypes.node,
};

TableBody.defaultProps = {
  children: null,
};

TableBody.propTypes = {
  children: PropTypes.node,
};

TableHead.defaultProps = {
  children: null,
};

TableHead.propTypes = {
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: null,
};

TableRow.propTypes = {
  children: PropTypes.node,
};

Table.defaultProps = {
  children: null,
  basic: false,
};

Table.propTypes = {
  children: PropTypes.node,
  basic: PropTypes.bool,
};

export default Table;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledTableHead = styled.thead`
  tr {
    :hover {
      background-color: ${(props) => props.theme.white} !important;
    }
  }
`;

const StyledTableBody = styled.tbody``;

const TableRowContainer = styled.tr`
  :hover {
    background-color: ${(props) => props.theme.backgroundLight};
  }
`;

const cellStyle = css`
  ${(props) => {
    if (props.basic) {
      return {
        borderLeft: "none",
        borderRight: "none",
      };
    }

    const [borderTop, borderBottom, borderLeft, borderRight] =
      props.border || "1px 1px 1px 1px";

    return {
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
    };
  }}
`;

const StyledTableHeaderCell = styled.th`
  width: ${(props) => props.width || "auto"};
  text-align: left;
  padding: ${(props) => props.padding || "1em 0.5em"};
  ${cellStyle};
  border-top: ${(props) =>
    props.basic ? "none" : `1px solid ${(props) => props.theme.background}`};
`;

const StyledTableCell = styled.td`
  border: 1px solid ${(props) => props.theme.background};
  padding: ${(props) => props.padding || "1em 0.5em"};
  ${cellStyle};
`;
