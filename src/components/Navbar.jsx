import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import avatarImg from '../assets/avatar.png';  // Import avatar image
import axios from 'axios';  // Import axios to fetch search results

const navigation = [
     { name: "About Us", href: "/about" },
    { name: "Admin", href: "/admin" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" }
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");  // Manage search query state
  const [filteredBooks, setFilteredBooks] = useState([]);  // To store filtered books from backend
  const cartItems = useSelector(state => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;  // Avoid sending empty query to backend
    try {
      // Make an API request to the backend with the search query
      const response = await axios.get(`https://fidmindbookstore.onrender.com/api/books?query=${query}`);
      setFilteredBooks(response.data); // Set filtered books in state
    } catch (error) {
      console.error("Error fetching filtered books", error);
    }
  };

  // Handle when a book title is clicked
  const handleBookClick = () => {
    setFilteredBooks([]);  // Clear the search results after a book is selected
    setQuery("");  // Optionally clear the query
  };

  return (
    <header className='max-w-screen-2xl px-4 py-6'>
      <nav className='flex justify-between items-center'>
        {/* A.left side */}
        <div className='flex items-center md:gap-16 gap-4'>
          {/* Logo */}
          <Link to="/" className="text-3xl font-semibold text-blue-500 sm:text-md">
            fidmind
          </Link>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative sm:w-54 w-70 space-x-2 flex items-center">
            <IoSearchOutline className="absolute left-3 sm:left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-slate-100 w-full py-2 pl-10 sm:pl-8 md:pl-10 rounded-md focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}  // Update query on input change
            />
          </form>
        </div>

        {/* B.right side */}
        <div className='relative flex items-center md:space-x-3 space-x-2'>
          <div>
            {currentUser ? (
              <>
                {/* Avatar Button (Clickable) */}
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}  // Use the imported avatar image
                    alt="User Avatar"
                    className={`size-4 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''} sm:w-10 sm:h-10 w-8 h-8`}
                  />
                </button>
                {/* Show dropdown */}
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                    <ul className='py-2'>
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="login"><HiOutlineUser className='size-6' /></Link>
            )}
          </div>

          {/* Heart Icon */}
          <button className='hidden sm:block'>
            <HiOutlineHeart className='size-6' />
          </button>

          {/* Cart */}
          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm ml-4 sm:ml-6">
            <HiOutlineShoppingCart className='' />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Display filtered books if any */}
      {filteredBooks.length > 0 && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-40">
          <ul className="py-2 max-h-60 overflow-y-auto">
            {filteredBooks.map((book) => (
              <li key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                  onClick={handleBookClick}  // Hide the search results when clicking a book title
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;




