import { Formik, FormikHelpers } from "formik";
import { Book } from "../../../../../types";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";

type BookFormProps = {
    formContent?: Book;
    onSubmit: (values: Book) => void;
};

interface Values extends Book {}

function BookForm({ formContent, onSubmit }: BookFormProps) {
    const schema = yup.object().shape({
        title: yup.string().required(),
        author: yup.string().required(),
        year: yup.string().required(),
        genre: yup.string().required(),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: formContent?.title || "",
                author: formContent?.author || "",
                year: formContent?.year || "",
                genre: formContent?.genre || "",
            }}
            validationSchema={schema}
            onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                setSubmitting(false);
                onSubmit(values);
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={values.title}
                                onChange={handleChange}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author"
                                value={values.author}
                                onChange={handleChange}
                                isValid={touched.author && !errors.author}
                                isInvalid={!!errors.author}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.author}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter year"
                                value={values.year}
                                onChange={handleChange}
                                isValid={touched.year && !errors.year}
                                isInvalid={!!errors.year}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.year}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="genre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter genre"
                                value={values.genre}
                                onChange={handleChange}
                                isValid={touched.genre && !errors.genre}
                                isInvalid={!!errors.genre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.genre}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button className="mt-2" size="lg" variant="primary" type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
}
export default BookForm;
