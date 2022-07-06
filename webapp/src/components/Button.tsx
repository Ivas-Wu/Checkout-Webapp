import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

interface Props {
    children : string;
    onClick?: () =>  void;
    buttonStyle?: string;
    buttonSize?: string;
}

export const Button: React.FC<Props> = ({
    children,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle!) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize!) ? buttonSize : SIZES[0];

    return (
        <Link to='/test-button' className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}>
                {children}
            </button>
        </Link>
    )
};