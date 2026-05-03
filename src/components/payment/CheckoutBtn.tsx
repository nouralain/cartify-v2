"use client"
import { useState } from 'react'
import { Button } from '../ui/button'
import { apiClient } from '@/lib/api-client'
import toast from 'react-hot-toast'
interface Props{
    token:string,
    city:string,
    phone:string,
    details:string,
    cartId:string
}
export default function CheckoutBtn({token,city,phone,details,cartId}:Props) {

  const[loading,setLoading] = useState(false)
  async  function handleCheckout(){
    setLoading(true)
        const resp = await apiClient.placeOrder("",details,phone,city,token,cartId)
        if(resp.message==="Order created"){
setLoading(false)
toast.success(resp.message)
        }
    }
  return (
    <Button disabled={loading} onClick={handleCheckout}  className="w-full mb-2 bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-transparent whitespace-nowrap font-medium shadow-[0_2px_5px_rgba(213,217,217,0.5)]">
               Place your order
            </Button>
  )
}
