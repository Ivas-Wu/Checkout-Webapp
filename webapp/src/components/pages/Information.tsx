import '../../App.css';
import React, { useState } from 'react';
import { Button } from '../Button';
import BasePopupWrapper from '../Popup/BasedPopupWrapper';
import Table2 from '../Table';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Welcome, Body } from './pages.styled';

export interface IInformationPtAmountProps {}

const Information: React.FC<IInformationPtAmountProps> = () => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const togglePopup = () => {
    setPopupVisible((wasPopupVisible) => !wasPopupVisible);
  };

  return (
    <>
      <Welcome>This is the Information Page</Welcome>
      <Body>Here you can see your Receipts!</Body>
      <Button
        buttonStyle="btn--extra"
        buttonSize="btn--medium"
        onClick={togglePopup}
      >
        Add Value
      </Button>
      <BasePopupWrapper
        isPopupVisible={isPopupVisible}
        onBackdropClick={() => togglePopup()}
        header="Upload Image"
      />
      <Table2 />
    </>
  );
};

export default Information;
