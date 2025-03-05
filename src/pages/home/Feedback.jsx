
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import news1 from '../../assets/news/news1.webp';
import news2 from '../../assets/news/news2.webp';
import news3 from '../../assets/news/news3.webp';

// Testimonials Data
const testimonials = [
    {
        "id": 1,
        "title": "Eunice M., Nakuru",
        "description": "Fidmind has completely changed how I buy books! I found rare titles I had been searching for at unbelievably affordable prices. The quality of the books and the customer service is excellent. I’ll definitely be buying all my future reads from Fidmind!",
        "image": news1
    },
    {
        "id": 2,
        "title": "Ayub Joel, Kirinyaga",
        "description": "I ordered ‘Starts with Why’ and ‘Talking with Confidence’ from Fidmind, and I was impressed by how quickly they delivered! The books were in great condition, and the prices were unbeatable. If you love reading, Fidmind is the best place to shop!",
        "image": news2
    },
    {
        "id": 3,
        "title": "Chris M., Voi",
        "description": "As a bookworm, Fidmind is my go-to bookstore. Their collection is diverse, from self-help to fiction. The customer support is top-notch. I highly recommend Fidmind to everyone who loves books or is trying to start reading.",
        "image": news3
    }
];

const Feedback = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="py-16 text-center">
            <h2 className="text-3xl font-semibold mb-6">Fidmind Testimonials</h2>

            {/* Large Screen: Show All Testimonials */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                {testimonials.map((item, index) => (
                    <div key={index} className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
                        {/* Circular Image */}
                        <div className="w-28 h-28 bg-white rounded-full overflow-hidden shadow-lg">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-full" />
                        </div>

                        {/* Content Box */}
                        <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
                            <Link to="/">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Small Screen: Show One Testimonial at a Time with Navigation */}
            <div className="lg:hidden">
                <div className="relative flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
                    
                    {/* Circular Image */}
                    <div className="w-28 h-28 bg-white rounded-full overflow-hidden shadow-lg">
                        <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].title} className="w-full h-full object-cover rounded-full" />
                    </div>

                    {/* Content Box */}
                    <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
                        <Link to="/">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{testimonials[currentIndex].title}</h3>
                        </Link>
                        <p className="text-sm text-gray-600">{testimonials[currentIndex].description}</p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4 w-full">
                        <button onClick={handlePrev} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">← Previous</button>
                        <button onClick={handleNext} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Next →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
