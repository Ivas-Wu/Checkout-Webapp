import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface PopupProps {
  onBackdropClick: () => void;
  children?: React.ReactNode;
}

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
  e.persist();
  e.stopPropagation();
};

const Popup: React.FC<PopupProps> = ({ onBackdropClick, children }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onBackdropClick}>
      <div onClick={stopPropagation}>{children}</div>
    </Overlay>,
    document.getElementById('popup-root')!
  );
};

export default Popup;
