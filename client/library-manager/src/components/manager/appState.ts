import { create } from 'zustand'
import { Books } from '../../../../../types'

export interface AppState {
  books: Books
  deleteBookId: number
  showConfirmDelete: boolean
  alert: {
    show: boolean
    variant: 'error' | 'success'
    message: string
  }
}

export interface AppActions {
  setBooks: (books: Books) => void
  setShowConfirmDelete: (show: boolean) => void
  setDeleteBookId: (id: number) => void
  setShowAlert: (show: boolean, variant: 'error' | 'success', message: string) => void
}

export const useAppState = create<AppState & AppActions>((set) => ({
  books: [],
  deleteBookId: -1,
  showConfirmDelete: false,
  alert: {
    show: false,
    variant: 'error',
    message: '',
  },
  setBooks: (books) => set({ books }),
  setShowConfirmDelete: (show) => set({ showConfirmDelete: show }),
  setDeleteBookId: (id) => set({ deleteBookId: id }),
  setShowAlert: (show, variant, message) => set({ alert: { show, variant, message } }),
}))
