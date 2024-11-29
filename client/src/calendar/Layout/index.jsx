import React from 'react';
import { NavBar } from '../component';

export const Layout = ({ children }) => (
    <>
      <NavBar />
      {children}
    </>
);
