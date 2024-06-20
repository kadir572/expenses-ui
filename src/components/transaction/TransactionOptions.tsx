'use client'

import IconButton from '@mui/material/IconButton'
import MoreIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { useTransactionStore } from '@/lib/zustand/store'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Tooltip from '@mui/material/Tooltip'
import { Theme, useMediaQuery } from '@mui/material'
import { Transaction } from '@/lib/types/transaction.type'

type Props = {
  userId?: number
  transactionProp?: Transaction
}

export default function TransactionOptions({ userId, transactionProp }: Props) {
  const transaction =
    useTransactionStore(state => state.selectedTransaction) ?? transactionProp
  const clearTransaction = useTransactionStore(state => state.clearTransaction)
  const selectTransactionToEdit = useTransactionStore(
    state => state.selectTransactionToEdit
  )

  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
      }}
    >
      {userId && transaction && (
        <>
          {!isLgUp && (
            <Tooltip
              title={
                userId === transaction?.userId
                  ? 'Edit'
                  : 'You can not edit this transaction'
              }
              arrow
              enterTouchDelay={0}
            >
              <IconButton
                LinkComponent={Link}
                href={`/protected/transactions/edit/${transaction.id}`}
                disabled={userId !== transaction?.userId}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {isLgUp && (
            <Tooltip title='Edit' arrow>
              <IconButton onClick={() => selectTransactionToEdit(transaction)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
      {!isLgUp && (
        <Tooltip title='Close' arrow>
          <IconButton
            aria-label='close'
            LinkComponent={Link}
            href='/protected/transactions'
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      )}
      {isLgUp && (
        <Tooltip title='Close' arrow>
          <IconButton aria-label='close' onClick={clearTransaction}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
