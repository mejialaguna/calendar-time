/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../axiosApi';
import { convertEventsToDateEvents } from '../helper/convertEventsToDateEvents';
import {
  onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    const id = calendarEvent?.messageId || calendarEvent?.id;

    try {
      if (id) {
        // Actualizando
        await calendarApi.put(`/events/updateEvent/${id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      // Creando
      const { data } = await calendarApi.post('/events/createNewPost', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.eventData.messageId, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Your can update an event created by another user', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    const id = activeEvent?.messageId || activeEvent?.id;

    try {
      await calendarApi.delete(`/events/deleteEvent/${id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Your cant delete an event from another User', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events/getAllEvents');
      // eslint-disable-next-line no-shadow
      const events = convertEventsToDateEvents(data.event);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
