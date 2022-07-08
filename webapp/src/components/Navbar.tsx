import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

interface INavbarProps {
    Buttonfunc:() => void;
    Buttonname: string;
};

export const Navbar: React.FC<INavbarProps> = ({Buttonfunc, Buttonname}:INavbarProps) => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true)
        }
    };

    window.addEventListener('resize', showButton);

  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMMenu}>
                    Checkout&nbsp; <i className='fa-solid fa-receipt' /> 
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Information' className='nav-links' onClick={closeMMenu}>
                            Information
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Goals' className='nav-links' onClick={closeMMenu}>
                            Goals
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Stats' className='nav-links' onClick={closeMMenu}>
                            Statistics
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline' 
                onClick={() => {
                    Buttonfunc();
                    }}>{Buttonname}</Button>}
            </div> 
        </nav>
    </>
  )
}

export default Navbar