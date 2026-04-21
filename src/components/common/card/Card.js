import React from 'react';

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-500 p-4">
      <h2 className="text-md font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default Card;
