import React, { useEffect, useRef } from 'react'
import './sidebar.scss';
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied,
} from "react-icons/md"
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.action';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebar, handleToggleSidebar, closeSideBar }) => {

    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logout())
    }

    const ref = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebar && ref.current && !ref.current.contains(event.target)) {
                closeSideBar()
            }
        }
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    })

    return (
        <nav
            ref={ref}
            onClick={() => handleToggleSidebar()}
            className={sidebar ? "sidebar open" : "sidebar"}>
            {/* sidebar list */}
            <Link to="/">
                <li>
                    <MdHome size={23} />
                    <span>Home</span>
                </li>
            </Link>

            <Link to="/feed/subscriptions">
                <li>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
            </Link>

            <Link to='/feed/likedVideos'>
                <li>
                    <MdThumbUp size={23} />
                    <span>Liked Videos</span>
                </li>
            </Link>

            <li className="disabled">
                <MdHistory size={23} />
                <span>History</span>
            </li>

            <li className="disabled">
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </li>

            <li className="disabled">
                <MdSentimentDissatisfied size={23} />
                <span>Library</span>
            </li>

            <hr />

            <li onClick={handleLogOut}>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </li>

            <hr />

        </nav>
    )
}

export default Sidebar