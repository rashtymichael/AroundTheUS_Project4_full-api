import { Link } from 'react-router-dom';
import headerLogo from '../images/logo-vector.svg';

export default function Header(props) {
const { navLinkPath, loggedInEmail, navLinkTitle, onClick } = props;

    return (
        <header className='header'>
                <img className='header__logo' id='image-header-logo' alt='Around The U.S' src={headerLogo} />
                <div className='__nav-bar'>
                    <p className='__nav-bar_email'>{loggedInEmail}</p>
                    <nav>
                        <Link to={navLinkPath} onClick={onClick} className='__nav-bar_link'>{navLinkTitle}</Link> 
                    </nav>
                </div>
        </header>
    );
}