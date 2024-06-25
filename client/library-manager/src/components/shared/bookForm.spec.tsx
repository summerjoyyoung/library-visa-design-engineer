import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookForm from "./bookForm";
import { BrowserRouter } from "react-router-dom";

describe("BookForm", () => {
    let onSubmit: jest.Mock;

    beforeEach(() => {
        onSubmit = jest.fn();
        render(<BrowserRouter><BookForm onSubmit={onSubmit} /></BrowserRouter>);
    });

    test("renders form inputs", () => {
        expect(screen.getByLabelText("Title")).toBeDefined();
        expect(screen.getByLabelText("Author")).toBeDefined();
        expect(screen.getByLabelText("Year")).toBeDefined();
        expect(screen.getByLabelText("Genre")).toBeDefined();
    });

    test("submits form with correct values", () => {
        const titleInput = screen.getByLabelText("Title");
        const authorInput = screen.getByLabelText("Author");
        const yearInput = screen.getByLabelText("Year");
        const genreInput = screen.getByLabelText("Genre");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        userEvent.type(titleInput, "Sample Title");
        userEvent.type(authorInput, "Sample Author");
        userEvent.type(yearInput, "2022");
        userEvent.type(genreInput, "Sample Genre");

        const clicked = fireEvent.click(submitButton);
        expect(clicked).toBe(true);

        waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith({
                title: "Sample Title",
                author: "Sample Author",
                year: "2022",
                genre: "Sample Genre",
            }),
          )
    });
});