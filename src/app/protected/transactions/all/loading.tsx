import Skeleton from '@mui/material/Skeleton'

export default function TransactionsLoading() {
  return (
    <>
      <Skeleton variant='text' width={300} height={40} />
      <Skeleton variant='rectangular' width='100%' height={200} />
    </>
  )
}
