import React from 'react';
import styled from 'styled-components';


const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContentWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
`;

const ModalClose = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

export const Modal = ({ children }) => {
  return <ModalWrapper>{children}</ModalWrapper>;
};

export const ModalContent = ({ children }) => {
  return <ModalContentWrapper>{children}</ModalContentWrapper>;
};

export const ModalCloseButton = ({ onClick }) => {
  return <ModalClose onClick={onClick}>&times;</ModalClose>;
};
