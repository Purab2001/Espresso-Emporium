import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import OrderModal from '../order/OrderModal';

const CoffeeCard = ({ coffee, setCoffees, coffees }) => {
    const { _id, name, supplier, category, photo, price } = coffee;
    const [orderModalOpen, setOrderModalOpen] = useState(false);

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this coffee!",
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
                fetch(`https://espressoemporium.vercel.app/coffees/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const remaining = coffees.filter(cof => cof._id !== _id);
                            setCoffees(remaining);

                            Swal.fire({
                                title: "Coffee Deleted Successfully",
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
                    });
            }
        });
    };

    const openOrderModal = () => {
        setOrderModalOpen(true);
    }

    const closeOrderModal = () => {
        setOrderModalOpen(false);
    }

    return (
        <>
            <div className='bg-[#F8F8F8] p-6 rounded-lg flex flex-col md:flex-row items-center gap-6'>
                <img src={photo} alt={name} className='w-40 h-52 object-contain' />

                <div className='flex-grow'>
                    <div className='space-y-2'>
                        <p><span className='font-semibold'>Name:</span> <span className='text-gray-600'>{name}</span></p>
                        <p><span className='font-semibold'>Supplier:</span> <span className='text-gray-600'>{supplier}</span></p>
                        <p><span className='font-semibold'>Category:</span> <span className='text-gray-600'>{category}</span></p>
                        <p><span className='font-semibold'>Price:</span> <span className='text-gray-600'>{price} Taka</span></p>
                    </div>
                </div>

                <div className='flex md:flex-col gap-2'>
                    <Link to={`/coffee/${_id}`} className='p-2 bg-[#D2B48C] text-white rounded cursor-pointer hover:bg-[#C19A6B] transition-colors duration-300 transform hover:scale-105 inline-flex items-center justify-center'>
                        <BsEye className='text-lg' />
                    </Link>
                    <Link
                        to={`/update-coffee/${_id}`}
                        className='p-2 bg-[#3C393B] text-white rounded cursor-pointer hover:bg-[#2A2729] transition-colors duration-300 transform hover:scale-105 inline-flex items-center justify-center'
                    >
                        <BsPencilSquare className='text-lg' />
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className='p-2 bg-[#EA4744] text-white rounded cursor-pointer hover:bg-[#d43832] transition-colors duration-300 transform hover:scale-105'
                    >
                        <BsTrash className='text-lg' />
                    </button>
                    <button
                        className='p-2 bg-[#331A15] text-white rounded cursor-pointer hover:bg-[#C19A6B] transition-colors duration-300 transform hover:scale-105 flex items-center justify-center'
                        title="Order"
                    >
                        <FaShoppingCart onClick={openOrderModal} className='text-lg' />
                    </button>
                </div>
            </div>
            <OrderModal open={orderModalOpen} handleClose={closeOrderModal} coffee={coffee} />
        </>
    );
};

export default CoffeeCard;