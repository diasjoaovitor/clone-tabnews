import { Header } from '@/app/components/layouts/default/_components/header'

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {children}
    </main>
  </>
)
