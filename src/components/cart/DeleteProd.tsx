"use client"

import { apiClient } from "@/lib/api-client";
import { getCartData } from "@/redux/slices/cartData";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function DeleteProd({prodId , token}:any) {
  const dispatch = useDispatch <AppDispatch>()

    async function handleDeleteProd() {
        const resp = await apiClient.removeProdFromCart(prodId , token)
        if(resp.status==="success"){
            console.log("deleted");
             dispatch(getCartData(token))
            toast.success(resp.message)
        }
        
        return resp
    }

  return <button onClick={handleDeleteProd} className="text-red-600! hover:underline">Delete</button>;
}
