"use client"
// Import necessary libraries
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
// import { useRouter } from 'next/navigation';

import { signOut } from 'firebase/auth';

let useRouter;
if (typeof window !== 'undefined') {
  useRouter = require('next/navigation').useRouter;
}


export default function Home() {
  const [user] = useAuthState(auth);
  // const router = useRouter();
  const router = useRouter && useRouter();
  // if (!user) {
  //   router.push('/sign-up')
  // }

  useEffect(() => {
    // Redirect if no user and router is available
    if (!user && router) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const handleSearch = async () => {
    try {
      // Make API request to GIPHY with pagination parameters
      const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
      const limit = 6; // You can adjust the limit per page
      const offset = (currentPage - 1) * limit;

      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search`,
        {
          params: {
            api_key: apiKey,
            q: searchQuery,
            limit: limit,
            offset: offset,
          },
        }
      );

      // Update the GIFs state with the new results
      setGifs(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total_count / limit));
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]); // Fetch new data when currentPage changes


  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    handleSearch(); // Fetch new data when currentPage changes
  };


  return (
    <div className="min-h-screen bg-gray-200">
      <button
        onClick={() => {
          signOut(auth);
          // sessionStorage.removeItem('user');
        }}
        className="ml-auto p-2 bg-red-500 text-white rounded flex justify-end items-center mr-4"
      >
        Log out
      </button>
      <main className="flex flex-col items-center rounded">
        <div className="bg-white w-1/2 mx-auto p-6 flex items-center mb-4 rounded">
          <div className="flex-grow">
          
            <input
            
              type="text"
              placeholder="Article name or keyword"
              className="w-full p-2 border border-gray-300 rounded "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearch}
            className="ml-2 p-2 bg-black text-white rounded"
          >
            Search
          </button>
        </div>

        {/* Display the GIFs */}
        <div className="flex flex-wrap justify-center">
        {gifs.map((gif) => (
            <div key={gif.id} className="m-2">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
              <p className="mt-2">{gif.title}</p>
            
            </div>
          ))}
        </div>

        

        {/* Pagination using react-paginate */}
        <ReactPaginate
          className='flex mt-4' // Add margin from the top
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'mx-2 p-2 bg-gray-300 text-gray-700 rounded '} // Style for individual page numbers
          breakClassName={'mx-2 p-2 bg-gray-300 text-gray-700 rounded'} // Style for break dots
          previousClassName={'mx-2 p-2 bg-gray-300 text-gray-700 rounded !important'} // Style for previous button
          nextClassName={'mx-2 p-2 bg-gray-300 text-gray-700 rounded !important'} // Style for next button
        />


        {/* ==========Additionally we can use this code for manual pagination================= */}

        {/* <div className="flex mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`mx-2 p-2 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
        </div> */}


      </main>
    </div>
  );
}
