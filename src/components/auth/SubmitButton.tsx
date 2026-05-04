import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface SubmitButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

export function SubmitButton({ 
  loading, 
  loadingText, 
  children,
  className,
  ...props 
}: SubmitButtonProps) {
  return (
    <Button
      type={props.type || "submit"}
      disabled={loading || props.disabled}
      className={cn("w-full ", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">


          
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText || children}
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
