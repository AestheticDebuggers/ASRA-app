"use client";

import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('background6.jpg')" }}
    >
      <div className="relative w-[400px] h-[450px] bg-transparent border-2 border-white/50 rounded-xl backdrop-blur-[15px] flex justify-center items-center p-6">
        <div className="w-full">
          <form action="" className="w-full">
            <h2 className="text-center text-white text-2xl mb-8">Login</h2>

            {/* Email Field */}
            <div className="relative mb-8 w-full border-b-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="absolute top-[20px] right-[10px] w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 12.75v6a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25v-6m19.5-4.5v-3.75a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25V8.25m19.5 4.5h-19.5"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer w-full h-[50px] bg-transparent border-none outline-none text-white text-lg pl-2 pr-10"
              />
              <label
                className={`absolute top-1/2 left-2 text-white text-lg transform -translate-y-1/2 transition-all duration-300 ease-in-out pointer-events-none ${
                  email ? "-translate-y-10 text-sm" : ""
                } peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:text-white`}
              >
                Email
              </label>
            </div>

            {/* Password Field */}
            <div className="relative mb-8 w-full border-b-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="absolute top-[20px] right-[10px] w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5c.75-.75 1.5-1.5 1.5-3 0-2.485-1.015-4.5-3-4.5-1.5 0-2.625.75-3 2.25m6 4.5h3.75m-12-3c0-1.5.75-2.625 2.25-3 2.25 0 3.75 1.5 3.75 3m-6 1.5v6m6-6v6m-12 3.75c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5V9c0-.825-.675-1.5-1.5-1.5h-15C4.675 7.5 4 8.175 4 9v10.5z"
                />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full h-[50px] bg-transparent border-none outline-none text-white text-lg pl-2 pr-10"
              />
              <label
                className={`absolute top-1/2 left-2 text-white text-lg transform -translate-y-1/2 transition-all duration-300 ease-in-out pointer-events-none ${
                  password ? "-translate-y-10 text-sm" : ""
                } peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:text-white`}
              >
                Password
              </label>
            </div>

            <div className="flex justify-between text-white text-sm mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="hover:underline">
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[40px] rounded-full bg-white text-black font-semibold text-lg cursor-pointer mb-6"
            >
              Log in
            </button>

            <div className="text-center text-white text-sm">
              <p>
                Don&apos;t have an account?{" "}
                <a href="#" className="font-semibold hover:underline">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
