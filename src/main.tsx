import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './Home';
import { Farm } from './pages/Farm';
import NotFoundPage from './NotFoundPage';
import Layout from './components/Layout';
import { Upgrades } from './pages/Upgrades';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Farm />
      </Layout>
    ),
  },
  {
    path: '/upgrades',
    element: (
      <Layout>
        <Upgrades />
      </Layout>
    ),
  },
  {
    path: '/boss',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/fortuneWheel',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
