import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/home/Home';
import Owner from '../pages/owner/Owner';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/owner/:id',
    element: <Owner />,
  },
]);
