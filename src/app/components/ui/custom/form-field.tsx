import { type ComponentProps, type ReactNode, useId } from 'react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@/app/components/ui/shadcn/field'
import { Input } from '@/app/components/ui/shadcn/input'

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
    <Field>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <FieldLabel htmlFor={controlId}>{label}</FieldLabel>
        {labelAction}
      </div>
      {/* A vertical Field stretches its direct children, which a checkbox must not follow */}
      <div>
        {children({
          id: controlId,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': describedBy || undefined
        })}
      </div>
      {hint && <FieldDescription id={hintId}>{hint}</FieldDescription>}
      {/* Without the role: an alert per field reads them all at once, and FormMessage already
      announces the first one on every rejected submit, even when it's repeated */}
      {error && (
        <FieldError id={errorId} role={undefined}>
          {error}
        </FieldError>
      )}
    </Field>
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
