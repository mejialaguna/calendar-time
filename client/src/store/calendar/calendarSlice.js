/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [
      // tempEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.messageId === payload.messageId) {
          return payload;
        }
        return event;
      });
    },
    // console.log('============state >', JSON.parse(JSON.stringify(state)));
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.messageId !== state.activeEvent.messageId);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;

      const newEvents = payload.filter(
        (event) => !state.events.some((dbEvent) => dbEvent.messageId === event.messageId),
      );

      state.events = state.events.concat(newEvents);
    },
    onLogoutCalendar: (state) => {
      // eslint-disable-next-line no-sequences
      (state.isLoadingEvents = true), (state.events = []);
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent,
} = calendarSlice.actions;
