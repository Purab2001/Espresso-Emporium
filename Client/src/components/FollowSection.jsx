import React from 'react';
const coffeeImages = Object.values(import.meta.glob('../assets/cups/Rectangle *.png', { eager: true })).map(module => module.default);

const FollowSection = () => {
    return (
        <div className='container mx-auto py-16 px-4 md:px-12'>
            <div className='text-center mb-10'>
                <p className='text-sm text-[#1B1A1A] mb-2'>Follow Us Now</p>
                <h2 className='rancho text-4xl text-[#331A15]' style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Follow on Instagram</h2>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {
                    coffeeImages.map((image, index) => (
                        <div key={index} className='overflow-hidden rounded-lg'>
                            <img src={image} alt={`Coffee image ${index + 1}`} className='w-full h-52 md:h-56 lg:h-80 object-cover hover:scale-110 transition-transform duration-300' />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FollowSection;