import type { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/components/ui/shadcn/card'

type FormCardProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export const FormCard = ({
  title,
  description,
  children,
  footer
}: FormCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">
        <h1>{title}</h1>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {children}
      {footer && (
        <div className="mt-6 flex flex-col items-center gap-3 text-center text-sm">
          {footer}
        </div>
      )}
    </CardContent>
  </Card>
)
