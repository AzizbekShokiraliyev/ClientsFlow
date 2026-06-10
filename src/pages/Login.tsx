import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)


  return (
    <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full sm:max-w-md">
        <CardHeader>
            <CardTitle className='text-2xl text-center'>Login</CardTitle>
            <CardDescription className='text-center'>Enter your credentials to access your account</CardDescription>
        </CardHeader>

        <CardContent>
            <form className="grid gap-4">
                <div>
                    <FieldGroup>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input type="email" placeholder="example@gmail.com"/>
                    </Field>
                </FieldGroup>
                </div>

                <div>
                    <FieldGroup>
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <InputGroup>
                            <InputGroupInput type={showPassword ? "text" : "password"} placeholder="********"/>

                        <InputGroupAddon align="inline-end">
                            <Button size="icon" type="button" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeIcon/> : <EyeOffIcon/>}
                            </Button>
                        </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </FieldGroup>
                </div>
            </form>
        </CardContent>

        <CardFooter className='justify-center text-sm'>
          <p className='text-muted-foreground'>
            Don't have an account?{' '}
            <Link to='/register' className='text-primary underline font-medium'>
              Register
            </Link>
          </p>
        </CardFooter>
    </Card>
    </div>
  )
}

export default Login
