import React from "react";
import { Bell } from "lucide-react";

const DashboardHeader = ({ user }) => {
    return (
        <header className="flex items-center justify-between px-8 py-6">

            {/* Greeting */}
            <div>
                <h1 className="text-3xl font-bold font-google  text-gray-800">
                    Hey, {user?.name}
                </h1>

                <p className="text-gray-500 mt-2 font-shantell">
                    Here are your projects
                </p>
            </div>

            {/* Notification */}
            <button className="relative p-3 rounded-full hover:bg-gray-100">
                <Bell size={23} className="text-gray-700" />

                <span className="absolute top-2 right-2 w-2.5 h-2.5
                                 bg-red-500 rounded-full border-2 border-white">
                </span>
            </button>

        </header>
    );
};

export default DashboardHeader;