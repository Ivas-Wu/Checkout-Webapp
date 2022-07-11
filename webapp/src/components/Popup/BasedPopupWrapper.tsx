import React, { MouseEventHandler, ReactNode } from 'react'
import Popup from './Popup';
import { DesktopPopupContainer} from './Popup.styles';
import ImageHandler from './ImageHandler'

export interface BasePopupWrapperProps {
  isPopupVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
  content?: ReactNode;
}

interface ComponentsProps {
  ContainerComponent?: React.ComponentType<{}>;
  CloseButtonComponent?: React.ComponentType<{
    onClick?: MouseEventHandler<any>;
  }>;
}

type Props = BasePopupWrapperProps & ComponentsProps;

const BasePopupWrapper: React.FC<Props> = ({content, ContainerComponent, CloseButtonComponent, isPopupVisible, onBackdropClick, header, message}) => {
  
  if(!isPopupVisible) {
    return null
  }

    return (<Popup onBackdropClick={onBackdropClick}>
      <DesktopPopupContainer>
        <ImageHandler></ImageHandler>
      </DesktopPopupContainer>
    </Popup>);
}

export default BasePopupWrapper