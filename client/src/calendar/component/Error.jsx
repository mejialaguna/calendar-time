import React from 'react';

export const Error = ({ message }) => (
  <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mt-2" role="alert">
    <p className="font-bold">{message}</p>
  </div>
);
