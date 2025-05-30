import React, { useState } from 'react';
import axios from 'axios';
import BookTable from '../components/BookTable';

const token = localStorage.getItem('token');

if (!token) {
  alert("User not authenticated");
}


interface Props {
  onLogout: () => void;
}

const DashboardPage: React.FC<Props> = ({ onLogout }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrapeBooks = async () => {
    setLoading(true);
    try {
      await axios.post('http://20.244.50.12:4000/api/books/scrape', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      alert('Scraping finished');
    } catch (err) {
      alert('Scraping failed');
    }
    setLoading(false);
  };

  const getBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://20.244.50.12:4000/api/books/get', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
      setBooks(res.data);
    } catch (err) {
      alert('Failed to fetch books');
    }
    setLoading(false);
  };

  const deleteBooks = async () => {
    setLoading(true);
    try {
      await axios.delete('http://20.244.50.12:4000/api/books/delete', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
      setBooks([]);
      alert('Books deleted');
    } catch (err) {
      alert('Failed to delete books');
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            onLogout();
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
      <div className="flex space-x-4 mb-6">
        <button onClick={scrapeBooks} className="bg-green-500 text-white px-4 py-2 rounded">
          Scrape Now
        </button>
        <button onClick={getBooks} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Books
        </button>
        <button onClick={deleteBooks} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete All
        </button>
      </div>
      {loading ? <p>Loading...</p> : <BookTable books={books} />}
    </div>
  );
};

export default DashboardPage;