"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import useUserSignIn from '@/hooks/useUserSignIn'
import Link from 'next/link'

export default function LoginPage() {
 const {isLoading,userData,handleSubmit,register,errors} = useUserSignIn()

  return (
    <>
    <div className="max-w-sm rounded-lg bg-white shadow-lg mx-auto my-20">
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <h4 className="text-sm font-semibold">Sign in or create an account</h4>
    </div>

    <div className="p-6 space-y-4">
       <FieldSet className="w-full max-w-xs" onSubmit={handleSubmit(userData)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register('email')} id="email" type="email" placeholder="Email" />
          {errors.email && (
    <p className="text-red-500 text-xs mt-1 italic">
      {errors.email.message}
    </p>
  )}
        </Field>

        <Field className='mt-3'>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input {...register('password')} id="password" type="password" placeholder="••••••••" />
          {errors.password && (
    <p className="text-red-500! text-xs mt-1 italic">
      {errors.password.message}
    </p>
  )}
        </Field>
        <Button disabled={isLoading} className="w-full mt-3">{isLoading?<Spinner/>:"Log in"}</Button>

      </FieldGroup>
    </FieldSet>

<p className="text-sm">
            New customer?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Sign up instead
            </Link>
          </p>

      <p className="text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="text-amazon-accent hover:underline">Conditions of Use</a>
        {" "}and{" "}
        <a href="#" className="text-amazon-accent hover:underline">Privacy Notice</a>.
      </p>

      <a href="#" className="text-sm text-amazon-accent hover:underline block">Need help?</a>
    </div>
  </div>
    </>
  )
}
