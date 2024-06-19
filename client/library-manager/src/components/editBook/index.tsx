import Button from "react-bootstrap/Button"
import BookForm from "../shared/bookForm"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Book } from "../../../../../types"
import { create } from "zustand"

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

    useEffect(() => {
        fetch(`http://localhost:3000/books/${id}`)
            .then(response => response.json())
            .then(data => setBook(data))
    }, [id, setBook])

    const handleEditBook = () => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(() => {
                console.log('Book edited')
            })
    }

    return (
      <BookForm headerText="Edit Book" footerButton={<Button onClick={handleEditBook}>Edit Book</Button>} formContent={book} />
    )
  }
  
  export default EditBook