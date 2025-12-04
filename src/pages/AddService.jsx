import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddService = () => {

    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
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
        }



        //sending data to backend
        axios.post('http://localhost:3000/services', formData)
            .then(res => {
                console.log(res)
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: "Service is created successfully",
                        icon: "success",
                        draggable: true
                    })
                    form.reset();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });

            })


    }





    return (
        <div className="max-w-xl mx-auto my-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Add Product / Pet
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="productName"
                    placeholder="Product / Pet Name"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <select
                    name="category"
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="pets">Pets</option>
                    <option value="food">Food</option>
                    <option value="accessories">Accessories</option>
                    <option value="care-products">Care Products</option>
                </select>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                ></textarea>

                <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddService;