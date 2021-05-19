import styled from "styled-components";
import PropTypes from "prop-types";
import range from "lodash/range";
import { GrPrevious, GrNext } from "react-icons/gr";

const arePropsValid = ({ totalPages, currentPage, siblingRange }) => {
  if (totalPages < 1) {
    return false;
  }

  if (currentPage < 1 || currentPage > totalPages) {
    return false;
  }

  if (siblingRange > totalPages || siblingRange < 1) {
    return false;
  }

  return true;
};

const Pagination = ({
  totalPages = 0,
  currentPage = 1,
  siblingRange,
  onPageClick,
  onNextClick,
  onPreviousClick,
}) => {
  const getPagesArray = () => {
    const pageNeighbours =
      siblingRange <= totalPages - 1 ? siblingRange : totalPages - 1;

    switch (true) {
      case currentPage === 1 && totalPages === 1:
        return [1];

      case currentPage === totalPages:
        // currentPage - (pageNeighbours + 1)
        return range(totalPages - pageNeighbours, totalPages + 1);

      case currentPage > 1 && currentPage < totalPages:
        return range(
          currentPage - pageNeighbours,
          currentPage + pageNeighbours + 1
        );

      default:
        return range(1, totalPages + 1);
    }
  };

  const onPaginationPrevious = () => {
    if (currentPage !== 1) {
      onPreviousClick();
    }
  };

  const onPaginationNext = () => {
    if (currentPage !== totalPages) {
      onNextClick();
    }
  };

  const renderPages = () => {
    const pagesArray = getPagesArray();

    return pagesArray.map((page) => (
      <Page
        active={page === currentPage}
        key={page}
        onClick={() => {
          onPageClick({ clickedPage: page });
        }}
      >
        {page}
      </Page>
    ));
  };

  if (!arePropsValid({ totalPages, currentPage, siblingRange })) {
    return (
      <PaginationContainer>
        <IconContainer>
          <GrPrevious size={22} />
        </IconContainer>
        <Page active>1</Page>
        <IconContainer>
          <GrNext size={22} />
        </IconContainer>
      </PaginationContainer>
    );
  }

  return (
    <PaginationContainer>
      <IconContainer onClick={onPaginationPrevious}>
        <GrPrevious size={22} />
      </IconContainer>
      {renderPages()}
      <IconContainer onClick={onPaginationNext}>
        <GrNext size={22} />
      </IconContainer>
    </PaginationContainer>
  );
};

Pagination.defaultProps = {
  totalPages: 6,
  currentPage: 1,
  siblingRange: 1,
  onNextClick: () => {},
  onPreviousClick: () => {},
  onPageClick: () => {},
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  siblingRange: PropTypes.number,
  onPageClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

export default Pagination;

const PaginationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35px, auto));
  height: fit-content;
  margin: 2em auto;
  justify-content: center;
  grid-gap: 0.5em;

  & > * {
    margin: auto 0;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: fit-content;
  margin: auto 0.75em;
`;

const Page = styled.div`
  width: fit-content;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  padding: 0.1em 0.75em;
  border-radius: 4px;

  ${(props) => {
    if (props.active) {
      return {
        backgroundColor: props.theme.primary,
        color: "#fff",
      };
    }
  }}

  :hover {
    ${(props) => {
      if (!props.active) {
        return {
          color: props.theme.textSecondary,
        };
      }
    }}
  }
`;
