"use client";
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
import { redirect } from "next/navigation";

export default function CartPage() {
  const session = useSession();
  const token = session?.data?.user.token;
console.log(token);

  const { cartData } = useSelector((state: RootState) => state.cartDataRed);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (token) {
      dispatch(getCartData(token));
    }
  }, [token, dispatch]);

  // if no data yet and user logged in
  if (!cartData && session.status === "authenticated") {
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
            <h1 className="text-2xl sm:text-3xl font-normal text-[#0f1111]">
              Shopping Cart
            </h1>
            {isEmpty || (
              <span className="text-sm text-muted-foreground hidden sm:block">
                Price
              </span>
            )}
          </div>

          {isEmpty ? (
            <div className="flex flex-col sm:flex-row items-center py-8 px-4 gap-8">
              <div className="shrink-0 text-[#D5D9D9]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="140"
                  height="140"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left text-[#0f1111]">
                <h2 className="text-2xl font-bold mb-2">
                  Your Shopping Cart is empty.
                </h2>
                <Link
                  href="/products"
                  className="text-amazon-blue hover:text-[#c45500] hover:underline mb-4 text-sm font-medium"
                >
                  Shop today's deals
                </Link>
                <div className="flex gap-3 mt-4 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
                  {session?.data?.user.token ? (
                    <Link href="/products">
                      <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-transparent font-medium px-5 shadow-sm min-w-50 h-9">
                        Start shopping now
                      </Button>
                    </Link>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {cartData?.data.products.map((item) => (
                <CartItem item={item} token={token!} />
              ))}

              <div className="flex justify-between pt-4">
                <DeleteAllProd token={token!} />
                <span className="text-lg text-[#0f1111]">
                  Subtotal ({cartData?.data.products.length} items):{" "}
                  <span className="font-bold">{`${cartData?.data.totalCartPrice} L.E`}</span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* Checkout Summary Area */}
        {!isEmpty && (
          <div className="w-full lg:w-75 shrink-0">
            <div className="bg-white p-5 rounded-sm shadow-sm relative">
              <h2 className="text-xl font-bold mb-1">Order Summary</h2>
              <p className="text-sm text-gray-500 mb-6">{cartData?.numOfCartItems} Items in cart</p>

              <div className="space-y-3 mb-6 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-[#0f1111]">
                  <span>Subtotal</span>
                  <span className="font-semibold">{`${cartData?.data.totalCartPrice} L.E`}</span>
                </div>
                <div className="flex justify-between text-[#0f1111]">
                  <span>Shipping Fee</span>
                  <span className="text-[#007600] font-semibold">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-[#0f1111] text-lg font-extrabold mb-6">
                <span>Total</span>
                <span>{`${cartData?.data.totalCartPrice} L.E`}</span>
              </div>

              <Button
                variant="outline"
                className="w-full mb-4 border-[#D5D9D9] hover:bg-gray-50 text-[#0f1111] rounded-full h-9"
              >
                Apply Promo Code
              </Button>

              <Button
                onClick={() => redirect("/payment")}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-[#FCD200]/50 font-medium h-9 mb-4 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Secure Checkout
              </Button>

              <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground mt-4">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v7h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4.158a1 1 0 00-.293-.707l-2.828-2.828A1 1 0 0016.172 7H14z" /></svg>
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
