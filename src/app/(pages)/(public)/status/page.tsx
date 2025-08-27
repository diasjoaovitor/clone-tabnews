import { Suspense } from 'react'

import { Loader } from '@/app/components'

import { Info } from './_components'

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
