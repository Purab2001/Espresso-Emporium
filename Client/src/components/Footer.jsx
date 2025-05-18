import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import backgroundImage from '../assets/13.jpg';
import copyrightImage from '../assets/24.jpg';

const Footer = () => {
    return (
        <footer className='py-16 relative bg-cover bg-center' style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className='container mx-auto px-4 md:px-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <div>
                        <div>
                            <img src="/logo1.png" alt="Coffee logo" className='w-16 h-16 mb-4' />
                            <h3 className='rancho text-3xl text-[#331A15] mb-4' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Espresso Emporium</h3>
                            <p className='text-[#1B1A1A] mb-6'>Always ready to be your friend. Come & Contact with us to share your memorable moments, to share with your best companion.</p>
                        </div>
                        <div className='flex space-x-4 mb-8'>
                        {[
                                { icon: <FaFacebookF />, url: "https://facebook.com" },
                                { icon: <FaTwitter />, url: "https://twitter.com" },
                                { icon: <FaInstagram />, url: "https://instagram.com" },
                                { icon: <FaLinkedinIn />, url: "https://linkedin.com" }
                            ].map((social, index) => (
                                <div key={index}>
                                    <Link
                                        to={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group w-8 h-8 bg-white flex items-center justify-center rounded-full border border-[#331A15] hover:bg-[#331A15] transition-all duration-300 transform hover:scale-110"
                                    >
                                        <div
                                            className="text-[#331A15] transition-colors duration-300 group-hover:text-white"
                                        >
                                            {social.icon}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className='rancho text-3xl text-[#331A15] mb-4' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Get In Touch</h3>
                            <div className='space-y-3'>
                            {[
                                    { icon: <FaPhone />, text: "+88 01533 333 333" },
                                    { icon: <FaEnvelope />, text: "info@gmail.com" },
                                    { icon: <FaMapMarkerAlt />, text: "72, Wall street, King Road, Dhaka" }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="text-[#331A15]">{item.icon}</span>
                                        <span className="text-[#1B1A1A]">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='rancho text-3xl text-[#331A15] mb-6' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Connect with Us</h3>
                        <form>
                            <div className='space-y-4'>
                                <input type="text" placeholder='Name' className='w-full px-4 py-2 bg-white rounded focus:outline-none focus:border-[#331A15]' />
                                <input type="email" placeholder='Email' className='w-full px-4 py-2 bg-white rounded focus:outline-none focus:border-[#331A15]' />
                                <textarea placeholder='Message' className='w-full px-4 py-2 bg-white focus:outline-none focus:border-[#331A15] h-32'></textarea>
                                <button
                                    type='submit'
                                    className="px-6 py-2 border-2 border-[#331A15] rounded rancho text-lg cursor-pointer relative overflow-hidden group"
                                >
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Send Message</span>
                                    <span className="absolute inset-0 bg-[#331A15] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-white py-2 text-center"
                style={{ backgroundImage: `url(${copyrightImage})` }}>
                <p className='text-sm rancho'>Copyright Espresso Emporium | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;