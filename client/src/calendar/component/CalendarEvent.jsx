import React from 'react';

//! `this component is being used in MyCalendar component !  line 59and this data is the one that is showing in the !  calendar view, this is the content inside the calendar.`

export const CalendarEvent = ({ event }) => {
  const {
    // eslint-disable-next-line no-unused-vars
    title, user, start, end, notes,
  } = event;

  // const newStartDate = new Date(start).toDateString();
  // const newEndData = new Date(end).toDateString();

  return (
    <div className="flex flex-1  flex-col justify-center leading-none">
      {/* <span className="text-xs">{newStartDate} - {newEndData}</span> */}
      <span className="text-xs">{user.name}</span>
      <span className="font-semibold text-sm">
        {title.toUpperCase()}
      </span>
      <span className="text-xs">
        {notes.toLowerCase()}
      </span>
    </div>
  );
};
