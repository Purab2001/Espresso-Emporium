import React from 'react';
import { Link } from 'react-router';
import Button from '../ui/Button';
import backgroundImage from '../assets/15.jpg';

const Navbar = () => {
    return (
        <nav className="py-4 px-6" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo1.png" className='w-10 h-10' alt="Espresso Emporium Logo" />
                    <h1 className="text-white text-2xl md:text-3xl rancho">
                        Espresso Emporium
                    </h1>
                </Link>

                <div className="flex gap-4">
                    <Link to="/sign-in">
                        <Button text="Sign In" variant="Square" textColor="text-[#242222]" />
                    </Link>
                    <Link to="/sign-up">
                        <Button text="Sign Up" variant="Square" bgNone={true} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;