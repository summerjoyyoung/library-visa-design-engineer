import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Manager from './components/manager/index.tsx'
import AddBook from './components/addBook/index.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBook from './components/editBook/index.tsx'
import { Books } from '../../../types/index.ts'
import { create } from 'zustand'

export interface AppState {
  books: Books
  deleteBookId: number
  showConfirmDelete: boolean
  alert: {
    show: boolean
    variant: 'error' | 'success'
    message: string
  }
  setBooks: (books: Books) => void
  setShowConfirmDelete: (show: boolean) => void
  setDeleteBookId: (id: number) => void
  setShowAlert: (show: boolean, variant: 'error' | 'success', message: string) => void
}

export const useAppState = create<AppState>((set) => ({
  books: [],
  deleteBookId: -1,
  showConfirmDelete: false,
  alert: {
    show: false,
    variant: 'error',
    message: '',
  },
  setBooks: (books) => set({ books }),
  setShowConfirmDelete: (show) => set({ showConfirmDelete: show }),
  setDeleteBookId: (id) => set({ deleteBookId: id }),
  setShowAlert: (show, variant, message) => set({ alert: { show, variant, message } }),
}))

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
