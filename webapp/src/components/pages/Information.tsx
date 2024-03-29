import '../../App.css';
import React, { useState } from 'react';
import { Button } from '../Button';
import Table2 from '../Table';
import { Welcome, EndCard } from './pages.styled';
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
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth * 0.6,
    height: window.innerHeight * 0.3,
    bgcolor: '#F1FCFF',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const outer_style = {
    position: 'relative',
    bgcolor: '#F1FCFF',
    display: 'flex',
  };

  return (
    <>
      <Welcome>This is the Receipts Page</Welcome>
      <div className="header" style={{ background: '#F1FCFF' }}>
        <Button
          buttonStyle="btn--extra"
          buttonSize="btn--medium"
          onClick={togglePopup}
        >
          Add Receipt
        </Button>
        <Modal
          open={isPopupVisible}
          onClose={togglePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style }}>
            <ReceiptUpload closeParent={togglePopup}/>
          </Box>
        </Modal>
      </div>

      <Box sx={{ ...outer_style }}>
        <Table2 rerender={isPopupVisible} />
      </Box>
      <EndCard>Here you can see your Receipts!</EndCard>
    </>
  );
};

export default Information;
