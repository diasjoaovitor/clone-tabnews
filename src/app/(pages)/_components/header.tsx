import { cn } from 'cn'
import Link from 'next/link'

import { buttonVariants } from '@/app/components/ui/shadcn/button'

export const Header = () => (
  <header className="border-b bg-background">
    <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          '-ml-2.5 text-base font-semibold'
        )}
      >
        Clone TabNews
      </Link>
    </div>
  </header>
)
