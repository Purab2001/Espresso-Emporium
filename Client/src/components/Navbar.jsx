import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import backgroundImage from '../assets/15.jpg';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, mongoUser, logOut } = useContext(AuthContext); // Add mongoUser
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#D2B48C",
            cancelButtonColor: "#EA4744",
            confirmButtonText: "Yes, log me out!",
            background: '#F4F3F0',
            iconColor: '#331A15',
            customClass: {
                title: 'text-[#331A15] font-rancho text-2xl',
                content: 'text-gray-700',
                confirmButton: 'font-rancho text-xl',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Logged Out!",
                            text: "You have been successfully logged out",
                            icon: "success",
                            background: '#F4F3F0',
                            iconColor: '#331A15',
                            customClass: {
                                title: 'text-[#331A15] font-rancho text-2xl',
                                content: 'text-gray-700',
                                confirmButton: 'font-rancho text-xl',
                            }
                        });
                        console.log('User logged out');
                    })
                    .catch(error => {
                        console.error('Logout error:', {
                            error,
                            user: user ? { email: user.email, uid: user.uid } : null,
                            stack: error?.stack
                        });
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to log out. Please try again.",
                            icon: "error",
                            background: '#F4F3F0',
                            iconColor: '#EA4744',
                            customClass: {
                                title: 'text-[#331A15] font-rancho text-2xl',
                                content: 'text-gray-700',
                                confirmButton: 'font-rancho text-xl',
                            }
                        });
                    });
            }
        });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle click outside of dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="py-4 px-6" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo aligned to the left */}
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo1.png" className='w-10 h-10' alt="Espresso Emporium Logo" />
                    <h1 className="text-white text-2xl md:text-3xl rancho">
                        Espresso Emporium
                    </h1>
                </Link>

                {/* Auth buttons or user profile on the right */}
                <div className="flex items-center">
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* User Avatar with Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center focus:outline-none cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600">
                                        <img
                                            src={mongoUser?.photo || user.photoURL || 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png'}
                                            alt={mongoUser?.name || user.displayName || 'User'}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png';
                                            }}
                                        />
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm text-gray-500 border-b">
                                                {mongoUser?.name || user?.displayName || 'User'}
                                            </div>
                                            <Link
                                                to="/users"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Users
                                            </Link>
                                            <Link
                                                to={`/user-details/email/${user?.email}`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                User Details
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-amber-300 transition-colors cursor-pointer"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/sign-in">
                                <Button text="Sign In" variant="Square" textColor="text-[#242222]" />
                            </Link>
                            <Link to="/sign-up">
                                <Button text="Sign Up" variant="Square" bgNone={true} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;