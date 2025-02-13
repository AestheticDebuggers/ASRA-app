"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/NavBar";

export default function HomePage() {
  const router = useRouter();
  const isLoggedIn = false; // Replace with actual authentication logic.

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen bg-[#1E1E2E] p-6">
        <section className="flex flex-col items-center text-center mt-12">
          <h2 className="text-4xl font-extrabold text-[#A78BFA]">Welcome to ASRA</h2>
          <p className="mt-4 text-lg text-gray-400">
            The Automated Smart Recognition Attendance System that simplifies attendance tracking.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link href="/login">
              <button className="px-6 py-3 bg-[#4F46E5] text-white font-semibold rounded-lg hover:bg-[#4338CA]">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-3 bg-[#4F46E5] text-white font-semibold rounded-lg hover:bg-[#4338CA]">
                Register
              </button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            { title: "Face Recognition", desc: "Accurate and efficient face detection technology." },
            { title: "Randomized Checks", desc: "Ensure real-time attendance during class hours." },
            { title: "Detailed Analytics", desc: "View attendance patterns and detailed reports." },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-[#212121] shadow-md rounded-lg text-center transform transition-transform duration-200 hover:scale-105 hover:bg-[#2C2C2C]">
              <h3 className="text-xl font-semibold text-[#A78BFA]">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
