import BookForm from "../shared/bookForm"
import { Book } from "../../../../../types"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import { useAppState } from "../manager/appState"

function AddBook() {
    const { setShowAlert } = useAppState()
    const navigate = useNavigate()

    const handleAddBook = (values: Book) => {
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log('Book added')
                    setShowAlert(true, 'success', 'Book added')
                    return navigate('/')
                } else {
                    throw new Error('Failed to add book')
                }
            })
            .catch((error) => {
                console.error(error)
                setShowAlert(true, 'error', 'Failed to add book')
            })
    }
    
    return (
        <Container className="mt-5">
            <h1 className="mb-5">Add Book</h1>
            <BookForm onSubmit={handleAddBook} />
        </Container>
    )
}

export default AddBook