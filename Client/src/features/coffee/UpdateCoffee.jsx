import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../ui/Button';

const UpdateCoffee = () => {
    const { _id, name, quantity, supplier, price, category, details, photo } = useLoaderData();

    const handleUpdateCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedCoffee = Object.fromEntries(formData.entries());

        fetch(`https://espressoemporium.vercel.app/coffees/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCoffee),
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Coffee updated successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                            background: '#F4F3F0',
                            color: '#331A15',
                            borderLeft: '5px solid #D2B48C',
                            fontFamily: 'rancho, cursive',
                            fontSize: '18px'
                        },
                    });
                }
            }).catch(error => {
                console.error('Error updating coffee:', {
                    error,
                    coffeeId: _id,
                    updatedCoffee,
                    stack: error?.stack
                });
                toast.error('Failed to update coffee!', {
                    position: "top-right",
                    autoClose: 3000,
                    style: {
                        background: '#F4F3F0',
                        color: '#EA4744',
                        borderLeft: '5px solid #EA4744',
                        fontFamily: 'rancho, cursive',
                        fontSize: '18px'
                    },
                });
            });
    }

    return (
        <div>
            <div className='container mx-auto px-4 md:px-12 py-16'>
                <ToastContainer />
                <Link
                    to="/"
                    className='inline-flex items-center gap-2 rancho text-xl text-[#374151] mb-6 hover:text-[#D2B48C] transition-all duration-300 transform hover:translate-x-[-5px] group'
                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                >
                    <FaArrowLeft className="transition-transform duration-300 group-hover:transform group-hover:translate-x-[-3px]" /> Back to home
                </Link>
                <div className='bg-[#F4F3F0] p-8 rounded-lg'>
                    <div className='text-center mb-8'>
                        <h1 className='rancho text-4xl text-[#374151] mb-4' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Update Existing Coffee Details</h1>
                        <p className='text-gray-700'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                    </div>
                    <form onSubmit={handleUpdateCoffee}>
                        <input type="hidden" name="id" value={_id} />
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={name}
                                    placeholder="Enter coffee name"
                                    className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Quantity</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    defaultValue={quantity}
                                    placeholder="Enter coffee quantity"
                                    className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Supplier</label>
                                <input
                                    type="text"
                                    name="supplier"
                                    defaultValue={supplier}
                                    placeholder="Enter coffee supplier"
                                    className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    defaultValue={price}
                                    placeholder="Enter coffee price"
                                    className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    defaultValue={category}
                                    placeholder="Enter coffee category"
                                    className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Details</label>
                                <input
                                    type="text"
                                    name="details"
                                    defaultValue={details}
                                    placeholder="Enter coffee details"
                                    className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block mb-2 font-medium text-gray-700">Photo</label>
                            <input
                                type="text"
                                name="photo"
                                defaultValue={photo}
                                placeholder="Enter photo URL"
                                className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D2B48C]"
                                required
                            />
                        </div>

                        <Button text='Update Coffee' className='w-full' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCoffee;