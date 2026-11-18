import React from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";

const ManagerDashboard = () => {

    // Access navigation state
    const location = useLocation();

    // Retrieve logged-in manager
    const user = location.state?.user;

    return (
        <div className="min-h-screen bg-gray-50">

            <DashboardHeader user={user} />

        </div>
    );
};

export default ManagerDashboard;