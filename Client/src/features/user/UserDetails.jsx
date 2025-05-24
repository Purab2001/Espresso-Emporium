import React, { useContext, useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaArrowLeft, FaEdit, FaEnvelope, FaRegClock, FaIdCard, FaSignInAlt, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../../ui/Button';
import axios from 'axios';

const UserDetails = () => {
    const { user, auth } = useContext(AuthContext);
    // Get user data from the loader
    const loadedUserData = useLoaderData();
    const [userData, setUserData] = useState(loadedUserData);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form values when userData is loaded
    useEffect(() => {
        if (userData) {
            setName(userData.name || user?.displayName || '');
            setPhotoURL(userData.photo || user?.photoURL || '');
        }
    }, [userData, user]);

    // Toggle edit mode
    const handleToggleEdit = () => {
        if (isEditing) {
            // Reset form if canceling edit
            setName(userData?.name || user?.displayName || '');
            setPhotoURL(userData?.photo || user?.photoURL || '');
        }
        setIsEditing(!isEditing);
    };

    // Handle save profile changes
    const handleSaveProfile = async () => {
        setIsSubmitting(true);
        try {
            // 1. Update Firebase user profile
            if (auth?.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL
                });
            }

            // 2. Update MongoDB user profile
            const response = await axios.patch('https://espressoemporium.vercel.app/users', {
                email: userData?.email || user?.email,
                name: name,
                photo: photoURL
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;

            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Profile Updated!",
                    text: "Your profile has been updated successfully",
                    icon: "success",
                    background: '#F4F3F0',
                    iconColor: '#331A15',
                    customClass: {
                        title: 'text-[#331A15] font-rancho text-2xl',
                        content: 'text-gray-700',
                        confirmButton: 'font-rancho text-xl',
                    }
                });

                // Update local userData state properly
                setUserData(prev => ({
                    ...prev,
                    name: name,
                    photo: photoURL
                }));

                // Exit edit mode
                setIsEditing(false);
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    text: "Failed to update profile in database",
                    icon: "error",
                    background: '#F4F3F0',
                    iconColor: '#EA4744',
                    customClass: {
                        title: 'text-[#331A15] font-rancho text-2xl',
                        content: 'text-gray-700',
                        confirmButton: 'font-rancho text-xl',
                    }
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err.message || "Failed to update profile. Please try again.",
                icon: "error",
                background: '#F4F3F0',
                iconColor: '#EA4744',
                customClass: {
                    title: 'text-[#331A15] font-rancho text-2xl',
                    content: 'text-gray-700',
                    confirmButton: 'font-rancho text-xl',
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading or error state if needed
    if (!userData && !user) {
        return (
            <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-72px)]">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-72px)]">
            <div className="flex justify-between items-center mb-8">
                <Link
                    to="/users"
                    className="inline-flex items-center gap-2 rancho text-xl text-[#374151] hover:text-[#D2B48C] transition-all duration-300 transform hover:translate-x-[-5px] group"
                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                >
                    <FaArrowLeft className="transition-transform duration-300 group-hover:transform group-hover:translate-x-[-3px]" />
                    Back to users
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-[#F4F3F0] to-[#D2B48C] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-3xl rancho text-[#331A15]" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>
                        {isEditing ? "Edit Profile" : "User Profile"}
                    </h2>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSaveProfile}
                                disabled={isSubmitting}
                                className="p-2 bg-[#4CAF50] text-white rounded-full hover:bg-[#45a049] transition-colors disabled:bg-gray-400">
                                <FaSave />
                            </button>
                            <button
                                onClick={handleToggleEdit}
                                className="p-2 bg-[#EA4744] text-white rounded-full hover:bg-[#d43832] transition-colors">
                                <FaTimes />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleToggleEdit}
                            className="p-2 bg-[#331A15] text-white rounded-full hover:bg-[#1A0D09] transition-colors">
                            <FaEdit />
                        </button>
                    )}
                </div>

                <div className="p-6 flex flex-col md:flex-row gap-8">
                    {/* Profile Photo Section */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D2B48C] shadow-lg mb-4">
                            <img
                                src={isEditing ? photoURL : (userData?.photo || user?.photoURL || 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png')}
                                alt={userData?.name || user?.displayName || "User"}
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png'}
                            />
                        </div>

                        {isEditing ? (
                            <div className="w-full">
                                <label className="block mb-2 font-medium text-gray-700">Display Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 mb-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                />

                                <label className="block mb-2 font-medium text-gray-700">Photo URL</label>
                                <input
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    placeholder="Enter photo URL"
                                />
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-semibold text-[#331A15] text-center">
                                    {userData?.name || user?.displayName || "No Name Set"}
                                </h3>
                                <div className="flex items-center gap-2 text-[#666] mt-2">
                                    <FaEnvelope className="text-[#D2B48C]" />
                                    <span>{userData?.email || user?.email}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* User Details Section */}
                    <div className="md:w-2/3 bg-[#F8F8F8] rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-4 text-[#331A15] border-b border-[#D2B48C] pb-2">
                            Account Information
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                    <FaIdCard className="text-[#D2B48C]" />
                                    User ID
                                </p>
                                <p className="text-gray-700 font-mono text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                                    {userData?._id || user?.uid || "ID not available"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                    <FaRegClock className="text-[#D2B48C]" />
                                    Account Created
                                </p>
                                <p className="text-gray-700">
                                    {userData?.creationTime || user?.metadata?.creationTime || "Not available"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                    <FaSignInAlt className="text-[#D2B48C]" />
                                    Last Sign In
                                </p>
                                <p className="text-gray-700">
                                    {userData?.lastSignInTime || user?.metadata?.lastSignInTime || "Not available"}
                                </p>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-8">
                                <Button
                                    onClick={handleSaveProfile}
                                    className={`w-full bg-[#D2B48C] text-[#331A15] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#C19A6B]'}`}
                                    variant="Square"
                                    bgNone={false}
                                    textColor="text-[#331A15]"
                                >
                                    {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;