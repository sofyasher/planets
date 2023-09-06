import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlanetsListPage from '../pages/planets-list/planets-list-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetsListPage />,
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
