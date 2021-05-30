import PropTypes from "prop-types";
import styled from "styled-components";

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

const StyledModalHeader = styled.h2`
  height: fit-content;
  margin: 1rem 1rem 2.5rem;
  text-align: ${(props) => (props.centered ? "center" : "left")};
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalHeader = ({ children, ...props }) => (
  <StyledModalHeader {...props}>{children}</StyledModalHeader>
);

const Modal = ({ children, isOpen, closeModal }) => (
  <ModalContainer isOpen={isOpen} onClick={closeModal}>
    <ModalMain onClick={(event) => event.stopPropagation()}>
      {children}
    </ModalMain>
  </ModalContainer>
);

ModalHeader.defaultProps = {
  children: null,
};

ModalHeader.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
  isOpen: false,
  closeModal: () => {},
};

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

Modal.Main = ModalMain;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;

export default Modal;
