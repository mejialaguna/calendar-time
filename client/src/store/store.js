import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';

import { calendarSlice } from './calendar';
import { uiSlice } from './ui';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
