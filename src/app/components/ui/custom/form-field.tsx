import { type ComponentProps, type ReactNode, useId } from 'react'

import { Input } from '@/app/components/ui/shadcn/input'
import { Label } from '@/app/components/ui/shadcn/label'

type FormFieldProps = Omit<ComponentProps<typeof Input>, 'id'> & {
  label: string
  labelAction?: ReactNode
  hint?: string
  error?: string
}

export const FormField = ({
  label,
  labelAction,
  hint,
  error,
  'aria-describedby': ariaDescribedBy,
  ...props
}: FormFieldProps) => {
  // useId rather than the field name, so two forms on a page never share an id
  const id = useId()
  const inputId = `${id}-input`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [ariaDescribedBy, hint && hintId, error && errorId]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="grid gap-2">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <Label htmlFor={inputId}>{label}</Label>
        {labelAction}
      </div>
      <Input
        {...props}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
      />
      {hint && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
