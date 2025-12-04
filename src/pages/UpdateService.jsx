import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const UpdateService = () => {

    const {user} = useContext(AuthContext)
    const {id} = useParams();
    const [service, setService] = useState()
    const [category, setCategory] = useState(service?.category)
    const navigation = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3000/services/${id}`)
        .then(res => {
            setService(res.data)
            setCategory(res.data.category)
        })
     
        
    }, [id])

    console.log(service)

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const productName = form.productName.value;
        const category = form.category.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = form.date.value;
        const email = form.email.value;


        const formData = {

            productName,
            category,
            price,
            location,
            description,
            image,
            date,
            email,
            createdAt: service?.createdAt
        }
        console.log(formData);

        axios.put(`http://localhost:3000/update/${id}`, formData)
        .then(res => {
            console.log(res.data)
            navigation('/my-services')
        })
        .catch(err=>{
            console.log(err);
            
        })

    }
    


    return (
        <div className="max-w-xl mx-auto my-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Update Listing
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">

                <input
                    defaultValue={service?.productName}
                    type="text"
                    name="productName"
                    placeholder="Product / Pet Name"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <select
                    value={category}
                    name="category"
                    className="w-full border px-3 py-2 rounded"
                    onChange={(e)=>setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="pets">Pets</option>
                    <option value="food">Food</option>
                    <option value="accessories">Accessories</option>
                    <option value="care-products">Care Products</option>
                </select>

                <input
                    defaultValue={service?.price}
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    defaultValue={service?.location}
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <textarea
                    defaultValue={service?.description}
                    name="description"
                    placeholder="Description"
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                ></textarea>

                <input
                    defaultValue={service?.image}
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    defaultValue={service?.date}
                    type="date"
                    name="date"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                {/* Automatically filled user email */}
                <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    readOnly
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateService;