import { cn } from "@/shared/lib/utils"
import * as React from "react"

interface OTPInputProps {
  value: string[]
  onChange: (index: number, value: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  onPasteAll?: (chars: string[]) => void
  disabled?: boolean
}

export const OTPInput = React.forwardRef<HTMLInputElement[], OTPInputProps>(
  ({ value, onChange, onKeyDown, onPasteAll, disabled }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useImperativeHandle(ref, () => inputRefs.current as HTMLInputElement[])

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
      e.preventDefault()
      const pasted = e.clipboardData
        .getData("text")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, value.length)
      if (!pasted.length) return
      const chars = Array.from({ length: value.length }, (_, i) => pasted[i] ?? "")
      if (onPasteAll) {
        onPasteAll(chars)
      } else {
        chars.forEach((ch, i) => onChange(i, ch))
      }
      const focusIdx = Math.min(pasted.length, value.length - 1)
      inputRefs.current[focusIdx]?.focus()
    }

    return (
      <div className="flex gap-2 sm:gap-4 justify-between w-full">
        {value.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type="text"
            inputMode="text"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
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
            onPaste={handlePaste}
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
