import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Mpesa = () => {
    
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        
        if (!phone || !amount) {
            Swal.fire("Error", "Please enter phone number and amount", "error");
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.post("https://fidmindbookstore.onrender.com/api/mpesa/stkpush", {
                phone,
                amount,
            });
            
            if (response.data) {
                Swal.fire("Success", "M-Pesa STK Push Sent. Check your phone to complete payment.", "success");
                navigate("/order-confirmation"); // Redirect after payment
            }
        } catch (error) {
            Swal.fire("Payment Failed", "Something went wrong. Try again.", "error");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">M-Pesa Payment</h2>
                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Amount</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Mpesa;


