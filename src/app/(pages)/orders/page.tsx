"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/lib/api-client';
import { IOrderData } from '@/interfaces/orders/IOrderData';
import LoadingComponent from '@/components/LoadingComponent';
import { jwtDecode } from 'jwt-decode';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  const [orders, setOrders] = useState<IOrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!token) return;
      try {
        setIsLoading(true);
        const decode = jwtDecode(token) as { id: string };
        const userOrders = await apiClient.getUserOrders(decode.id, token);
        setOrders(userOrders.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated" && token) {
      fetchOrders();
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [token, status]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-250 mx-auto px-4 py-6">
        <div className="flex flex-col mb-4">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="text-amazon-blue hover:text-[#c45500] hover:underline">Your Account</Link>
            <span className="text-gray-500">›</span>
            <span className="text-[#c45500]">Your Orders</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h1 className="text-2xl sm:text-[28px] font-normal text-[#0f1111]">Your Orders</h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-2 sm:gap-0">
              <input
                type="text"
                placeholder="Search all orders"
                className="border border-[#888c8c] rounded-md sm:rounded-r-none px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#e47911] focus:border-[#e47911] sm:w-62.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] text-sm"
              />
              <button className="bg-[#343a40] text-white px-4 py-1.5 rounded-md sm:rounded-l-none hover:bg-gray-800 transition-colors font-medium border border-transparent shadow-sm text-sm whitespace-nowrap">
                Search Orders
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-300 mt-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="py-2 pr-6 border-b-2 border-[#e47911] text-[#0f1111] font-bold text-sm">Orders</button>
            <button className="py-2 px-6 text-amazon-blue hover:text-[#c45500] hover:underline text-sm">Buy Again</button>
            <button className="py-2 px-6 text-amazon-blue hover:text-[#c45500] hover:underline text-sm">Not Yet Shipped</button>
            <button className="py-2 px-6 text-amazon-blue hover:text-[#c45500] hover:underline text-sm">Cancelled Orders</button>
          </div>
        </div>

        <div className="flex items-center text-sm mb-6 pl-1">
          <span className="font-bold mr-2 text-[#0f1111]">{orders.length} orders</span>
         
        </div>

        <div className="space-y-5">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="border border-[#D5D9D9] rounded-lg overflow-hidden flex flex-col bg-white">
                <div className="bg-[#F0F2F2] p-4 border-b border-[#D5D9D9] flex flex-wrap gap-4 justify-between items-start text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-6 sm:gap-14">
                    <div className="flex flex-col">
                      <span className="mb-1 uppercase text-[11px] text-muted-foreground tracking-wider font-semibold">Order placed</span>
                      <span className="text-[#0f1111] font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 uppercase text-[11px] text-muted-foreground tracking-wider font-semibold">Total</span>
                      <span className="text-[#0f1111] font-medium">{order.totalOrderPrice} L.E</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 uppercase text-[11px] text-muted-foreground tracking-wider font-semibold">Ship to</span>
                      <span className="text-amazon-blue hover:text-[#c45500] hover:underline cursor-pointer">{order.user.name} <span className="text-[10px]">▼</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end w-full sm:w-auto mt-2 sm:mt-0">
                    <span className="uppercase text-[11px] md:text-xs mb-1 font-semibold text-[#0f1111] tracking-wider">Order # {order.id}</span>
                    <div className="flex gap-2 text-xs md:text-sm">
                      <span className="text-amazon-blue hover:text-[#c45500] hover:underline cursor-pointer">View order details</span>
                      <span className="text-[#D5D9D9]">|</span>
                      <span className="text-amazon-blue hover:text-[#c45500] hover:underline cursor-pointer">Invoice</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <h2 className="font-bold text-lg md:text-[20px] text-[#0f1111] mb-4">
                    {order.isDelivered ? "Delivered" : order.isPaid ? "Processing" : "Payment Pending"}
                  </h2>

                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="grow flex flex-col gap-6">
                      {order.cartItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-22.5 h-22.5 relative shrink-0 bg-transparent rounded p-1">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="flex flex-col pt-1">
                            <Link href={`/products/${item.product._id}`} className="font-medium text-amazon-blue hover:text-[#c45500] hover:underline line-clamp-2 md:line-clamp-none mb-1 text-sm">
                              {item.product.title}
                            </Link>
                            <span className="text-xs text-muted-foreground mb-3">Return window closed on {new Date(new Date(order.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            
                          </div>
                        </div>
                      ))}
                    </div>

                   
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border border-[#D5D9D9] rounded-lg p-6 flex flex-col items-center justify-center text-center bg-white py-16 mt-4">
              <div className="mb-4 text-[#D5D9D9]">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
              </div>
              <h2 className="text-xl font-bold text-[#0f1111] mb-2">Looks like you haven't placed an order in the last 3 months.</h2>
              <p className="text-sm text-[#565959] mb-6">Check your Cancelled Orders or change the filter to view older orders.</p>
              <Link href="/">
                <button className="bg-white hover:bg-gray-50 text-[#0f1111] text-sm px-6 py-2 border border-[#D5D9D9] shadow-[0_2px_5px_rgba(213,217,217,0.5)] whitespace-nowrap rounded-lg font-medium transition-colors">
                  Continue shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
