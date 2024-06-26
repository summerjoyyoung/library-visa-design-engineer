import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookGrid from './bookGrid';
import { Books } from '../../../../../types';

const mockBooks: Books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    year: '2021',
    genre: 'Fiction',
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
    year: '2022',
    genre: 'Non-fiction',
  },
];

test('renders book grid with books', () => {
  render(<BookGrid books={mockBooks} setShowConfirmDelete={() => {}} setDeleteBookId={() => {}} />);
    
  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  expect(deleteButtons).toHaveLength(mockBooks.length);
  
  const editButtons = screen.getAllByRole('button', { name: /edit/i });
  expect(editButtons).toHaveLength(mockBooks.length);
});

test('renders no books message when books array is empty', () => {
  render(<BookGrid books={[]} setShowConfirmDelete={() => {}} setDeleteBookId={() => {}} />);
  
  const noBooksMessage = screen.getByText(/No books in library/i);
  expect(noBooksMessage).toBeDefined();
});

test('calls setShowConfirmDelete and setDeleteBookId when delete button is clicked', () => {
  const setShowConfirmDelete = jest.fn();
  const setDeleteBookId = jest.fn();
  
  render(<BookGrid books={mockBooks} setShowConfirmDelete={setShowConfirmDelete} setDeleteBookId={setDeleteBookId} />);
  
  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  deleteButtons.forEach((button, index) => {
    userEvent.click(button);
    waitFor(() => {
        expect(setShowConfirmDelete).toHaveBeenCalledWith(true);
        expect(setDeleteBookId).toHaveBeenCalledWith(mockBooks[index].id);
    });
  });
});