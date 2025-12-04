import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([])
    

    useEffect(() => {
        axios.get(`https://backend-10-eight.vercel.app/orders`)
            .then(res => {
                setMyOrders(res.data)
            })
            .catch(err => {
                console.log(err);

            })
    }, [])

    console.log(myOrders);



    return (
        <div className='p-5 '>


            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Phone No</th>
                            <th>Location</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{order?.productName}</td>
                                    <td>{order?.price}</td>
                                    <td>{order?.phone}</td>
                                    <td>{order?.address}</td>
                                    <td>{order?.quantity}</td>
                                    <td>
                                        {order?.date &&
                                            new Date(order.date).toLocaleString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyOrders;