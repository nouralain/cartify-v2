"use client";

import { apiClient } from "@/lib/api-client";
import { getUserAddress } from "@/redux/slices/userAddress";
import { AppDispatch } from "@/redux/store";
import { deliverySchema } from "@/schemes/deliverySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import z from "zod";

export default function useLocationForm(onClose: () => void ) {
         const [isLoading , setIsLoading] = useState(false)
         const dispatch = useDispatch <AppDispatch>()
    const session = useSession()
    const token = session.data?.user.token
  const {handleSubmit,register,formState:{errors},control} = useForm({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    mode:"onSubmit",
    resolver:zodResolver(deliverySchema)
  });
  type userAddressData = z.infer<typeof deliverySchema >

  async function handleAddressForm(data:userAddressData) {
        setIsLoading(true)

const response = await apiClient.sendUserAddress(data.name,data.details,data.phone,data.city,token!)
if(response.status==="success"){
    setIsLoading(false)
    dispatch(getUserAddress(token!))
    onClose()
}
  }
  return { handleAddressForm ,handleSubmit,register,errors,isLoading,control};
}
