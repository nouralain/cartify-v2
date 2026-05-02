"use client"
import { governorates } from "@/lib/constants/governorates"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
export default function DeliveryLocationPopover({ onClose }: { onClose: () => void }) {
  const [selectedGovernorate, setSelectedGovernorate] = useState("")
const session = useSession()
const token = session.data?.user.token
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="w-80 rounded-lg shadow-lg bg-white ">
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
      <div className="p-4 space-y-4">
        <p className="text-xs text-gray-500">
          Delivery options and delivery speeds may vary for different locations
        </p>

        {/* Sign in button */}
        {token ?
             <select
          value={selectedGovernorate}
          onChange={(e) => setSelectedGovernorate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E8622A]"
        >
          <option value="">Select your Governorate</option>
          {governorates.map((gov) => (
            <option key={gov.value} value={gov.value}>
              {gov.label}
            </option>
          ))}
        </select>:
        <Button 
  asChild 
  className="w-full bg-[#E8622A] hover:bg-[#d4561f] text-white"
>
  <Link href="/auth/register">
    Sign in to see your addresses
  </Link>
</Button>}

      
   
      </div>
    </div>
    </div>
  )
}