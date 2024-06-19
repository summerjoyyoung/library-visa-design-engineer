import Button from "react-bootstrap/Button"
import BookForm from "../shared/bookForm"
import { Book } from "../../../../../types"
import { create } from "zustand"
import { useNavigate } from "react-router-dom"

interface AddBookState {
    book: Book | undefined
    setBook: (book: Book) => void
}

const useAddBookState = create<AddBookState>((set) => ({
    book: undefined,
    setBook: (book: Book) => set({ book }),
}))

function AddBook() {
    const { book, setBook } = useAddBookState()
    const navigate = useNavigate()

    const handleAddBook = () => {
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(() => {
                console.log('Book added')
                return navigate('/')
            })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target
        setBook({
            ...book,
            [id]: value,
        })
    }
    
    return (
        <BookForm headerText="Add Book" onChange={onChange} footerButton={<Button onClick={handleAddBook}>Add Book</Button>} />
    )
}

export default AddBook