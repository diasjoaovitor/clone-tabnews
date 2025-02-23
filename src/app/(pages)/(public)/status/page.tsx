import { Suspense } from 'react'
import { Loader } from '@/components'
import { Info } from './info'

const Status = () => {
  return (
    <>
      <h1>Status</h1>
      <Suspense fallback={<Loader />}>
        <Info />
      </Suspense>
    </>
  )
}

export default Status
