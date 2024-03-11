import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// local dependencies
import './loginScreen.scss'
import { login } from '../../redux/actions/auth.action';

const LoginScreen = () => {

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken)
    const navigate = useNavigate();
    
    const handleLogin = () => {
        dispatch(login())
    }

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken, navigate])

    return (
        <div className='login'>
            <div className='login__container'>
                <h2>Youtube Clone</h2>
                <img
                    src="https://www.freepnglogos.com/uploads/youtube-logo-icon-png-11.png"
                    alt=''
                />
                <button onClick={handleLogin}>
                    Login with google
                </button>
                <p>This Project is made using YOUTUBE DATA API</p>
            </div>
        </div>
    )
}

export default LoginScreen