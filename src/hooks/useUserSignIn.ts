import { userSignIn } from "@/schemes/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
 
 export default function useUserSignIn() {
    const [isLoading , setIsLoading]=useState(false)
const router=useRouter()
  const {handleSubmit,register,formState:{errors}} = useForm({
    defaultValues:{email:"" , password:""},
    resolver:zodResolver(userSignIn)
  })
type UserSignInData = z.infer<typeof userSignIn>

  const  userData = async(data:UserSignInData) => {
    setIsLoading(true)
const response = await signIn("credentials",{
  email:data.email,
  password:data.password,
  redirect:false,
})
setIsLoading(false)

if(response?.ok){
router.push("/")
}
  }
   return {isLoading,userData,handleSubmit,register,errors}
 }
 
