"use client"
import { useSession } from 'next-auth/react'
import ChangeAddressBtn from './ChangeAddressBtn'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function AddressDetails() {
    const session = useSession()
    const name= session.data?.user.name
    const {allAdressDetails} = useSelector((state:RootState)=>state.addressRed)
  return (
   <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#0f1111] mb-2">1 Shipping address</h3>
            <div className="border border-gray-200 rounded p-4 pl-12 bg-gray-50 text-sm flex justify-between">
              <div>
                <p className="font-bold text-[#0f1111]">{ name}</p>
                <p className="text-[#0f1111]">{allAdressDetails?.details}</p>
                <p className="text-[#0f1111]">{allAdressDetails?.city} 11511</p>
              </div>
              <ChangeAddressBtn/>
            </div>
          </div>
  )
}
