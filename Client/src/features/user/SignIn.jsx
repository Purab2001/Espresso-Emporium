import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { AuthContext } from '../../contexts/AuthContext';
import { auth } from '../../firebase/firebase.init';
import Button from '../../ui/Button';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');

        signIn(email, password)
            .then(result => {
                console.log('User signed in successfully', result.user);
                const signInInfo = {
                    email,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                }
                axios.patch('https://espressoemporium.vercel.app/users', signInInfo, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        console.log('User sign-in time updated successfully', response.data);
                    })
                    .catch(err => {
                        console.error('Error updating user sign-in time:', err);
                    });
                navigate('/');
            })
            .catch(error => {
                console.error('Sign in error:', {
                    error,
                    email,
                    passwordLength: password ? password.length : 0,
                    stack: error?.stack
                });
                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    setError('Incorrect email or password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    setError('No user found with this email.');
                } else {
                    setError(error.message);
                }
            });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setResetMessage('');
        setError('');
        if (!email) {
            setError('Please enter your email to reset password.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setResetMessage('Password reset email sent! Check your inbox.');
        } catch (err) {
            console.error('Forgot password error:', {
                err,
                email,
                stack: err?.stack
            });
            setError(err.message);
        }
    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0 rancho">
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
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn} autoComplete="off">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-sm font-medium text-primary-600 hover:underline rancho"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {resetMessage && <p className="text-green-600 text-sm mt-2">{resetMessage}</p>}

                            <Button
                                text="Sign In"
                                onClick={handleSignIn}
                                className="w-full !mt-4"
                            />

                            <p className="text-sm font-light text-gray-500">
                                Don't have an account yet?{' '}
                                <Link to="/sign-up" className="font-medium text-black hover:underline rancho">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;