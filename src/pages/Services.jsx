import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react"

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('./services.json')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.log(error))
    }, [])

    return (

        <div className='max-w-[1250px] w-full mx-auto'>
    <h3 className='font-bold text-3xl text-center mt-6 mb-10 text-blue-700'>All The Services</h3>

    <div className='grid grid-cols-1 md:grid-cols-3 mt-5 my-5 gap-10'>
        {
            services.map(service =>
                <motion.div initial={{ scale: 0 }} animate={{
                    scale: 1,
                    transition: { duration: 1 }
                }} className="card bg-base-100 w-full max-w-[450px] mx-auto shadow-2xl">
                    <figure>
                        <img className='w-full h-[300px] object-cover'
                            src={service?.image}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{service?.serviceName}</h2>
                        <div className='flex justify-between'>
                            <p>Price: {service?.price}</p>
                            <p>Rating: {service?.rating}</p>
                        </div>
                        <div className="card-actions justify-end">
                            <Link to={`/details/${service?.serviceId}`}><button className="btn btn-primary">View Details</button></Link>
                        </div>
                    </div>
                </motion.div>
            )
        }
    </div>
</div>

    );
};

export default Services;