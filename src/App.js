import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Login from './pages/join/Login';
import Join from "./pages/join/Join";
import JoinProfile from "./pages/join/JoinProfile";

const App = () => {
    return (
        <AuthProvider>  {/* AuthProvider로 감싸기 */}
            <Routes>
                <Route path="/" element={<Layout><Home/></Layout>}/>
                <Route path="/login" element={<Layout><Login/></Layout>}/>
                <Route path="/join" element={<Layout><Join/></Layout>}/>
                <Route path="/join/profile" element={<Layout><JoinProfile/></Layout>}/>
            </Routes>
        </AuthProvider>
    );
};

export default App;
