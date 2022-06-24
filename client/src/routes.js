import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import CompanyListing from './components/CompanyListing';
import ApiResults from './components/apiResults';
import Analytics from "./components/apiResultsAnalytics";

const routes = () => {
    return (
        <Router>
            <div style={{ paddingTop: '0' }} />
            <Routes>
                <Route path="/dashboard" element={<CompanyListing />} />
                <Route path="/apiResults" element={<ApiResults />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router >
    );
}

export default routes;