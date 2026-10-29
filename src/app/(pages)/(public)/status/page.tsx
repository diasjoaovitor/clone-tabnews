import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Info } from '@/app/(pages)/(public)/status/_components/info'
import { Loader } from '@/app/components/ui/custom/loader'

export const metadata: Metadata = {
  title: 'Status'
}

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
