import React from 'react';
import vet1 from '../assets/vet1.jpg'
import vet2 from '../assets/vet2.jpg'
import vet3 from '../assets/vet3.jpg'

const MeetOurVets = () => {
    return (
        <div className='lg:w-[1250px] mx-auto mt-30'>

            <div className='my-10'>
                <h3 className='font-bold text-3xl text-center'>Meet Our Expert Vets</h3>
            </div>
            
            <div className='flex flex-col md:flex-row  gap-11'>

                <div className="card bg-base-100 w-96 mx-auto shadow-sm">
                    <figure>
                        <img className='w-full h-[250px] object-cover'
                            src={vet1}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-blue-500">Dr. Nasiruddin Shah</h2>
                        <p>Cold Weather Nutrition</p>
                        <p>8 years Exp.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary w-full">Book Appointment</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 mx-auto shadow-sm">
                    <figure>
                        <img className='w-full h-[250px] object-cover'
                            src={vet2}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-blue-500">Dr. Shi Jing Ping</h2>
                        <p>Winter Dermatology and Paw Care</p>
                        <p>6 years Exp.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary w-full">Book Appointment</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 mx-auto shadow-sm">
                    <figure>
                        <img className='w-full h-[250px] object-cover'
                            src={vet3}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-blue-500">Dr.Monica</h2>
                        <p>Pet Allergies and Dry Skin</p>
                        <p>5 years Exp.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary w-full">Book Appointment</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default MeetOurVets;