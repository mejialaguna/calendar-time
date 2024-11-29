import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute } from '../auth';

import { CalendarPage } from '../calendar/pages';
import { useAuthStore } from '../hooks';

export const AppRoute = () => {
  // const { status, user, errorMessage } = useSelector((state) => state.auth);
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    if (localStorage.getItem('token')) checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'checking') {
    return (
      <h1>Authenticating</h1>
    );
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<AuthRoute />} />
          {/* route by defaulth if they try to navigate to any page route if they are not authenticated just for fail save */}
          <Route path="/*" element={<Navigate to={'/auth/login'} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
