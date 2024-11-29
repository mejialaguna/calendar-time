/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { languageLabels, localizer } from '../../helper';
import { CalendarModal, CalendarEvent, FloatingButton } from '../component';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const MyCalendar = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week',
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.userId === event.user._id || user.userId === event.user.userId;
    // console.log({ isMyEvent })
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <div className="mx-10 my-5">
      <Calendar
        // culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        // messages={languageLabels()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

        // culture="es" // how we change into a diff language
        // messages={languageLabels()} // how we change into a diff language of to change the look
      />
      <FloatingButton />
      <CalendarModal user={user} />
    </div>
  );
};
