import React, { useState } from 'react';
import { useAuthStore } from '../../hooks';
import { Popup } from './Popup';
import { logoutGif } from '../../public';

export const NavBar = () => {
  const [isPopup, setIsPopup] = useState(false);
  const { startLogout, user } = useAuthStore();

  const openPopup = () => {
    setIsPopup(!isPopup);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <h3 className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
            {user?.name}
          </h3>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div onMouseEnter={openPopup} onMouseLeave={openPopup} className="flex flex-row-reverse">
              <button
                type="button"
                className="flex rounded-full bg-gray-800 text-sm
                   focus:outline-none focus:ring-2 focus:ring-white
                   focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={true}
                aria-haspopup="true"
                onClick={startLogout}
              >
                <img className="h-6 w-[1rem]" src={logoutGif} alt="GIF description" />
              </button>
              <Popup isOpen={isPopup} message={'Logout'} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
