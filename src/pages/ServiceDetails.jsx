import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ServiceDetails = () => {


    const [services, setServices] = useState([]);
    const [serviceDetails, setServiceDetails] = useState(null)

    const { id } = useParams()




    useEffect(() => {
        fetch('/services.json')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.log(error))
    }, [])



    const findResult = services.find(singleService => singleService.serviceId == id)
    console.log(findResult)




    return (
        <div className='flex flex-col items-center px-[145px] my-10'>
            <img className='w-1/2' src={findResult?.image} alt="" />
            <div className='text-center font-bold text-3xl'>
                <p>Service Name: {findResult?.serviceName}</p>
                <p>Price: {findResult?.price}</p>
                <p>Rating: {findResult?.rating}</p>
            </div>
        </div>
    );
};

export default ServiceDetails;