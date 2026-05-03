import Link from 'next/link';

import CheckoutBtn from '@/components/payment/CheckoutBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiClient } from '@/lib/api-client';
import AddressDetails from '@/components/payment/AddressDetails';
import Image from 'next/image';

export default async function PaymentPage() {
 const session =await getServerSession(authOptions)
 const token = session?.user.token
const userCart= await apiClient.getCartProd(token!)
const {cartId ,numOfCartItems} = userCart
const {totalCartPrice,products  } = userCart.data
 const userAddress = await apiClient.getUserAddress(token!)
 const {details,phone,city} = userAddress.data[userAddress.data.length-1]
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Checkout Header */}
      <header className="border-b border-gray-200 bg-linear-to-b from-gray-50 to-white py-4 md:py-6">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-amazon-blue">Cartify</h1>
          </Link>
          <h2 className="text-xl md:text-2xl text-[#0f1111] font-normal">
            Checkout <span className="text-amazon-blue">({numOfCartItems} items)</span>
          </h2>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Column (Forms) */}
        <div className="grow md:w-2/3">
          
          {/* Section 1: Shipping Address */}
          {userAddress.data.length>0?
<AddressDetails/>:
 ""
        }
          <hr className="border-gray-200 my-4" />

          {/* Section 2: Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#e47911] mb-4">2  Payment method</h3>
            <div className="border border-gray-200 shadow-sm rounded">
              
              <div className="p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" id="credit" className="text-[#e47911] focus:ring-[#e47911]" defaultChecked />
                  <label htmlFor="credit" className="font-bold">Credit or debit cards</label>
                  <Image src="/Visa.svg" alt="Visa" width={30} height={10} className="object-contain" />
                  <Image src="/Mastercard-logo.svg" alt="Mastercard" width={25} height={15} className="object-contain" />
                </div>
              </div>


              <div className="p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" id="cod" className="text-[#e47911] focus:ring-[#e47911]" />
                  <label htmlFor="cod" className="font-bold border-gray-300">Cash on Delivery (COD)</label>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* Section 3: Review items */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#e47911] mb-4">3  Review items and shipping</h3>
            
            {products.map((product)=><div key={product._id} className="mb-3 border border-gray-200 shadow-sm rounded p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Image width={50} height={50} src={product.product.imageCover} alt={product.product.title} className="w-24 h-24 bg-gray-100 rounded-md "/>
                  
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#0f1111] text-sm md:text-base">{product.product.title}</h4>
                  <p className="text-[#b12704] font-bold mt-1">{product.count * product.price}</p>
                  <p className="text-sm text-gray-600 mt-1">Qty: {product.count}</p>
                  <p className="text-xs text-[#007600] mt-1 font-semibold">In Stock</p>
                  <p className="text-xs text-gray-500 mt-1">Sold by: Cartify Official</p>
                </div>
              </div>
            </div>)}
          </div>

        </div>

        {/* Right Column (Order Summary) */}
        <div className="md:w-1/3">
          <div className="border border-gray-200 rounded p-4 bg-white sticky top-4 shadow-sm">
            <CheckoutBtn cartId={cartId} token={token!} city={city} details={details} phone={phone}/>
            <p className="text-xs text-center text-gray-600 mb-4 px-2">By placing your order, you agree to Cartify's privacy notice and conditions of use.</p>
            
            <hr className="border-gray-200 my-4 -mx-4" />
            
            <h3 className="font-bold text-lg mb-2">Order Summary</h3>
            <div className="text-sm space-y-1 mb-2 text-[#0f1111]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{totalCartPrice} EGP </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span>EGP 50</span>
              </div>
              <div className="flex justify-between text-gray-500 italic">
                <span>Free Shipping:</span>
                <span>-EGP 50</span>
              </div>
            </div>
            
            <hr className="border-gray-200 my-4 -mx-4" />
            
            <div className="flex justify-between font-bold text-lg text-[#b12704]">
              <span>Order total:</span>
              <span>{totalCartPrice} EGP </span>
            </div>
            

          </div>
        </div>

      </main>
    </div>
  );
}
