import { useState } from 'react';
import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import { Popup } from './Popup';

export const FloatingButton = () => {
  const [isPopup, setIsPopup] = useState(false);

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {},
    });
    openDateModal();
  };

  const openPopup = () => {
    setIsPopup(!isPopup);
  };

  return (
    <div className="fixed z-50 bottom-10 right-[-45px]" onMouseEnter={openPopup} onMouseLeave={openPopup}>
      <div className='relative top-5 right-32'>
        <Popup isOpen={isPopup} message={'Add new Event'} />
      </div>
      <button
        onClick={handleClickNew}
        type="button"
        title="Contact Sale"
        className=" bg-blue-600 animate-bounce
      w-8 h-8 rounded-full drop-shadow-lg flex justify-center items-center
      text-white text-4xl opacity-50 hover:drop-shadow-2xl hover:opacity-100
      hover:w-12 hover:h-12 transition-ease-in-out duration-700"
      >
        &#8853;
      </button>
    </div>
  );
};
