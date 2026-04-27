import { apiClient } from "@/lib/api-client";
import { getWishListProd } from "@/redux/slices/wishlistProductsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function useWishListButton(prodId:string){
const router = useRouter();
  const session = useSession()
  const {wishListProd} = useSelector((state:RootState)=>state.wishListRed)
    const isAdded=wishListProd?.some((item)=>item._id === prodId)

  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(getWishListProd(session.data?.user.token!))
  },[session.data?.user?.token, dispatch])

  async function handleWishList() {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }
    if(isAdded===true){
const response = await apiClient.removeProdFromWishlist(
      prodId,
      session.data?.user.token!,
    );
    if (response.status === "success") {
      dispatch(getWishListProd(session.data?.user.token!))
      toast.success(response.message || "Product removed successfully");
    }
    }else{
const response = await apiClient.addProdToWishList(
      prodId,
      session.data?.user.token!,
    );
    if (response.status === "success") {
      dispatch(getWishListProd(session.data?.user.token!))
      toast.success(response.message);
    }
    }
    
  }
 
    return {isAdded,handleWishList}
}