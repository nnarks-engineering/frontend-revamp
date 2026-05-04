import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface OTPInputProps {
  value: string[]
  onChange: (index: number, value: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const OTPInput = React.forwardRef<HTMLInputElement[], OTPInputProps>(
  ({ value, onChange, onKeyDown, disabled }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useImperativeHandle(ref, () => inputRefs.current as HTMLInputElement[])

    return (
      <div className="flex gap-2 sm:gap-4 justify-between w-full">
        {value.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "")
              if (val.length <= 1) {
                onChange(i, val)
                if (val && i < value.length - 1) {
                  inputRefs.current[i + 1]?.focus()
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit && i > 0) {
                inputRefs.current[i - 1]?.focus()
              }
              onKeyDown(i, e)
            }}
            disabled={disabled}
            className={cn(
              "w-full aspect-square text-center text-2xl font-bold rounded-none border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>
    )
  }
)
OTPInput.displayName = "OTPInput"
