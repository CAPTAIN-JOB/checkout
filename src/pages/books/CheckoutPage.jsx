//import React, { useState } from 'react'
//import { useSelector } from 'react-redux';
//import { useForm } from "react-hook-form"
//import { Link, useNavigate } from 'react-router-dom';
//import { useAuth } from '../../context/AuthContext';
//
//
//import Swal from 'sweetalert2';
//import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
//import axios from 'axios';
//
//
//const CheckoutPage = () => {
//    const cartItems = useSelector(state => state.cart.cartItems) || []
//    console.log(cartItems)
//
//    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity || 0), 0).toFixed(2);
//
//
//    const { currentUser } = useAuth()
//    const { register, handleSubmit, watch, } = useForm()
//
//    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
//    const navigate = useNavigate();
//
//    const [isChecked, setIsChecked] = useState(false)
//
//    const onSubmit = async (data) => {
//        const newOrder = {
//            name: data.name,
//            email: currentUser?.email,
//            address: {
//                city: data.city,
//                country: data.country,
//                state: data.state,
//                zipcode: data.zipcode
//            },
//            phone: data.phone,
//            products: cartItems.map(item => ({
//                id: item._id,
//                title: item.title,
//                quantity: item.quantity,
//                price: item.price,
//            })),
//            totalPrice: parseFloat(totalPrice),
//        };
//
//        try {
//            const orderResponse = await createOrder(newOrder).unwrap();
//            console.log(orderResponse);
//
//            // Initiate M-Pesa STK Push
//            const paymentResponse = await axios.post("http://localhost:5000/api/mpesa/buyBook", {
//
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify({
//                    phoneNumber: "254748292218",
//                    amount: parseFloat(totalPrice),
//                    orderId: orderResponse.id
//                })
//            });
//
//
//            const result = await paymentResponse.json();
//
//            if (result.success) {
//                Swal.fire({
//                    title: "M-Pesa Payment",
//                    text: "Enter your M-Pesa PIN on your phone to complete the payment",
//                    icon: "success",
//                    confirmButtonColor: "#3085d6",
//                    confirmButtonText: "Okay"
//                });
//
//                navigate("/orders"); // Redirect after payment
//            } else {
//                throw new Error("M-Pesa Payment Failed");
//            }
//        } catch (error) {
//            console.error("Error placing order:", error);
//            alert("Failed to place order or initiate payment");
//        }
//    };
//
//    if (isLoading) return <div>Loading..</div >
//    return (
//        <section>
//            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//                <div className="container max-w-screen-lg mx-auto">
//                    <div>
//                        <div>
//                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Order</h2>
//                            <p className="text-gray-500 mb-2">Total Price: ksh{totalPrice}</p>
//                            <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
//                        </div>
//
//
//                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
//                                <div className="text-gray-600">
//                                    <p className="font-medium text-lg">Personal Details</p>
//                                    <p>Please fill out all the fields.</p>
//                                </div>
//
//                                <div className="lg:col-span-2">
//                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
//                                        <div className="md:col-span-5">
//                                            <label htmlFor="full_name">Full Name</label>
//                                            <input
//                                                {...register("name", { required: true })}
//                                                type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                                        </div>
//
//                                        <div className="md:col-span-5">
//                                            <label htmlFor="email">Email Address</label>
//
//
//                                            <input {...register("email")} type="text" name="email" defaultValue={currentUser?.email}
//                                                disabled
//                                                id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                                                placeholder="email@domain.com" />
//                                        </div>
//                                        <div className="md:col-span-5">
//                                            <label html="phone">Phone Number</label>
//                                            <input
//                                                {...register("phone", { required: true })}
//                                                type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+254712345678" />
//                                        </div>
//
//                                        <div className="md:col-span-3">
//                                            <label htmlFor="address">Address / Street</label>
//                                            <input
//                                                {...register("address", { required: true })}
//                                                type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
//                                        </div>
//
//                                        <div className="md:col-span-2">
//                                            <label htmlFor="city">City/Town</label>
//                                            <input
//                                                {...register("city", { required: true })}
//                                                type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
//                                        </div>
//
//                                        <div className="md:col-span-2">
//                                            <label htmlFor="country">Country </label>
//                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
//                                                <input
//                                                    {...register("country", { required: true })}
//                                                    name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
//                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
//                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
//                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
//                                                    </svg>
//                                                </button>
//                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
//                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
//                                                </button>
//                                            </div>
//                                        </div>
//
//                                        <div className="md:col-span-2">
//                                            <label htmlFor="state">District</label>
//                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
//                                                <input
//                                                    {...register("state", { required: true })}
//                                                    name="state" id="state" placeholder="District" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
//                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
//                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//
//                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
//                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
//                                                    </svg>
//                                                </button>
//                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
//                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
//                                                </button>
//                                            </div>
//                                        </div>
//
//                                        <div className="md:col-span-5 mt-4">
//                                            <p className="font-medium text-lg mb-2">Order Details</p>
//
//                                            <div className="flex justify-between font-semibold text-gray-700 bg-gray-200 p-2 rounded">
//                                                <span className="w-1/2">Book Title</span>
//                                                <span className="w-1/4 text-center">Quantity</span>
//                                                <span className="w-1/4 text-right">Price</span>
//                                            </div>
//
//                                            {cartItems.map((item, index) => (
//                                                <div key={item._id} className="flex justify-between border-b p-2 items-center">
//                                                    <span className="w-1/2 truncate">{item.title}</span>
//                                                    <span className="w-1/4 text-center">{item.quantity}</span>
//                                                    <span className="w-1/4 text-right">Ksh {item.newPrice * item.quantity}</span>
//                                                </div>
//                                            ))}
//                                        </div>
//
//
//                                        <div className="md:col-span-5 mt-3">
//                                            <div className="inline-flex items-center">
//                                                <input
//                                                    onChange={(e) => setIsChecked(e.target.checked)}
//                                                    type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
//                                                <label htmlFor="billing_same" className="ml-2 ">I am agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
//                                            </div>
//                                        </div>
//
//                                        <div className="md:col-span-5 text-right">
//                                            <div className="inline-flex items-end">
//
//                                                <button
//                                                    onClick={onSubmit}
//
//                                                    disabled={!isChecked}
//                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place Order</button>
//
//
//                                            </div>
//                                        </div>
//
//                                    </div>
//
//                                </div>
//                            </form>
//                        </div>
//
//
//
//                    </div>
//
//
//                </div>
//            </div>
//        </section>
//    )
//}
//
//export default CheckoutPage
//
//
import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        district: '',
        agree: false,
        isProcessing: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agree) {
            alert('You must agree to the terms and conditions');
            return;
        }

        setFormData((prevData) => ({ ...prevData, isProcessing: true }));

        const orderData = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            district: formData.district,
            totalAmount: 800, // Example total price
            paymentMethod: 'Cash On Order',
        };
        console.log("Order Data:", orderData);

        try {
            const response = await axios.post('https://fidmindbookstore.onrender.com/api/orders', orderData);
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Order submission failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setFormData((prevData) => ({ ...prevData, isProcessing: false }));
        }
    };

    return (
        <div className="checkout-container">
            <h2>Cash On Order</h2>
            <p>Total Price: Ksh800.00</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address / Street" onChange={handleChange} required />
                <input type="text" name="city" placeholder="City/Town" onChange={handleChange} required />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
                <input type="text" name="district" placeholder="District" onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="agree" onChange={handleChange} /> I agree to the Terms & Conditions
                </label>
                <button type="submit" disabled={formData.isProcessing}>
                    {formData.isProcessing ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
