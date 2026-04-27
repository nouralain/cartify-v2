"use client"
import { ICartProductItem } from '@/interfaces/ICartProductItem'
import { apiClient } from '@/lib/api-client'
import { getCartData } from '@/redux/slices/cartData'
import { AppDispatch } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

export default function ProdCount({item}:{item:ICartProductItem}) {
  const session = useSession()
  const token = session.data?.user.token
    const dispatch = useDispatch <AppDispatch>()

 async function handleProdCounterDec(){
  let count = item.count -1
const resp = await apiClient.updateProdCount(item.product._id,token!,count )
if(resp.status==="success"){
   dispatch(getCartData(token!))
}
return resp
  }

 async function handleProdCounterInc(){
let count = item.count +1
const resp = await apiClient.updateProdCount(item.product._id,token!,count )
if(resp.status==="success"){
   dispatch(getCartData(token!))
}
return resp

  }

  return (
    <>
     <button onClick={handleProdCounterDec} className="border border-gray-300 rounded-md bg-gray-100 px-2 py-1 outline-none shadow-sm cursor-pointer  hover:bg-[#E3E6E6]">-</button>
                       <span>{item.count}</span>
                       <button onClick={handleProdCounterInc} className="border border-gray-300 rounded-md bg-gray-100 px-2 py-1 outline-none shadow-sm cursor-pointer  hover:bg-[#E3E6E6]">+</button>
                     
    </>
  )
}
