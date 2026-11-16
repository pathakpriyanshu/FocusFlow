
import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import employeeImg from "../assets/employee.png";
import managerImg from "../assets/manager.png";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [login, setlogin] = useState("Employee")
    const [show, setshow] = useState(false)

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldFocusError: false
    });

    const onSubmit = async (data) => {
        try {
            const requestData = {
                ...data,
                role: login.toLowerCase()
            };

            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            navigate("/dashboard", {
                state: {
                    user: result.user
                }
            });

        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server");
        }
    };

    return (
        <div className='relative h-screen w-full overflow-hidden'>
            {login === "Employee" ? <img src={employeeImg} alt="Employee illustration" className='w-[180px] sm:w-[250px] lg:w-[400px] hidden min-[1100px]:block absolute bottom-0 left-0' /> : <img src={managerImg} alt="Manager illustration" className='w-[180px] sm:w-[250px] lg:w-[400px] hidden min-[1100px]:block absolute bottom-0 right-0 z-20' />}


            {/* Main Background */}
            <div className="relative z-10 h-screen w-full flex justify-center items-center">

                {/* Employee Background */}
                <svg
                    viewBox="0 0 1000 600"
                    preserveAspectRatio="none"
                    className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out ${login === "Employee" ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <path
                        d="M 0 0 L 1000 0 L 1000 420 C 750 300 250 300 0 180 Z"
                        fill="#25d366"
                    />
                </svg>

                {/* Manager Background */}
                <svg
                    viewBox="0 0 1000 600"
                    preserveAspectRatio="none"
                    className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out ${login === "Manager" ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <path
                        d="M 0 600 L 0 420 C 250 300 750 300 1000 180 L 1000 600 Z"
                        fill="#25d366"
                    />
                </svg>

                {/* Login Card */}
                <div className="logincard bg-white w-[90%] max-w-[400px] min-h-[300px] p-4 md:p-6 rounded-xl shadow-lg relative z-10">
                    <form action="" noValidate onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <h1 className='text-xl md:text-2xl font-bold text-center'>
                            {login} Login
                        </h1>

                        <div className="flex items-center border rounded-lg px-3 transition-all focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                            <User size={20} />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 p-3 outline-none"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email"
                                    }
                                })}
                            />

                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        <div className="flex items-center border rounded-lg px-3 transition-all focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                            <Lock size={20} />

                            <input
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                                className="flex-1 p-3 outline-none"
                                {...register("password", {
                                    required: "password is required"
                                })}
                            />
                            {show ? (
                                <Eye size={20} className='cursor-pointer' onClick={() => { setshow(!show) }} />
                            ) : (
                                <EyeOff size={20} className='cursor-pointer' onClick={() => { setshow(!show) }} />
                            )}
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}

                        <a href="/" target="_blank" className='text-green-400 text-end'>
                            forgot password?
                        </a>

                        <input type="submit" value="Sign in" className='bg-green-500 text-white p-2 rounded cursor-pointer' />
                    </form>
                </div>
            </div>

            {/* Employee Button */}
            <div className='absolute top-4 left-4 z-20'>
                <button
                    className='bg-white text-green-600 font-semibold px-4 py-2 rounded-lg shadow cursor-pointer transition-all duration-300 hover:scale-105'
                    onClick={() => setlogin("Employee")}
                >
                    Login as Employee
                </button>
            </div>

            {/* Manager Button */}
            <div className='absolute top-4 right-4 z-20'>
                <button
                    className='bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow cursor-pointer transition-all duration-300 hover:scale-105'
                    onClick={() => setlogin("Manager")}
                >
                    Login as Manager
                </button>
            </div>



        </div>
    )
}

export default Login
