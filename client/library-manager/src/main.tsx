import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Manager from './components/manager/index.tsx'
import AddBook from './components/addBook/index.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBook from './components/editBook/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Manager />,
  },
  {
    path: 'add-book',
    element: <AddBook />,
  },
  {
    path: 'edit-book/:id',
    element: <EditBook />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
