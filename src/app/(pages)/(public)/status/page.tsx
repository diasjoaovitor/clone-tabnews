import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from '@/app/components/ui/custom/loader'

import { DatabaseStatus } from './_components/database-status'

export const metadata: Metadata = {
  title: 'Status'
}

const StatusPage = () => (
  <div className="mx-auto flex w-full max-w-md flex-col gap-6">
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">Status</h1>
      <p className="text-sm text-muted-foreground">
        Situação atual dos serviços do Clone TabNews.
      </p>
    </div>
    <Suspense fallback={<Loader />}>
      <DatabaseStatus />
    </Suspense>
  </div>
)

export default StatusPage
