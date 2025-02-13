"use client";

import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Automatically add user to Firestore if not found
        await setDoc(userRef, {
          email: user.email,
          createdAt: new Date(),
          role: "staff",
        });
      }

      // Redirect staff after login
      console.log("Staff logged in:", user);
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login Error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('background6.jpg')" }}
    >
      <div className="relative w-[400px] h-[450px] bg-transparent border-2 border-white/50 rounded-xl backdrop-blur-[15px] flex justify-center items-center p-6">
        <div className="w-full">
          <form onSubmit={handleLogin} className="w-full">
            <h2 className="text-center text-white text-2xl mb-6">Staff Login</h2>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Email Field */}
            <div className="relative mb-6 w-full border-b-2 border-white">
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
            <div className="relative mb-6 w-full border-b-2 border-white">
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
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[40px] rounded-full bg-white text-black font-semibold text-lg cursor-pointer"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
