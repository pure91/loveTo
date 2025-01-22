import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../assets/styles/Global.css';

const Layout = ({children, isAuthenticated, userInfo, handleLogout}) => {
    return (
        <div className="layout-container">
            <Header isAuthenticated={isAuthenticated} userInfo={userInfo} handleLogout={handleLogout}/>
            <main className="layout-content">{React.cloneElement(children, {isAuthenticated, userInfo})}</main>
            <Footer/>
        </div>
    );
};

export default Layout;