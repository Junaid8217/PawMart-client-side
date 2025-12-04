import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const ServiceDetails = () => {


    const [service, setService] = useState([]);
    const { id } = useParams()


    const { user } = useContext(AuthContext)






    useEffect(() => {
        fetch(`https://backend-10-eight.vercel.app/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
            .catch(error => console.log(error))
    }, [id])

    const handleOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value
        const buyerName = form.buyerName.value
        const buyerEmail = form.buyerEmail.value
        const quantity = parseInt(form.quantity.value)
        const price = parseInt(form.price.value)
        const address = form.address.value
        const phone = form.phone.value
        const additionalNote = form.additionalNote.value




        const formData = {
            productId: id,
            productName,
            buyerName,
            buyerEmail,
            quantity,
            price,
            address,
            phone,
            additionalNote,
            date: new Date(),
        }

        console.log(formData);


        axios.post('https://backend-10-eight.vercel.app/orders', formData)
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);

            })

    }








    return (
        <div className='flex flex-col items-center px-[145px] my-10'>
            <img className='w-1/2' src={service?.image} alt="" />
            <div className='text-center font-bold text-3xl'>
                <p>Service Name: {service?.productName}</p>
                <p>Price: {service?.price}</p>
                <p>Category: {service?.category}</p>
            </div>



            <button className="btn my-5" onClick={() => document.getElementById('my_modal_3').showModal()}>Adapt/Order</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                    {/* Close button */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>


                    <form onSubmit={handleOrder} className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                        <legend className="fieldset-legend">Order Details</legend>

                        <label className="label">Product Name</label>
                        <input name='productName' readOnly defaultValue={service?.productName} type="text" className="input" placeholder="Product" />

                        <label className="label">Buyer Name</label>
                        <input name='buyerName' defaultValue={user?.displayName} type="text" className="input" placeholder="Buyer Name" />

                        <label className="label">Buyer Email</label>
                        <input name='buyerEmail' readOnly defaultValue={user?.email} type="email" className="input" placeholder="Buyer Email" />

                        <label className="label">Quantity</label>
                        <input required name='quantity' type="number" className="input" placeholder="Quantity" />

                        <label className="label">Price</label>
                        <input name='price' readOnly defaultValue={service?.price} type="number" className="input" placeholder="Price" />

                        <label className="label">Address</label>
                        <input required name='address' type="text" className="input" placeholder="Address" />

                        <label className="label">Phone</label>
                        <input required name='phone' type="text" className="input" placeholder="Phone" />

                        <label className="label">Additional Note</label>
                        <textarea name='additionalNote' type="text" className="input" placeholder="Additional Note" />

                        <button type='submit' className="btn btn-primary">Order</button>

                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ServiceDetails;