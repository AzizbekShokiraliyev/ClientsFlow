import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { EmailFieldProps } from "@/interface/Interface"

const EmailField = ({ register, error }: EmailFieldProps) => (
  <FieldGroup>
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input
        type="email"
        placeholder="example@gmail.com"
        {...register("email")}
      />
      {error && (
        <p className="mt-1 text-xs text-destructive">{error.message}</p>
      )}
    </Field>
  </FieldGroup>
)

export default EmailField
