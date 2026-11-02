'use client'

import {
  type ComponentProps,
  type ComponentType,
  createContext,
  type FocusEvent,
  type ReactNode,
  use
} from 'react'

import {
  type ControlProps,
  FieldFrame,
  type FieldFrameProps,
  FormField
} from '@/app/components/ui/custom/form-field'

// Only what controlProps reads, so any field fits whatever the form's validator types are
export type FieldApi = {
  name: string
  state: { value: unknown; meta: { errors: unknown[]; isBlurred: boolean } }
  handleChange: (value: unknown) => void
  handleBlur: () => void
}

export type BoundControl = {
  name: string
  value: unknown
  onValueChange: (value: unknown) => void
  onBlur: (event: FocusEvent<HTMLElement>) => void
}

export type ActionFormFields = {
  Field: ComponentType<{
    name: string
    children: (field: FieldApi) => ReactNode
  }>
  controlProps: (field: FieldApi) => BoundControl & { error?: string }
}

export type ActionControlProps<TName extends string = string> = Omit<
  FieldFrameProps,
  'error' | 'children'
> & {
  name: TName
  render: (control: BoundControl & ControlProps) => ReactNode
}

export type ActionFieldProps<TName extends string = string> = Omit<
  ComponentProps<typeof FormField>,
  'name' | 'value' | 'defaultValue' | 'error' | 'onChange' | 'onBlur'
> & { name: TName }

const ActionFormContext = createContext<ActionFormFields | undefined>(undefined)

// Declared once at module level and fed through context: a component created inside the hook
// would get a new identity on every render and remount its input on each keystroke
export const ActionForm = ({
  fields,
  ...props
}: ComponentProps<'form'> & { fields: ActionFormFields }) => (
  <ActionFormContext value={fields}>
    <form {...props} />
  </ActionFormContext>
)

const useActionFormFields = (component: string) => {
  const fields = use(ActionFormContext)
  if (!fields)
    throw new Error(`${component} must be rendered inside ActionForm`)
  return fields
}

export const ActionControl = ({
  name,
  render,
  ...frame
}: ActionControlProps) => {
  const { Field, controlProps } = useActionFormFields('ActionControl')

  return (
    <Field name={name}>
      {(field) => {
        const { error, ...bound } = controlProps(field)
        return (
          <FieldFrame {...frame} error={error}>
            {(control) => render({ ...bound, ...control })}
          </FieldFrame>
        )
      }}
    </Field>
  )
}

export const ActionField = ({ name, ...props }: ActionFieldProps) => {
  const { Field, controlProps } = useActionFormFields('ActionField')

  return (
    <Field name={name}>
      {(field) => {
        const { value, onValueChange, ...bound } = controlProps(field)
        return (
          <FormField
            {...props}
            {...bound}
            value={value as string}
            onChange={(event) => onValueChange(event.target.value)}
          />
        )
      }}
    </Field>
  )
}
