import React from 'react';

export const Popup = ({ isOpen, message }) => (
  <div
    className={`mr-2 rounded-md shadow-lg bg-white w-max transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
  >
    <p className="px-2 py-1 text-sm text-gray-700">{message}</p>
  </div>
);
