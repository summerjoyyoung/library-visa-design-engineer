import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import BookGrid from './bookGrid'
import ConfirmDeleteDialog from './confirmDeleteDialog'
import { create } from 'zustand'
import { Books } from '../../../../../types'
import { Navbar } from 'react-bootstrap'

interface ManagerState {
  books: Books
  deleteBookId: number
  showConfirmDelete: boolean
  setBooks: (books: Books) => void
  setShowConfirmDelete: (show: boolean) => void
  setDeleteBookId: (id: number) => void
}

const useManagerState = create<ManagerState>((set) => ({
  books: [],
  deleteBookId: -1,
  showConfirmDelete: false,
  setBooks: (books) => set({ books }),
  setShowConfirmDelete: (show) => set({ showConfirmDelete: show }),
  setDeleteBookId: (id) => set({ deleteBookId: id }),
}))

function Manager() {
  const name = 'Library Manager'
  const { books, showConfirmDelete, deleteBookId, setBooks, setShowConfirmDelete, setDeleteBookId } = useManagerState()  

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
      })
  }, [setBooks])

  const handleDeleteBook = () => {
    fetch(`http://localhost:3000/books/${deleteBookId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setBooks(books.filter((book) => book.id !== deleteBookId))
        setShowConfirmDelete(false)
      })
  }

  return (
    <Container className='p-3'>
      <Navbar className='justify-content-between' expand='lg'>
        <h1>{name}</h1>
        <Button size='lg' href='/add-book'>Add Book</Button>
      </Navbar>
      <Container className='mt-5'>
        <h2 className='mb-3'>{books.length} books total</h2>
        <BookGrid books={books} setShowConfirmDelete={setShowConfirmDelete} setDeleteBookId={setDeleteBookId} />
        <ConfirmDeleteDialog show={showConfirmDelete} handleClose={() => setShowConfirmDelete(false)} handleDelete={() => handleDeleteBook()} />
      </Container>
    </Container>
  )
}

export default Manager
