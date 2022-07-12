import { useAuth0 } from '@auth0/auth0-react';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import SignUpButton from './auth/SignUpButton';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMMenu = () => setClick(false);

    const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
        <nav className="navbar">
            {isAuthenticated && !isLoading && <div className="navbar-container">
                <Link to="/home" className="navbar-logo" onClick={closeMMenu}>
                    Checkout&nbsp; <i className='fa-solid fa-receipt' /> 
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/home' className='nav-links' onClick={closeMMenu}>
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
               <LogoutButton />
            </div>  }
            {!isAuthenticated && !isLoading && <div className="navbar-container">
                <div> 
                    <Link to="/" className="navbar-logo" onClick={closeMMenu}>
                        Checkout&nbsp; <i className='fa-solid fa-receipt' /> 
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div> 
                </div>
                <div style={{paddingLeft:'900px', paddingRight: '20px'}}>
                    <SignUpButton />
                </div>
                <div style={{paddingRight: '50px'}}>
                    <LoginButton />
                </div>
            </div>}
        </nav>
    </>
  )
}

export default Navbar