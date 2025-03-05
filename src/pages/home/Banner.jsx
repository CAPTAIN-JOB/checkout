import React from "react";
import PSY2 from "../../assets/books/PSY 2.webp";

const Banner = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={PSY2}
        alt="Books Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 bg-black/50">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">Feeding Minds</h1>
        <p className="mb-7 max-w-xl">
          Books are more than just pages—they're the foundation of lifelong
          learning and personal growth.Discover books that match your interests. Tell us what you love to read!
        </p>

        {/* Google Form Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeAMNimUJx0ATQP8Vca1VqHpSdf-K14-QBxFnVJWc6k_7RltQ/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
            Find Your Reads
          </button>
        </a>
      </div>
    </div>
  );
};

export default Banner;

