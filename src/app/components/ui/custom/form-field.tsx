import { type ComponentProps, type ReactNode, useId } from 'react'

import { Input } from '@/app/components/ui/shadcn/input'
import { Label } from '@/app/components/ui/shadcn/label'

export type ControlProps = {
  id: string
  'aria-invalid'?: true
  'aria-describedby'?: string
}

export type FieldFrameProps = {
  label: string
  labelAction?: ReactNode
  hint?: string
  error?: string
  'aria-describedby'?: string
  children: (control: ControlProps) => ReactNode
}

export const FieldFrame = ({
  label,
  labelAction,
  hint,
  error,
  'aria-describedby': ariaDescribedBy,
  children
}: FieldFrameProps) => {
  // useId rather than the field name, so two forms on a page never share an id
  const id = useId()
  const controlId = `${id}-control`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [ariaDescribedBy, hint && hintId, error && errorId]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="grid gap-2">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <Label htmlFor={controlId}>{label}</Label>
        {labelAction}
      </div>
      {children({
        id: controlId,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy || undefined
      })}
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

type FormFieldProps = Omit<ComponentProps<typeof Input>, 'id'> &
  Omit<FieldFrameProps, 'children'>

export const FormField = ({
  label,
  labelAction,
  hint,
  error,
  'aria-describedby': ariaDescribedBy,
  ...props
}: FormFieldProps) => (
  <FieldFrame
    label={label}
    labelAction={labelAction}
    hint={hint}
    error={error}
    aria-describedby={ariaDescribedBy}
  >
    {(control) => <Input {...props} {...control} />}
  </FieldFrame>
)
