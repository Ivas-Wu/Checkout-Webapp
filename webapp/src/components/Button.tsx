import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--extra'];

const SIZES = ['btn--medium', 'btn--large'];

interface IButtonProps {
  children: string;
  onClick?: () => void;
  buttonStyle?: string;
  buttonSize?: string;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle!)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize!) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
