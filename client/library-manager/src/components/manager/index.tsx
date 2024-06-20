import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import BookGrid from './bookGrid'
import ConfirmDeleteDialog from './confirmDeleteDialog'
import { Alert, Navbar } from 'react-bootstrap'
import { useAppState } from '../../main'

function Manager() {
  const name = 'Library Manager'
  const { books, showConfirmDelete, deleteBookId, alert, setBooks, setShowConfirmDelete, setDeleteBookId, setShowAlert } = useAppState()  

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
      .then((response) => {
        if (response.status === 204) {          
          setBooks(books.filter((book) => book.id !== deleteBookId))
          setShowConfirmDelete(false)
          setShowAlert(true, 'success', 'Book deleted')
        } else {
          throw new Error('Failed to delete book')
        }
      })
      .catch((error) => {
        console.error(error)
        setShowAlert(true, 'error', 'Failed to delete book')
      })
  }

  return (
    <Container className='p-3'>
      <Navbar className='justify-content-between' expand='lg'>
        <h1>{name}</h1>
        <Button size='lg' href='/add-book'>Add Book</Button>
      </Navbar>
      <Alert variant={alert.variant} className='mt-3' show={alert.show} dismissible onClose={() => setShowAlert(false, alert.variant, alert.message)}>
        {alert.message}
      </Alert>
      <Container className='mt-5'>
        <h2 className='mb-3'>{books.length} books total</h2>
        <BookGrid books={books} setShowConfirmDelete={setShowConfirmDelete} setDeleteBookId={setDeleteBookId} />
        <ConfirmDeleteDialog show={showConfirmDelete} handleClose={() => setShowConfirmDelete(false)} handleDelete={() => handleDeleteBook()} />
      </Container>
    </Container>
  )
}

export default Manager
