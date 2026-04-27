"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCartData } from "@/redux/slices/cartData";
import LoadingComponent from "@/components/LoadingComponent";
import DeleteAllProd from "@/components/cart/DeleteAllProd";

export default  function CartPage() {
const session = useSession()
const token = session?.data?.user.token;

       const {cartData} = useSelector((state:RootState)=>state.cartDataRed)
  
  const dispatch = useDispatch <AppDispatch>()
   useEffect(()=>{
    if(token){
      
       dispatch(getCartData(token))
    }
  },[token, dispatch])

  // if no data yet
  if (!cartData) {
    return <LoadingComponent />;
  }
  const products = cartData?.data?.products || [];
  const isSuccess = cartData?.status === "success";
  const isEmpty = isSuccess && products.length === 0;
  return (
    <div className="bg-[#eaeded] min-h-screen p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Main Cart Items Area */}
        <div className="grow bg-white p-6 rounded-sm shadow-sm">
          <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-4">
            <h1 className="text-2xl sm:text-3xl font-normal text-[#0f1111]">Shopping Cart</h1>
            {isEmpty||<span className="text-sm text-muted-foreground hidden sm:block">Price</span>}
          </div>
          
        {
          isEmpty ? (
          <div className="flex flex-col sm:flex-row items-center py-8 px-4 gap-8">
            <div className="shrink-0 text-[#D5D9D9]">
               <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left text-[#0f1111]">
              <h2 className="text-2xl font-bold mb-2">Your Shopping Cart is empty.</h2>
              <Link href="/products" className="text-amazon-blue hover:text-[#c45500] hover:underline mb-4 text-sm font-medium">
                Shop today's deals
              </Link>
              <div className="flex gap-3 mt-4 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
               {session?.data?.user.token? 
              
              <Link href="/products">
                  <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-transparent font-medium px-5 shadow-sm min-w-50 h-9">
                    Start shopping now
                  </Button>
                </Link>:
                <>
               <Link href="/auth/login">
                  <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-transparent font-medium px-5 shadow-sm min-w-50 h-9">
                    Sign in to your account
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-white hover:bg-gray-50 text-[#0f1111] rounded-full border border-[#D5D9D9] font-medium px-5 shadow-[0_2px_5px_rgba(213,217,217,0.5)] min-w-50 h-9">
                    Sign up now
                  </Button>
                </Link>
               </>
               }
              </div>
            </div>
          </div>
          ):
          <>
          {cartData?.data.products.map((item) => (
          <CartItem item={item } token={token!}/>
          ))}
          
          <div className="flex justify-between pt-4">
            <DeleteAllProd token={token!}/>
            <span className="text-lg text-[#0f1111]">Subtotal ({cartData?.data.products.length} items): <span className="font-bold">{`${cartData?.data.totalCartPrice} L.E`}</span></span>
          </div>
          </>
          
        }
          
        </div>

        {/* Checkout Summary Area */}
        {!isEmpty && (
            <div className="w-full lg:w-75 shrink-0">
          <div className="bg-white p-5 rounded-sm shadow-sm relative">
            <div className="flex items-center gap-2 mb-4 text-xs text-[#007600]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current shrink-0" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Your order qualifies for FREE Shipping.</span>
            </div>
            
            <div className="mb-4 text-lg text-[#0f1111]">
              Subtotal ({cartData?.numOfCartItems}): <span className="font-bold">{`${cartData?.data.totalCartPrice} L.E`}</span>
            </div>
            

            <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-[#FCD200]/50 font-medium h-9">
              Proceed to checkout
            </Button>
          </div>

         
        </div>
        )}
      
      </div>
    </div>
  );
}
