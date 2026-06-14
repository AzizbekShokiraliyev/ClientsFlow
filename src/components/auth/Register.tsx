// src/pages/Register.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { supabase } from "@/lib/supabase"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // signUp ishlatilishi kerak, signInWithPassword emas!
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })

    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboart")
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Create new account for you
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="grid gap-4" onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel>Full name</FieldLabel>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <Button
                      size="icon"
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline font-medium">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register