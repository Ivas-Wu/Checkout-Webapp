import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
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
                    Checkout <i className='fab fa-typo3' /> 
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
                        <Link to='/information' className='nav-links' onClick={closeMMenu}>
                            Information
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/goals' className='nav-links' onClick={closeMMenu}>
                            Goals
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/stats' className='nav-links' onClick={closeMMenu}>
                            Statistics
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>TEST BUTTON</Button>}
            </div> 
        </nav>
    </>
  )
}

export default Navbar