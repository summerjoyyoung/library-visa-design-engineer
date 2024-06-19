import Button from "react-bootstrap/Button"
import BookForm from "../shared/bookForm"

function AddBook() {

    const handleAddBook = () => {
        console.log('Add book')
    }
    
  return (
    <BookForm headerText="Add Book" footerButton={<Button onClick={() => handleAddBook}>Add Book</Button>} />
  )
}

export default AddBook