import * as z from "zod"; 

export  const deliverySchema= z.object({
    name:z.string().nonempty("name is required"),
    details:z.string().nonempty("adress details is required"),
    phone: z.string().nonempty("Phone number is requied").refine((val)=>/^01[0125][0-9]{8}$/.test(val),{
    message:"Please enter valid phone number",
  }),
   city: z.string().nonempty("city is required"),

})
