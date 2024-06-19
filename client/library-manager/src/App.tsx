import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import BookGrid from './components/bookGrid'
import ConfirmDeleteDialog from './components/confirmDeleteDialog'
import { create } from 'zustand'
import { Books } from '../../../types'

interface AppState {
  books: Books
  showConfirmDelete: boolean
  setBooks: (books: Books) => void
  setShowConfirmDelete: (show: boolean) => void
}

const useAppState = create<AppState>((set) => ({
  books: [],
  showConfirmDelete: false,
  setBooks: (books) => set({ books }),
  setShowConfirmDelete: (show) => set({ showConfirmDelete: show }),
}))

function App() {
  const name = 'Library Manager'
  const { books, showConfirmDelete, setBooks, setShowConfirmDelete } = useAppState()  

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
      })
  }, [setBooks])

  return (
    <Container className='p-3'>
      <h1>{name}</h1>
      <Button onClick={() => {/* TODO */}}>Add Book</Button>
      <h2>{books.length} books total</h2>
      <BookGrid books={books} setShowConfirmDelete={setShowConfirmDelete} />
      <ConfirmDeleteDialog show={showConfirmDelete} handleClose={() => setShowConfirmDelete(false)} handleDelete={() => {/* TODO */}} />
    </Container>
  )
}

export default App
