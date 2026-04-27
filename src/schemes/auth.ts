import * as z from "zod"; 
 
export const userSignIn = z.object({ 
  email : z.string().email("Invalid email address"),
   password: z.string().min(8, "Password must be at least 8 characters").refine((val) => /[0-9!@#$%^&*]/.test(val), {
    message: "Add at least one number or special character",
  })
});
export const userSignUp = z.object({ 
  phone:z.string().nonempty("Phone number is requied").refine((val)=>/^01[0125][0-9]{8}$/.test(val),{
    message:"Please enter valid phone number"
  }),
  name: z.string().nonempty("Name is requied").refine((val)=>/^[a-zA-Z\s-]+$/.test(val),{
    message:"Please enter valid name",
   
  }),
    email : z.string().email("Invalid email address").nonempty("Email address is requied"),
   password: z.string().nonempty("Password is requied").min(8, "Password must be at least 8 characters").refine((val) => /[0-9!@#$%^&*]/.test(val), {
    message: "Add at least one number or special character",
  }),
  rePassword:z.string().nonempty("Repassword is requied")
  }).refine((data)=>data.password===data.rePassword,{message:"Passwords don't match",path:["rePassword"]})


