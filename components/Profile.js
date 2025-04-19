"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { fetchuser, updateProfile } from "@/actions/useractions";

const Profile = () => {
    const { data: session, update } = useSession();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        coverpic: { file: null, url: "" },
        profilepic: { file: null, url: "" },
        razorpayid: "",      // Add razorpayid field
        razorpaysecret: "",  // Add razorpaysecret field
    });

    useEffect(() => {
        if (session?.user?.name) {
            getData();
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            [name]: { ...prev[name], file },
        }));
    };

    const handleUrlChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: { ...prev[name], url: value },
        }));
    };

    const getData = async () => {
        const userData = await fetchuser(session.user.name);
        setFormData({
            name: userData.name || "",
            email: userData.email || "",
            username: userData.username || "",
            coverpic: { file: null, url: userData.coverpic || "" },
            profilepic: { file: null, url: userData.profilepic || "" },
            razorpayid: userData.razorpayid || "",  // Set razorpayid from fetched data
            razorpaysecret: userData.razorpaysecret || "", // Set razorpaysecret from fetched data
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            coverpic: formData.coverpic.file
                ? formData.coverpic.file
                : formData.coverpic.url,
            profilepic: formData.profilepic.file
                ? formData.profilepic.file
                : formData.profilepic.url,
            razorpayid: formData.razorpayid,      // Add razorpayid to payload
            razorpaysecret: formData.razorpaysecret,  // Add razorpaysecret to payload
        };

        const result = await updateProfile(payload, session.user.name);

        if (result.success) {
            alert("Profile updated successfully!");
            await update(); // Refresh session data
        } else {
            alert(result.error || "Failed to update profile.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full text-black bg-gray-200 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Picture
                    </label>
                    <input
                        type="file"
                        name="coverpic"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Or enter the URL"
                        name="coverpic"
                        value={formData.coverpic.url}
                        onChange={handleUrlChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        name="profilepic"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Or enter the URL"
                        name="profilepic"
                        value={formData.profilepic.url}
                        onChange={handleUrlChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Razorpay ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razorpay ID
                    </label>
                    <input
                        type="text"
                        name="razorpayid"
                        value={formData.razorpayid}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Razorpay Secret */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razorpay Secret
                    </label>
                    <input
                        type="password"
                        name="razorpaysecret"
                        value={formData.razorpaysecret}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex gap-2 w-full">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                    <Link href="/dashboard" className="flex-1">
                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Back to Dashboard
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    );
};

export default Profile;
