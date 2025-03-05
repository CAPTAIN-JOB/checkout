import React from 'react'
import aboutUsImage from "../assets/story.jpg";
import profile from "../assets/books/profile.jpg";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Our Story Section */}
      <h1 className="text-2xl font-bold mb-6 text-blue-500">Fidmind Story</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Side - Text */}
        <div className="md:w-1/2 w-full">
          <p className="text-lg mb-4">
           At Fidmind, we believe that books have the power to inspire, connect, and transform lives. Motivated by the challenge of finding quality books at affordable prices, 
           we created a space where books are accessible to everyone.What started as a small online bookstore at university is evolving into a community-driven platform.
            Fidmind integrated a book club to foster deeper connections, offering a space for people to come together and reflect on the books they read.
            We aim to expand the reach of books, ideas, and shared learning experiences, continuing vision of making books afforadable, available and a tool for growth and connection.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 w-full">
           <img
                src={aboutUsImage}
                alt="Francis Ikonge"
                className="w-84 h-80 rounded-full mx-auto mb-4"
              />
        </div>
      </div>

      {/* Our Mission Section (Full Width) */}
      <div className="w-full bg-gray-100 py-16 px-4 mt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-500 mb-6">Fidmind Mission</h2>
          <p className="text-lg max-w-4xl mx-auto">
             Inspire, connect, and empower readers by providing affordable, high-quality books accessible in all formats.
          </p>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="w-full bg-white py-16 px-4 mt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-500 mb-6">Fidmind Team</h2>
          
          {/* Team Member: Francis Ikonge */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/3 w-full">
              <img
                src={profile}
                alt="Francis Ikonge"
                className="w-60 h-60 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-500">Francis Ikonge</h3>
              <p className="text-md text-gray-700">Founder, I.T Enthusiast <br/>Teacher (Physics & Chemistry)</p>

              {/* LinkedIn Link */}
              <a 
                href="https://www.linkedin.com/in/ikonge-francis/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="w-full bg-gray-100 py-16 px-4 mt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-500 mb-6">Contact Us</h2>
          <p className="text-lg max-w-4xl mx-auto">
            Have any questions or need assistance? Feel free to get in touch with us! We are always happy to help.
          </p>

          {/* Contact Info */}
          <div className="mt-6">
            <p className="text-lg text-gray-700">Location:Nakuru, Kenya</p>
            <p className="text-lg text-gray-700">Phone: +254 708 432 543</p>
            <p className="text-lg text-gray-700">Email:fidmindbooks1@gmail.com</p>
            <p className="text-lg text-gray-700">Website: <a href="https://xyztest-1.onrender.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">www.fidmindbooks.com</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

