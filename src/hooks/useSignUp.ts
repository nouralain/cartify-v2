import { apiClient } from "@/lib/api-client";
import { userSignUp } from "@/schemes/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function useSignUp(){
     const [isLoading , setIsLoading] = useState(false)
  const router=useRouter()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
   resolver:zodResolver(userSignUp),
   mode:"onSubmit"
  });
  type userSignUpData = z.infer<typeof userSignUp >
  
  const userSignUpData =async (data:userSignUpData) => {
    setIsLoading(true)
    const response = await apiClient.signup(data.name,data.email,data.password,data.rePassword,data.phone)
    
    if(response.message==="success"){
      setIsLoading(false)
      const result = await signIn("credentials",{
         email:data.email,
  password:data.password,
  redirect:false
})
if(result?.ok){
router.push("/")
}
    }
  };
  return {isLoading,handleSubmit,errors,register,userSignUpData}
}