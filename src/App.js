import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/home/Home';
import Products from './pages/CategoryDetails';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import CategoryDetails from './pages/CategoryDetails';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/category/:id', element: <CategoryDetails /> },
        { path: '/product/:id', element: <ProductDetails /> },
        { path: '/search', element: <Search /> }
      ]
    }
  ],
  { basename: process.env.PUBLIC_URL }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
