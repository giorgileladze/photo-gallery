import { NavLink } from 'react-router-dom'
import './style.css'
import logo from '../../assets/logo.svg'

function Header() {

    return (
        <header>
            <div className="logo">
                <NavLink to="/">
                    <img src={logo} alt='Logo'/>
                </NavLink>
            </div>
            <div className='search'>
                <input type='text' placeholder='Search' />
            </div>
            <div className='menu'>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/history">History</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header