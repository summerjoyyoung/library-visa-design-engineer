import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Book, Books } from '../../../../types'

type BookGridProps = {
    books: Books,
    setShowConfirmDelete: (show: boolean) => void
}

function BookGrid({ books, setShowConfirmDelete }: BookGridProps) {
    const handleDelete = () => {
        setShowConfirmDelete(true)
    }
  return (
    <Row xs={1} md={2} lg={3} className='g-4'>
      {
        books.map((book: Book) => (
          <Col key={book.id}>
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle>{book.author}</Card.Subtitle>
                <Card.Text>{book.year}</Card.Text>
                <Card.Text>{book.genre}</Card.Text>
                <Button onClick={handleDelete} variant='outline-danger'>Delete</Button>
                <Button variant='primary'>Edit</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default BookGrid