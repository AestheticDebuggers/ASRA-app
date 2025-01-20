"use client";

import React from 'react';
import { MailOutline, LockClosedOutline } from 'react-ionicons';

const Login = () => {
  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('background6.jpg')" }}
    >
      <div className="relative w-[400px] h-[450px] bg-transparent border-2 border-white/50 rounded-xl backdrop-blur-[15px] flex justify-center items-center">
        <div className="w-full">
          <form action="" className="w-full">
            <h2 className="text-center text-white text-2xl mb-8">Login</h2>

            <div className="relative mb-8 w-[310px] border-b-2 border-white">
              <MailOutline
                color="#ffffff"
                height="20px"
                width="20px"
                className="absolute top-[20px] right-[10px]"
              />
              <input
                type="email"
                required
                className="w-full h-[50px] bg-transparent border-none outline-none text-white text-lg pl-2 pr-10"
              />
              <label className="absolute top-1/2 left-2 text-white text-lg transform -translate-y-1/2 transition-all duration-500 ease-in-out pointer-events-none">
                Email
              </label>
            </div>

            <div className="relative mb-8 w-[310px] border-b-2 border-white">
              <LockClosedOutline
                color="#ffffff"
                height="20px"
                width="20px"
                className="absolute top-[20px] right-[10px]"
              />
              <input
                type="password"
                required
                className="w-full h-[50px] bg-transparent border-none outline-none text-white text-lg pl-2 pr-10"
              />
              <label className="absolute top-1/2 left-2 text-white text-lg transform -translate-y-1/2 transition-all duration-500 ease-in-out pointer-events-none">
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
                Don't have an account?{' '}
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
