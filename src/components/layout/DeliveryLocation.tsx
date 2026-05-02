"use client"
import { governorates } from "@/lib/constants/governorates"
import Link from "next/link"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { Input } from "../ui/input"
import { Field, FieldLabel, FieldSet } from "../ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import useLocationForm from "@/hooks/useLocationForm"
import { Controller } from "react-hook-form"

export default function DeliveryLocationPopover({ onClose }: { onClose: () => void }) {
  
  const session = useSession()
  const token = session.data?.user?.token
const {handleAddressForm,handleSubmit,register,errors,isLoading,control} = useLocationForm(onClose)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-80 rounded-lg shadow-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h4 className="font-semibold text-sm">
            Choose your delivery location
          </h4>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <p className="text-xs text-gray-500">
            Delivery options and delivery speeds may vary for different locations
          </p>

          {/* Sign in button or Form */}
          {token ? (
            
              <FieldSet onSubmit={handleSubmit(handleAddressForm)}>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...register("name")} placeholder="Home" name="name" required />
                </Field>

                <Field>
                  <FieldLabel>Details</FieldLabel>
                  <Input {...register("details")} placeholder="Home details" name="details" required />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input {...register("phone")} placeholder="01010700700" name="phone" required />
                </Field>

                <Controller  control={control} name="city" render={({field:{onChange,value}})=>{
                  return <Field>
                  <FieldLabel>City</FieldLabel>
                  <Select  value={value} onValueChange={onChange} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your Governorate" />
                    </SelectTrigger>
                    <SelectContent>
                      {governorates.map((gov) => (
                        <SelectItem key={gov.value} value={gov.value}>
                          {gov.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                }}>
                  
                </Controller>

                <Button type="submit" className="w-full bg-[#E8622A] hover:bg-[#d4561f] text-white mt-4">
                  Save Location
                </Button>
              </FieldSet>
            
          ) : (
            <Button 
              asChild 
              className="w-full bg-[#E8622A] hover:bg-[#d4561f] text-white"
            >
              <Link href="/auth/register">
                Sign in to see your addresses
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
