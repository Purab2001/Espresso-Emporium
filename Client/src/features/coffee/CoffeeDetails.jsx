import React from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';

const CoffeeDetails = () => {
    const coffee = useLoaderData();
    const { _id, name, photo, supplier, price, category, details, quantity } = coffee;

    return (
        <div className='container mx-auto py-16 px-4 md:px-12'>
            <div className="flex justify-between items-center mb-8">
                <Link
                    to="/"
                    className='inline-flex items-center gap-2 rancho text-xl text-[#374151] hover:text-[#D2B48C] transition-all duration-300 transform hover:translate-x-[-5px] group'
                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                >
                    <FaArrowLeft className="transition-transform duration-300 group-hover:transform group-hover:translate-x-[-3px]" />
                    Back to home
                </Link>
            </div>

            <div className='bg-[#F8F8F8] p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='w-full md:w-1/3 flex justify-center'>
                        <div className="flex justify-center items-center h-full">
                            <img
                                src={photo}
                                alt={name}
                                className="max-h-96 w-auto md:w-64 object-contain"
                            />
                        </div>
                    </div>

                    <div className='w-full md:w-2/3'>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className='rancho text-3xl text-[#331A15]' style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Niceties</h2>

                            <Link
                                to={`/update-coffee/${_id}`}
                                className='p-2 bg-[#3C393B] text-white rounded cursor-pointer hover:bg-[#2A2729] transition-colors duration-300 transform hover:scale-105 inline-flex items-center justify-center'
                            >
                                <BsPencilSquare className='text-lg' />
                            </Link>
                        </div>

                        <div className='space-y-4'>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Name:</span>
                                <span className='text-gray-700'>{name}</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Chef:</span>
                                <span className='text-gray-700'>Mr. Matin Paul</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Supplier:</span>
                                <span className='text-gray-700'>{supplier}</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Taste:</span>
                                <span className='text-gray-700'>Sweet and hot</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Price:</span>
                                <span className='text-gray-700'>{price} Taka</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Quantity:</span>
                                <span className='text-gray-700'>{quantity}</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Category:</span>
                                <span className='text-gray-700'>{category}</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='font-medium text-[#331A15] min-w-[80px]'>Details:</span>
                                <span className='text-gray-700'>{details}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeDetails;