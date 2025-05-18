import React from 'react';
import Button from '../ui/Button';
import coffeeIcon1 from '../assets/icons/1.png';
import coffeeIcon2 from '../assets/icons/2.png';
import coffeeIcon3 from '../assets/icons/3.png';
import coffeeIcon4 from '../assets/icons/4.png';
import backgroundImage from '../assets/3.png';

const Header = () => {
    const handleLearnMoreClick = () => {
        const coffeeSection = document.getElementById('coffee-cards-section');
        if (coffeeSection) {
            coffeeSection.scrollIntoView({behavior:'smooth'});
        }
    }

    return (
        <div>
            <div className='bg-cover bg-center h-[700px] relative' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className='absolute inset-0 flex items-center'>
                    <div className='container mx-auto px-4 md:px-12'>
                        <div className='md:ml-auto md:w-1/2 text-white text-center md:text-left space-y-5'>
                            <h1 className='rancho text-4xl md:text-5xl'>Would you like a Cup of Delicious Coffee?</h1>
                            <p className='max-w-md mx-auto md:mx-0'>It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of every moment!! Enjoy the beautiful moments and make them memorable.</p>
                            <Button onClick={handleLearnMoreClick} text='Learn More' variant='Square' textColor='text-[#242222]' className='text-lg' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#ECEAE3] py-12'>
                <div className='container mx-auto px-4 md:px-12'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>
                                <img src={coffeeIcon1} alt="Coffee Cup" className='w-16 h-16' />
                            </div>
                            <h3 className='rancho text-2xl text-[#331A15] mb-2'>Awesome Aroma</h3>
                            <p className='text-[#1B1A1A] text-sm'>You will definitely be a fan of the design & aroma of your coffee</p>
                        </div>
                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>
                                <img src={coffeeIcon2} alt="Quality Badge" className='w-16 h-16' />
                            </div>
                            <h3 className='rancho text-2xl text-[#331A15] mb-2'>High Quality</h3>
                            <p className='text-[#1B1A1A] text-sm'>We served the coffee to you maintaining the best quality</p>
                        </div>
                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>
                                <img src={coffeeIcon3} alt="Coffee Beans" className='w-16 h-16' />
                            </div>
                            <h3 className='rancho text-2xl text-[#331A15] mb-2'>Pure Grades</h3>
                            <p className='text-[#1B1A1A] text-sm'>The coffee is made of the green coffee beans which you will love</p>
                        </div>
                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>
                                <img src={coffeeIcon4} alt="Coffee To Go" className='w-16 h-16' />
                            </div>
                            <h3 className='rancho text-2xl text-[#331A15] mb-2'>Proper Roasting</h3>
                            <p className='text-[#1B1A1A] text-sm'>Your coffee is brewed by first roasting the green coffee beans</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;