import { cn } from 'cn'
import type { ComponentProps } from 'react'

import { Button } from '@/app/components/ui/shadcn/button'
import { Spinner } from '@/app/components/ui/shadcn/spinner'

export const SubmitButton = ({
  pending,
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Button>, 'type' | 'disabled'> & {
  pending: boolean
}) => (
  <>
    <Button
      type="submit"
      disabled={pending}
      focusableWhenDisabled
      // focusableWhenDisabled sets aria-disabled instead of the native disabled attribute, which is
      // the only state the shadcn button styles
      className={cn(
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className
      )}
      {...props}
    >
      {/* The spinner's own label is in English and a status mounted with its content isn't announced */}
      {pending && <Spinner aria-hidden data-icon="inline-start" />}
      {children}
    </Button>
    {/* Not every screen reader voices aria-disabled on the focused button, so the pending state is
    announced by a live region that stays mounted */}
    <span role="status" className="sr-only">
      {pending ? 'Enviando…' : ''}
    </span>
  </>
)
