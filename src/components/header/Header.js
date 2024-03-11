import React, { useState } from 'react'
import './header.scss';
import { FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { MdNotifications, MdApps } from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ handleToggleSidebar }) => {
    
    const [input, updateInput] = useState('')
    
    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${input}`);
    }
    
    const auth = useSelector(state => state?.auth)
                
    return (
        <div className="header">
            {/* header hamburger menu */}
            <FaBars
                className='header__menu'
                size={26}
                onClick={() => handleToggleSidebar()}
            />

            {/* youtube logo */}
            <img
                src={"https://www.freepnglogos.com/uploads/youtube-logo-icon-png-11.png"}
                alt='Youtube Logo'
                className='header__logo' />

            {/* search bar */}
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Search' value={input} onChange={e => updateInput(e.target.value)} />
                <button type='submit'>
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            {/* header icons */}
            <div className='header__icons'>

                {/* notification and app icon */}
                <MdNotifications size={28} />
                <MdApps size={28} />

                {/* avatar */}
                <img
                    src={auth?.user?.photoUrl}
                    alt='avatar'
                />
            </div>
        </div>
    )
}

export default Header