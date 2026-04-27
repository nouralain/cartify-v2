"use client"
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch} from "@/redux/store";
import { getCartData } from '@/redux/slices/cartData';
interface Props {
  className?: string
  children: React.ReactNode
  prodId: string
}
export default function AddToCartBtn({className , children,prodId}:Props) {
    const {data} = useSession()
    const token = data?.user?.token
    const [isLoading , setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
   async function handleAddToCart(){
    setIsLoading(true)
        const response = await apiClient.addProdToCart(prodId,token!)
        if(response.status==="success"){
          setIsLoading(false)
                 dispatch(getCartData(token!))
          
          toast.success(response.message)
        }
        
    }
  return (
            <Button onClick={handleAddToCart} disabled={isLoading} className={className}>{children}</Button>

  )
}
