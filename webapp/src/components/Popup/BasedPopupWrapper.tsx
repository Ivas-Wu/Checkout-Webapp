import React, { MouseEventHandler, useState } from 'react';
import Popup from './Popup';
import { DesktopPopupContainer, Header } from './Popup.styles';
import ImageHandler from './ImageHandler';
import ReceiptUpload from '../ReceiptUpload';

export interface BasePopupWrapperProps {
  isPopupVisible: boolean;
  onBackdropClick: () => void;
  header: string;
}

interface ComponentsProps {
  ContainerComponent?: React.ComponentType<{}>;
  CloseButtonComponent?: React.ComponentType<{
    onClick?: MouseEventHandler<any>;
  }>;
}

type Props = BasePopupWrapperProps & ComponentsProps;

const BasePopupWrapper: React.FC<Props> = ({
  isPopupVisible,
  onBackdropClick,
  header,
}) => {

  if (!isPopupVisible) {
    return null;
  }

  return (
    <>
      <Popup onBackdropClick={onBackdropClick}>
        <DesktopPopupContainer>
          <Header>{header}</Header>
          {/* <ImageHandler scanAndEdit={scanAndEdit}></ImageHandler> */}
          <ReceiptUpload />
        </DesktopPopupContainer>
      </Popup>
    </>
  );
};

export default BasePopupWrapper;
