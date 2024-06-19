import BookForm from "../shared/bookForm"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Book } from "../../../../../types"
import { create } from "zustand"
import Container from "react-bootstrap/Container"

interface EditState {
    book: Book | undefined
    setBook: (book: Book) => void
}

const useEditState = create<EditState>((set) => ({
    book: undefined,
    setBook: (book: Book) => set({ book }),
}))

function EditBook() {
    const { id } = useParams()
    const { book, setBook } = useEditState()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/books/${id}`)
            .then(response => response.json())
            .then(data => setBook(data))
    }, [id, setBook])

    const handleEditBook = (values: Book) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(() => {
                console.log('Book edited')
                return navigate('/')
            })
    }

    return (
        <Container>
            <h1>Edit Book</h1>
            <BookForm onSubmit={handleEditBook} formContent={book} />
        </Container>
    )
  }
  
  export default EditBook