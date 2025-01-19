"use client";

import Link from 'next/link';
import Navbar from './components/NavBar';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1E1E2E] via-[#3A3A5E] to-[#1E1E2E] text-[#EDEDED]">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <section className="flex flex-col items-center text-center mt-10 px-6">
          <h2 className="text-4xl font-extrabold text-[#A78BFA]">Welcome to ASRA</h2>
          <p className="mt-4 text-lg text-gray-400">
            The Automated Smart Recognition Attendance System that simplifies attendance tracking.
          </p>
          <div className="mt-6">
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-[#4338CA]">
                Get Started
              </button>
            </Link>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
            <h3 className="text-xl font-semibold text-[#4F46E5]">Face Recognition</h3>
            <p className="text-gray-400 mt-2">Accurate and efficient face detection technology.</p>
          </div>
          <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
            <h3 className="text-xl font-semibold text-[#4F46E5]">Randomized Checks</h3>
            <p className="text-gray-400 mt-2">Ensure real-time attendance during class hours.</p>
          </div>
          <div className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
            <h3 className="text-xl font-semibold text-[#4F46E5]">Detailed Analytics</h3>
            <p className="text-gray-400 mt-2">View attendance patterns and detailed reports.</p>
          </div>
        </section>

        <footer className="w-full flex bg-[#212121] text-white py-6 mt-16 fixed bottom-0">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} ASRA. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
