import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../../ui/Button';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();

        // Get the form element properly
        const form = e.target.closest('form') || e.target.form || document.querySelector('form');

        if (!form) {
            console.error('Form not found');
            return;
        }

        const formData = new FormData(form);
        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const userProfile = {
                    email,
                    ...restFormData,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                }

                // Save user to the database
                fetch('https://espressoemporium.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userProfile),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('User created:', data);
                        Swal.fire({
                            title: 'Sign Up Successful!',
                            text: 'Welcome to Espresso Emporium!',
                            icon: 'success',
                            background: '#fff8f0',
                            color: '#331A15',
                            confirmButtonColor: '#D2B48C',
                            confirmButtonText: 'Continue',
                            customClass: {
                                popup: 'rounded-lg'
                            }
                        });
                        navigate('/');
                    });
            })
            .catch(error => {
                console.error('Error creating user:', {
                    error,
                    email,
                    passwordLength: password ? password.length : 0,
                    stack: error?.stack
                });
                Swal.fire({
                    title: 'Sign Up Failed',
                    text: error.message || 'An error occurred. Please try again.',
                    icon: 'error',
                    background: '#fff8f0',
                    color: '#331A15',
                    confirmButtonColor: '#D2B48C',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'rounded-lg'
                    }
                });
            });
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-4 rancho">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img
                    className="w-8 h-8 mr-2"
                    src="/logo1.png"
                    alt="Coffee Store Logo"
                />
                Espresso Emporium
            </a>
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign Up
                    </h1>
                    <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6" action="#" autoComplete="off">
                        <div>
                            <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="Photo" className="block mb-2 text-sm font-medium text-gray-900">
                                Photo Url
                            </label>
                            <input
                                type="text"
                                name="photo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Photo Url"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <Button
                            text="Sign Up"
                            type="submit"
                            className="w-full !mt-4"
                        />
                        <p className="text-sm font-light text-gray-500">
                            Already have an account yet?{' '}
                            <Link to="/sign-in" className="font-medium text-black hover:underline rancho">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;