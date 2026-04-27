"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import useSignUp from "@/hooks/useSignUp";

export default function Register() {
 const{isLoading,handleSubmit,errors,register,userSignUpData} = useSignUp()
  return (
    <>
      <div className="max-w-sm mx-auto my-20 rounded-lg bg-white shadow-lg">
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Create Account</h1>
          <FieldSet
            className="w-full max-w-xs"
            onSubmit={handleSubmit(userSignUpData)}
          >
            <FieldGroup>
              <Field className="mt-3">
                <FieldLabel htmlFor="phone">Mobile number</FieldLabel>
                
                
                  <Input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder="Mobile number"
                    
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                
              </Field>

              <Field className="mt-3">
                <FieldLabel htmlFor="name">Your name</FieldLabel>
                <Input
                {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Name"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
              </Field>

              <Field className="mt-3">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field className="mt-3">
                <FieldLabel htmlFor="password">
                  Password (at least 6 characters)
                </FieldLabel>
                <Input {...register("password")} id="password" type="password" placeholder="Password" />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
              </Field>

              <Field className="mt-3">
                <FieldLabel htmlFor="confirm-password">
                  Re-enter password
                </FieldLabel>
                <Input {...register("rePassword")} id="confirm-password" type="password" placeholder="rePassword" />
                {errors.rePassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.rePassword.message}
                    </p>
                  )}
              </Field>

              <Button type="submit" className="w-full mt-3" disabled={isLoading}>
                {isLoading?<Spinner/>:"Sign up"}
              </Button>
            </FieldGroup>
          </FieldSet>

          <Separator />

          <p className="text-sm">
            Already a customer?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in instead
            </Link>
          </p>

          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Notice
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
