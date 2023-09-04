import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlanetsList from '../pages/planets-list/planets-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetsList />,
  },
]);

const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
