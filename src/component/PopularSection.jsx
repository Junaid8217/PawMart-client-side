import React, { useEffect, useState } from 'react';

const PopularSection = () => {


    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('./services.json')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.log(error))
    }, [])

    console.log(services);







    return (
        <div className='mt-8 lg:px-[145px]'>
    <div>
        <h3 className='font-bold text-3xl text-center'>
            Popular Winter Care Services
        </h3>
    </div>

    <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 mt-5 my-5 gap-10 justify-center'>
            {
                services.map(service =>
                    <div className="card bg-base-100 w-full max-w-[450px] mx-auto shadow-2xl">
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
                                <button className="btn btn-primary">View Details</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
</div>

    );
};

export default PopularSection;