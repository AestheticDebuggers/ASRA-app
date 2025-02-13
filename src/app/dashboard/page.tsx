"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashnav from "../components/DashNav";
import { auth } from "../firebase/config"; // Ensure correct import of Firebase auth

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User"); // Use displayName, fallback to "User"
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Dashnav />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#181818]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#D1D5DB]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-white">
              Welcome, {userName ? userName : "User"}!
            </div>
            <Link href="/">
              <button className="px-4 py-2 bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:bg-[#4338CA]">
                Log Out
              </button>
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#4F46E5]">
                Today's Attendance
              </h3>
              <p className="text-gray-400 mt-2">
                Track real-time attendance for today&apos;s class.
              </p>
            </div>
            <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#4F46E5]">
                Recent Checks
              </h3>
              <p className="text-gray-400 mt-2">
                Review attendance verification for the last few sessions.
              </p>
            </div>
            <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#4F46E5]">
                Attendance Analytics
              </h3>
              <p className="text-gray-400 mt-2">
                Analyze attendance patterns with graphs and data.
              </p>
            </div>
          </section>
        )}

        {activeTab === "attendance" && (
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#A78BFA]">
              Attendance Records
            </h3>
            <p className="text-gray-400 mt-2">View and manage attendance records.</p>
          </section>
        )}

        {activeTab === "students" && (
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#A78BFA]">
              Student Management
            </h3>
            <p className="text-gray-400 mt-2">
              Add, edit, or remove students from the system.
            </p>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#A78BFA]">Settings</h3>
            <p className="text-gray-400 mt-2">Adjust your app&apos;s settings.</p>
          </section>
        )}
      </div>
    </div>
  );
}
