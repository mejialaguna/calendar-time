/* eslint-disable no-param-reassign */
import { parseISO } from 'date-fns';

export const convertEventsToDateEvents = (events = []) => events.map((event) => {
  event.end = parseISO(event.end);
  event.start = parseISO(event.start);

  return event;
});
