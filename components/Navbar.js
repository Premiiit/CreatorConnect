"use client"
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center h-16 px-10 py-2">
      <Link href={"/"} className="logo font-bold">FRIBIE</Link>

      <div>
        {session && <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            id="dropdownHoverButton"
            className="text-white flex items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            type="button"
          >
            <span>Welcome, {session.user.email}</span>
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              id="dropdownHover"
              className="absolute left-[102px] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    href={"/dashboard"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
                <li onClick={() => { signOut({ callbackUrl: '/' }) }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  
                    Sign out
                </li>
              </ul>
            </div>
          )}

        </div>
        }

        {/* {session && <Link href={"/dashboard"}> <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dashboard</button> </Link>} */}

        {/* {session && <button onClick={() => { signOut({ callbackUrl: '/' }) }} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>} */}

        {!session && <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
        </Link>}
      </div>
    </nav>
  );
};

export default Navbar;
