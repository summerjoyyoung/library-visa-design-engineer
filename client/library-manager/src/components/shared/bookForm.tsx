import Container from "react-bootstrap/Container";
import { Book } from "../../../../../types";
import { Col, Form, Row } from "react-bootstrap";

type BookFormProps = {
    headerText: string;
    footerButton: JSX.Element;
    formContent?: Book;
};

function BookForm({ headerText, footerButton, formContent }: BookFormProps) {
    return (
        <Container>
            <h1>{headerText}</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            defaultValue={formContent?.title}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author"
                            defaultValue={formContent?.author}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter year"
                            defaultValue={formContent?.year}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="genre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter genre"
                            defaultValue={formContent?.genre}
                        />
                    </Form.Group>
                </Row>
                {footerButton}
            </Form>
        </Container>
    );
}
export default BookForm;
