"use client"
import { apiClient } from '@/lib/api-client'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getCartData } from '@/redux/slices/cartData'
import { Spinner } from '../ui/spinner'

export default function DeleteAllProd({token}:{token:string}) {
         const {loading} = useSelector((state:RootState)=>state.cartDataRed)

        const dispatch = useDispatch  <AppDispatch>()

   async function handleDeleteAll(){
        const resp = await apiClient.deleteAllProdFromCart(token)
if(resp.status==="success"){
   dispatch(getCartData(token!))
}
    }
  return (
                <Button onClick={handleDeleteAll} disabled={loading} variant={"destructive"}>{loading?<Spinner/>:"Delete all products"}</Button>

  )
}
