import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router';
import { FaCoffee } from 'react-icons/fa';
import Button from '../ui/Button';
import CoffeeCard from '../features/coffee/CoffeeCard';

const Home = () => {
    const loadedCoffees = useLoaderData();
    const [coffees, setCoffees] = useState(loadedCoffees);

    return (
        <div className='container mx-auto my-16 px-4 md:px-12'>

                <div id="coffee-cards-section" className='text-center mb-10'>
                    <p className='rancho text-xl'>--- Sip & Savor ---</p>
                    <h2 className='rancho text-5xl text-[#331A15]' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Our Popular Products</h2>

                    <div className='mt-6'>
                        <Link to="/addCoffee">
                            <Button
                                text="Add Coffee"
                                icon={<FaCoffee />}
                                className="px-4"
                            />
                        </Link>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {coffees.map(coffee => (
                        <CoffeeCard
                            key={coffee._id}
                            coffee={coffee}
                            coffees={coffees}
                            setCoffees={setCoffees}
                        />
                    ))}
                </div>
        </div>
    );
};

export default Home;