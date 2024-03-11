import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// local dependencies
import Header from './components/header/Header';
import HomeScreen from './screens/homeScreen/HomeScreen';
import './_app.scss'
import LoginScreen from './screens/loginScreen/LoginScreen';
import Sidebar from './components/sidebar/Sidebar';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/searchScreen/SearchScreen';
import SubscriptionScreen from './screens/subscriptionScreen/SubscriptionScreen';
import ChannelScreen from './screens/channelScreen/ChannelScreen';
import LikedVideoScreen from './screens/likedVideoScreen/LikedVideoScreen';

const Layout = ({ children }) => {
    const [sidebar, toggleSidebar] = useState(false);

    const handleToggleSidebar = () => {
        toggleSidebar(prevState => !prevState)
    }

    const closeSideBar = () => {
        toggleSidebar(false)
    }
    
    return (
        <React.Fragment>
            <Header handleToggleSidebar={handleToggleSidebar} />
            <div className='app__container'>
                <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} closeSideBar={closeSideBar} />
                <Container fluid className='app__main'>
                    {children}
                </Container>
            </div>
        </React.Fragment>
    )
}

const App = () => {

    const { accessToken, loading } = useSelector(state => state.auth) ?? {};
    const navigate = useNavigate();

    // protect the routes if user not logged in
    useEffect(() => {
        if (!loading && !accessToken) {
            navigate('/auth')
        }
    }, [accessToken, loading, navigate])

    return (
        <Routes>
            {/* home screen */}
            <Route
                path='/'
                exact
                element={
                    <Layout>
                        <HomeScreen />
                    </Layout>
                }
            />

            {/* login screen */}
            <Route
                path='/auth'
                element={
                    <LoginScreen />
                }
            />

            {/* search screen */}
            <Route path='/search/:query'
                element={
                    <Layout>
                        <SearchScreen />
                    </Layout>
                }
            />

            {/* watch screen */}
            <Route
                path='/watch/:id'
                element={
                    <Layout>
                        <WatchScreen />
                    </Layout>
                }
            />

            {/* subscription screen */}
            <Route
                path='/feed/subscriptions'
                element={
                    <Layout>
                        <SubscriptionScreen />
                    </Layout>
                }
            />
            
            
            {/* liked video screen */}
            <Route
                path='/feed/likedVideos'
                element={
                    <Layout>
                        <LikedVideoScreen />
                    </Layout>
                }
            />

            {/* channel screen */}
            <Route
                path='/channel/:channelId'
                element={
                    <Layout>
                        <ChannelScreen/>
                    </Layout>
                }
            />

            {/* route for unmatched URLs */}
            <Route
                path='*'
                element={<Navigate to="/" />}
            />

        </Routes>
    )
}

export default App