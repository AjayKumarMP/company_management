import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from './components/Login';
import CompanyListing from './components/CompanyListing';

const routes = () => {
    return (
        <Router>
            <div style={{ paddingTop: '0' }} />
            <Routes>
                <Route path="/dashboard" element={<CompanyListing />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router >
    );
}

export default routes;