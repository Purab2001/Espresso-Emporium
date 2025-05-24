import React, { useState, useContext } from 'react';
import { BsEye, BsTrash } from 'react-icons/bs';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const Users = () => {
    // Fetch users from the server and set up state
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);
    const { deleteUserAccount, auth } = useContext(AuthContext);

    const handleDelete = (_id, email) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#D2B48C",
            cancelButtonColor: "#EA4744",
            confirmButtonText: "Yes, delete it!",
            background: '#F4F3F0',
            iconColor: '#331A15',
            customClass: {
                title: 'text-[#331A15] font-rancho text-2xl',
                content: 'text-gray-700',
                confirmButton: 'font-rancho text-xl',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // First delete from database
                axios.delete(`https://espressoemporium.vercel.app/users/${_id}`)
                    .then(response => {
                        const data = response.data;
                        if (data.deletedCount) {
                            // If user exists in Firebase, delete from Firebase too
                            const currentUser = auth.currentUser;
                            if (currentUser && currentUser.email === email) {
                                deleteUserAccount(currentUser)
                                    .then(() => {
                                        console.log("User deleted from Firebase");
                                    })
                                    .catch((error) => {
                                        console.error("Error deleting Firebase user:", {
                                            error,
                                            userId: _id,
                                            email,
                                            stack: error?.stack
                                        });
                                    });
                            }

                            // Remove from UI
                            const remaining = users.filter(user => user._id !== _id);
                            setUsers(remaining);

                            Swal.fire({
                                title: "User Deleted Successfully",
                                icon: "success",
                                background: '#F4F3F0',
                                iconColor: '#331A15',
                                customClass: {
                                    title: 'text-[#331A15] font-rancho text-2xl',
                                    content: 'text-gray-700',
                                    confirmButton: 'font-rancho text-xl',
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting user from database:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete user. Please try again.",
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
    }

    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-72px)]">
            <h2 className="text-4xl mb-4 rancho text-center"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Users</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Last Signed In</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id || index}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photo || 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png'}
                                                    alt="User Avatar"
                                                    className='rounded-full'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name || 'User Name'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email || 'email'}
                                </td>
                                <td>{user.creationTime || 'Unknown'}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/user-details/email/${user?.email}`}
                                            className='p-2 bg-[#D2B48C] text-white rounded cursor-pointer hover:bg-[#C19A6B] transition-colors duration-300 transform hover:scale-105 inline-flex items-center justify-center'
                                        >
                                            <BsEye className='text-lg' />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user._id, user.email)}
                                            className='p-2 bg-[#EA4744] text-white rounded cursor-pointer hover:bg-[#d43832] transition-colors duration-300 transform hover:scale-105'
                                        >
                                            <BsTrash className='text-lg' />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;