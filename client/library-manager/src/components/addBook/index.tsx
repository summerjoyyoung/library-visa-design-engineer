import BookForm from "../shared/bookForm"
import { Book } from "../../../../../types"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"

function AddBook() {
    const navigate = useNavigate()

    const handleAddBook = (values: Book) => {
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(() => {
                console.log('Book added')
                return navigate('/')
            })
    }
    
    return (
        <Container>
            <h1>Add Book</h1>
            <BookForm onSubmit={handleAddBook} />
        </Container>
    )
}

export default AddBook