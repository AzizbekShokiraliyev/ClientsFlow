// password-field.tsx
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import type { PasswordFieldProps } from "@/interface/Interface"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

const PasswordField = ({ register, error }: PasswordFieldProps) => {
  const [show, setShow] = useState(false)

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            type={show ? "text" : "password"}
            placeholder="********"
            {...register("password")}
          />
          <InputGroupAddon align="inline-end">
            <Button
              size="icon"
              type="button"
              variant="ghost"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </InputGroupAddon>
        </InputGroup>
        {error && (
          <p className="mt-1 text-xs text-destructive">{error.message}</p>
        )}
      </Field>
    </FieldGroup>
  )
}

export default PasswordField
