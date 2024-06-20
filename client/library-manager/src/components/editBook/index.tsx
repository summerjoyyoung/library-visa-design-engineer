import BookForm from "../shared/bookForm"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Book } from "../../../../../types"
import { create } from "zustand"
import Container from "react-bootstrap/Container"
import { useManagerState } from "../manager"

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
    const { setShowAlert } = useManagerState()
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
            .then((response) => {
                if (response.status === 200) {
                    console.log('Book edited')
                    setShowAlert(true, 'success', 'Book edited')
                    return navigate('/')
                } else {
                    throw new Error('Failed to edit book')
                }
            })
            .catch((error) => {
                console.error(error)
                setShowAlert(true, 'error', 'Failed to edit book')
            })
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-5">Edit Book</h1>
            <BookForm onSubmit={handleEditBook} formContent={book} />
        </Container>
    )
  }
  
  export default EditBook