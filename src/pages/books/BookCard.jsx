import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 h-full flex flex-col border p-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-full sm:justify-center gap-3">

        {/* Image Section */}
        <div className="sm:h-64 h-48 w-full sm:w-40 flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book.title}
              className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between h-full w-full">
          {/* Book Title */}
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xs sm:text-sm font-semibold hover:text-blue-600 mb-1 leading-tight line-clamp-2">
              {book.title}
            </h3>
          </Link>

          {/* Author Section */}
           <p className="text-gray-700 text-xs sm:text-sm font-medium mb-1">
            Author: <span className="text-blue-600">{book.author}</span>
          </p>
         
          {/* Genre Section */}
          <p className="text-gray-700 text-xs sm:text-sm font-medium mb-1">
            Genre: {book.category}
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-2 text-xs sm:text-sm leading-snug line-clamp-2">
            {book?.description.length > 80
              ? `${book?.description.slice(0, 80)}...`
              : book.description}
          </p>

          {/* Price */}
          <p className="font-medium mb-2 text-xs sm:text-sm">
            Ksh {book?.newPrice}{" "}
            <span className="line-through font-normal ml-2 text-gray-500 text-xs">
              Ksh {book?.oldPrice}
            </span>
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-4 py-1 text-xs sm:text-sm flex items-center gap-1 justify-center"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookCard;

