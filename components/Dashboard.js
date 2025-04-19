"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchuser } from "@/actions/useractions";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession(); // Get session status
  const [userData, setUserData] = useState({}); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [isSecretVisible, setIsSecretVisible] = useState(false);

  const toggleSecretVisibility = () => {
    setIsSecretVisible((prev) => !prev);
  };


  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      getdata();
    }
  }, [status, session]);

  const getdata = async () => {
    try {
      setLoading(true);
      const data = await fetchuser(session.user.name);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Show a loading state while data is being fetched
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-black to-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gray-300">
          <img
            src={userData.coverpic} // Fallback cover photo
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Photo */}
        <div className="relative -mt-12 flex justify-center">
          <img
            src={userData.profilepic || "/default-profile.jpg"} // Fallback profile photo
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-50">
            {userData.name}
          </h1>
          <p className="text-center text-gray-500">@{userData.username}</p>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-100 mb-2">Contact Information</h2>
            <p className="text-gray-300">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
          </div>

          {/* <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-100 mb-2">Razorpay Details</h2>
            <p className="text-gray-300">
              <span className="font-semibold">Razorpay ID:</span> {userData.razorpayid || "Not Available"}
            </p>
            {console.log(userData.razorpayId)} */}
            {/*<p className="text-gray-300">
              <span className="font-semibold">Secret:</span> {userData.razorpaysecret || "Not Available"}
            </p>
          </div> */}

          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-100 mb-2">Razorpay Details</h2>
            <p className="text-gray-300">
              <span className="font-semibold">Razorpay ID:</span> {userData.razorpayid || "Not Available"}
            </p>
            <p className="text-gray-300 flex items-center gap-2">
              <span className="font-semibold">Secret:</span>
              {isSecretVisible ? (
                <span>{userData.razorpaysecret || "Not Available"}</span>
              ) : (
                <span>*******</span>
              )}
              <button
                type="button"
                onClick={toggleSecretVisibility}
                className="focus:outline-none text-blue-500"
                title={isSecretVisible ? "Hide Secret" : "Show Secret"}
              >
                {isSecretVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.175c1.36-2.33 4.196-4.175 8.02-4.175 3.824 0 6.66 1.845 8.02 4.175m-16.04 7.65c1.36 2.33 4.196 4.175 8.02 4.175 3.824 0 6.66-1.845 8.02-4.175m-16.04-7.65a9.735 9.735 0 000 7.65m16.04-7.65a9.735 9.735 0 010 7.65M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.175c1.36-2.33 4.196-4.175 8.02-4.175 3.824 0 6.66 1.845 8.02 4.175m-16.04 7.65c1.36 2.33 4.196 4.175 8.02 4.175 3.824 0 6.66-1.845 8.02-4.175m-16.04-7.65a9.735 9.735 0 000 7.65m16.04-7.65a9.735 9.735 0 010 7.65M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <Link href={"/editProfile"}>
              <button
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
