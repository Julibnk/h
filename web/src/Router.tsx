import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages/Layout.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
