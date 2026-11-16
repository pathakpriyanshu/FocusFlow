
import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {

    const location = useLocation();
    const user = location.state?.user;

    if (!user) {
        return <h1>Please login first!</h1>;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl font-bold">
                Welcome, {user.name}!
            </h1>

            <p className="text-lg">
                Your role: {user.role}
            </p>
        </div>
    );
};

export default Dashboard;
