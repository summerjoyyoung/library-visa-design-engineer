import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Book, Books } from '../../../../../types'
import NoBooks from './noBooks';

type BookGridProps = {
    books: Books,
    setShowConfirmDelete: (show: boolean) => void
    setDeleteBookId: (id: number) => void
}

function BookGrid({ books, setShowConfirmDelete, setDeleteBookId }: BookGridProps) {
    const handleDelete = (id?: number) => {
      if (id) {
        setShowConfirmDelete(true)
        setDeleteBookId(id)
      }
    }
  return (
    <Row xs={1} md={2} lg={3} className='g-4'>
      {books.length === 0 ? <NoBooks /> :
        books.map((book: Book) => (
          <Col key={book.id}>
            <Card>
              <Card.Body className='p-4'>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle>{book.author}</Card.Subtitle>
                <Card.Text>{book.year}</Card.Text>
                <Card.Text>{book.genre}</Card.Text>
                <Button className='me-3' onClick={() => handleDelete(book.id)} variant='outline-danger'>Delete</Button>
                <Button variant='primary' href={`/edit-book/${book.id}`}>Edit</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default BookGrid