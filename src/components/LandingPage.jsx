import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 to-pink-500 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center">
        Ice Cream Paradise
      </h1>
      <p className="mt-4 text-lg md:text-2xl text-white text-center">
        Indulge in a world of flavors!
      </p>
      <Link to="/admin">
        <button className="mt-6 bg-white text-pink-600 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-lg hover:bg-pink-200 transition duration-300 ease-in-out">
          View Sales Data (Admin Only)
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
