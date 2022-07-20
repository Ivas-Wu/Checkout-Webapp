import React, { MouseEventHandler, ReactNode } from 'react';
import Popup from './Popup';
import { DesktopPopupContainer, Header } from './Popup.styles';
import ImageHandler from './ImageHandler';

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
    <Popup onBackdropClick={onBackdropClick}>
      <DesktopPopupContainer>
        <Header>{header}</Header>
        <ImageHandler></ImageHandler>
      </DesktopPopupContainer>
    </Popup>
  );
};

export default BasePopupWrapper;
