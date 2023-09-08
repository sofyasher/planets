import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlanetsListPage from '../pages/planets-list/planets-list-page';
import NotFound from '../pages/not-found/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetsListPage />,
  },
  {
    path: '*',
    element: <NotFound />,
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
