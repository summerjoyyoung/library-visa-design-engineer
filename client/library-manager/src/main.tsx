import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Manager from './components/manager/index.tsx'
import AddBook from './components/addBook/index.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBook from './components/editBook/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Manager />} />
        <Route path='add-book' element={<AddBook />} />
        <Route path='edit-book/:id' element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
