import { create } from 'zustand'
import { Transaction } from '../types/transaction.type'

type DrawerState = {
  mobileOpen: boolean
  isClosing: boolean
  handleDrawerToggle: () => void
  handleDrawerClose: () => void
  handleDrawerTransitionEnd: () => void
}

type TransactionState = {
  selectedTransaction: Transaction | null
  transactionToEdit: Transaction | null
  isAddTransactionFormOpen: boolean
  openAddTransactionForm: (shouldOpen: boolean) => void
  selectTransaction: (transaction: Transaction) => void
  selectTransactionToEdit: (transaction: Transaction) => void
  clearTransaction: () => void
}

export const useDrawerStore = create<DrawerState>(set => ({
  mobileOpen: false,
  isClosing: false,
  handleDrawerToggle: () => set(state => ({ mobileOpen: !state.mobileOpen })),
  handleDrawerClose: () => set({ isClosing: true, mobileOpen: false }),
  handleDrawerTransitionEnd: () => set({ isClosing: false }),
}))

export const useTransactionStore = create<TransactionState>(set => ({
  selectedTransaction: null,
  transactionToEdit: null,
  isAddTransactionFormOpen: false,
  openAddTransactionForm: (shouldOpen: boolean) =>
    set({
      isAddTransactionFormOpen: true,
      transactionToEdit: null,
      selectedTransaction: null,
    }),
  selectTransaction: (transaction: Transaction) =>
    set({
      selectedTransaction: transaction,
      transactionToEdit: null,
      isAddTransactionFormOpen: false,
    }),
  selectTransactionToEdit: (transaction: Transaction) =>
    set({
      transactionToEdit: transaction,
      selectedTransaction: null,
      isAddTransactionFormOpen: false,
    }),
  clearTransaction: () =>
    set({
      selectedTransaction: null,
      transactionToEdit: null,
      isAddTransactionFormOpen: false,
    }),
}))
