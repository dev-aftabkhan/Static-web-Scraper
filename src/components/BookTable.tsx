import React from 'react';

interface Book {
  title: string;
  price: string;
  availability: string;
  rating: string;
}

interface Props {
  books: Book[];
}

const BookTable: React.FC<Props> = ({ books }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Availability</th>
          <th className="border px-4 py-2">Rating</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{book.title}</td>
            <td className="border px-4 py-2">{book.price}</td>
            <td className="border px-4 py-2">{book.availability}</td>
            <td className="border px-4 py-2">{book.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
