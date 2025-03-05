import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {orders.length === 0 ? (
                <div>No orders found!</div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={order._id || index} className="border-b mb-4 pb-4">
                            <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                            <h2 className="font-bold">Order ID: {order._id}</h2>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Email: {order.email}</p>
                            <p className="text-gray-600">Phone: {order.phone}</p>
                            <p className="text-gray-600">Total Price: ksh{order.totalPrice}</p>
                            
                            {order.address && (
                                <>
                                    <h3 className="font-semibold mt-2">Address:</h3>
                                    <p>{order.address.city}, {order.address.district}, {order.address.country}</p>
                                </>
                            )}

                            {/* Display Products */}
                            <h3 className="font-semibold mt-2">Ordered Books:</h3>
                            {Array.isArray(order.products) && order.products.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {order.products.map((product, i) => (
                                        <li key={i}>
                                            <p className="text-gray-600"><strong>Title:</strong> {product.title}</p>
                                            <p className="text-gray-600"><strong>Quantity:</strong> {product.quantity}</p>
                                            <p className="text-gray-600"><strong>Price:</strong> Ksh {product.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No products found in this order.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;

