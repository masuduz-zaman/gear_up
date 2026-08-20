"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authActions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export const LoginForm =()=> {
  const [state, action, pending] = useActionState(loginAction, false)
  const router = useRouter()
  

  useEffect(()=>{
    if(!state) return

    if(state.success){
      toast.success(state.message || "Login successful")
    } else {
      toast.error(state.error || "Login failed")
    }
  },[state]) 
  return (
    <form action={action} className={cn("flex justify-center")}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" type="password" name="password" required />
        </Field>
        <Field>
          <Button type="submit">
            {
              pending? "submitting..." : "Login"
            }
          </Button>
            <a
              href="#"
              className="flex justify-center ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
