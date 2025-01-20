"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaChartLine, FaCalendarAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1E1E2E] via-[#3A3A5E] to-[#1E1E2E] text-[#EDEDED]">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#212121] shadow-md">
        <div className="flex justify-center items-center h-20 bg-[#4F46E5]">
          <h2 className="text-2xl font-bold text-white">ASRA</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li onClick={() => setActiveTab('overview')} className={`p-4 cursor-pointer hover:bg-[#333333] ${activeTab === 'overview' ? 'bg-[#4F46E5]' : ''}`}>
              <FaChartLine className="inline-block mr-3 text-lg" /> Overview
            </li>
            <li onClick={() => setActiveTab('attendance')} className={`p-4 cursor-pointer hover:bg-[#333333] ${activeTab === 'attendance' ? 'bg-[#4F46E5]' : ''}`}>
              <FaCalendarAlt className="inline-block mr-3 text-lg" /> Attendance
            </li>
            <li onClick={() => setActiveTab('students')} className={`p-4 cursor-pointer hover:bg-[#333333] ${activeTab === 'students' ? 'bg-[#4F46E5]' : ''}`}>
              <FaUsers className="inline-block mr-3 text-lg" /> Students
            </li>
            <li onClick={() => setActiveTab('settings')} className={`p-4 cursor-pointer hover:bg-[#333333] ${activeTab === 'settings' ? 'bg-[#4F46E5]' : ''}`}>
              <FaSignOutAlt className="inline-block mr-3 text-lg" /> Settings
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#A78BFA]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-white">Welcome, User!</div>
            <Link href="/">
              <button className="px-4 py-2 bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:bg-[#4338CA]">
                Log Out
              </button>
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'overview' && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#4F46E5]">Today's Attendance</h3>
              <p className="text-gray-400 mt-2">Track real-time attendance for today’s class.</p>
            </div>
            <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#4F46E5]">Recent Checks</h3>
              <p className="text-gray-400 mt-2">Review attendance verification for the last few sessions.</p>
            </div>
            <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#4F46E5]">Attendance Analytics</h3>
              <p className="text-gray-400 mt-2">Analyze attendance patterns with graphs and data.</p>
            </div>
          </section>
        )}

        {activeTab === 'attendance' && (
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#A78BFA]">Attendance Records</h3>
            <p className="text-gray-400 mt-2">View and manage attendance records.</p>
          </section>
        )}

        {activeTab === 'students' && (
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#A78BFA]">Student Management</h3>
            <p className="text-gray-400 mt-2">Add, edit, or remove students from the system.</p>
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#A78BFA]">Settings</h3>
            <p className="text-gray-400 mt-2">Adjust your app’s settings.</p>
          </section>
        )}
      </div>
    </div>
  );
}
