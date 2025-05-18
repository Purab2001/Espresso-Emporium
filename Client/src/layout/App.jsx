import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import FollowSection from '../components/FollowSection';
import Footer from '../components/Footer';
import backgroundImage from '../assets/1.png';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const location = useLocation();
    const show = location.pathname === '/';

    return (
        <div>
            <Navbar/>
            {show && <Header />}
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover'
            }}>
                <Outlet />
            </div>
            {show && <FollowSection />}
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default App;