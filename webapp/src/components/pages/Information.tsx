import '../../App.css';
import React, { useState } from 'react';
import { Button } from '../Button';
import BasePopupWrapper from '../Popup/BasedPopupWrapper';
import Table2 from '../Table';
import { Welcome, Body } from './pages.styled';
import Modal from '@mui/material/Modal';
import ReceiptUpload from '../ReceiptUpload';
import Box from '@mui/material/Box';

export interface IInformationPtAmountProps {}

const Information: React.FC<IInformationPtAmountProps> = () => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const togglePopup = () => {
    setPopupVisible((wasPopupVisible) => !wasPopupVisible);
  };

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth*0.6,
    height: window.innerHeight*0.3,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    margin: 0,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <Welcome>This is the Information Page</Welcome>
      <Body>Here you can see your Receipts!</Body>
      <div className="header">
        <Button
          buttonStyle="btn--extra"
          buttonSize="btn--medium"
          onClick={togglePopup}
        >
          Add Value
        </Button>
      </div>
      <Modal
          open={isPopupVisible}
          onClose={togglePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{...style}}>
            <ReceiptUpload />
          </Box>
      </Modal>
      {/* <BasePopupWrapper
        isPopupVisible={isPopupVisible}
        onBackdropClick={() => togglePopup()}
        header="Upload Image"
      /> */}
      <Table2 rerender={isPopupVisible} />
    </>
  );
};

export default Information;
