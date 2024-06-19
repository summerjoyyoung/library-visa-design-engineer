import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ConfirmDeleteDialogProps = {
    show: boolean,
    handleClose: () => void,
    handleDelete: () => void
}

function ConfirmDeleteDialog({ show, handleClose, handleDelete }: ConfirmDeleteDialogProps) {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>Cancel</Button>
            <Button variant='primary' onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDeleteDialog