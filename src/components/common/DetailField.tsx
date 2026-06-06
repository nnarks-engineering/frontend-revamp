import { Label } from '@/components/ui/label'

interface DetailFieldProps {
  readonly label: string
  readonly value: string | number | React.ReactElement | null | undefined
  readonly className?: string
}

export function DetailField({ label, value, className = '' }: DetailFieldProps): React.JSX.Element {
  return (
    <div className="space-y-1">
      <Label className="text-muted-foreground font-normal text-xs">{label ?? 'label'}</Label>
      <div className={`text-foreground font-normal text-sm ${className}`}>{value || '-'}</div>
    </div>
  )
}
