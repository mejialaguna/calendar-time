import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { AppRoute } from './router/AppRoute';

import { store } from './store';

export const CalendarApp = () => (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </Provider>
);
