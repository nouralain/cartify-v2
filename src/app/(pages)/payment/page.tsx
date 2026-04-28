import Link from 'next/link';

import { Button } from "@/components/ui/button";

export default async function PaymentPage() {
 
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Checkout Header */}
      <header className="border-b border-gray-200 bg-linear-to-b from-gray-50 to-white py-4 md:py-6">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-amazon-blue">Cartify</h1>
          </Link>
          <h2 className="text-xl md:text-2xl text-[#0f1111] font-normal">
            Checkout <span className="text-amazon-blue">( items)</span>
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
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#0f1111] mb-2">1  Shipping address</h3>
            <div className="border border-gray-200 rounded p-4 pl-12 bg-gray-50 text-sm flex justify-between">
              <div>
                <p className="font-bold text-[#0f1111]">{ "Customer"}</p>
                <p className="text-[#0f1111]">123 Example Street, Apt 4B</p>
                <p className="text-[#0f1111]">Cairo, Egypt 11511</p>
              </div>
              <button className="text-amazon-blue hover:text-[#c45500] hover:underline font-medium h-fit">Change</button>
            </div>
          </div>

          <hr className="border-gray-200 my-4" />

          {/* Section 2: Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#e47911] mb-4">2  Payment method</h3>
            <div className="border border-gray-200 shadow-sm rounded">
              
              <div className="p-4 border-b border-gray-200 bg-[#fcedd4] rounded-t flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" id="credit" className="text-[#e47911] focus:ring-[#e47911]" defaultChecked />
                  <label htmlFor="credit" className="font-bold">Credit or debit cards</label>
                  {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" width={30} height={10} className="object-contain" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={25} height={15} className="object-contain" /> */}
                </div>
              </div>

              <div className="p-4 bg-white flex flex-col gap-4">
                <div className="flex flex-col gap-2 max-w-sm">
                  <label className="text-sm font-bold">Card number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="border border-gray-300 rounded px-3 py-1.5 focus:border-[#e47911] outline-none shadow-sm " />
                </div>
                <div className="flex gap-4 max-w-sm">
                   <div className="flex flex-col gap-2 w-1/2">
                    <label className="text-sm font-bold">Expiration date</label>
                    <div className="flex gap-2">
                      <select className="border border-gray-300 rounded px-2 py-1.5 focus:border-[#e47911] outline-none shadow-sm  w-full bg-white"><option>01</option></select>
                      <select className="border border-gray-300 rounded px-2 py-1.5 focus:border-[#e47911] outline-none shadow-sm  w-full bg-white"><option>2026</option></select>
                    </div>
                   </div>
                   <div className="flex flex-col gap-2 w-1/2">
                    <label className="text-sm font-bold">CVV</label>
                    <input type="text" placeholder="123" className="border border-gray-300 rounded px-3 py-1.5 focus:border-[#e47911] outline-none shadow-sm " />
                   </div>
                </div>
                <div>
                   <button className="bg-white hover:bg-gray-50 border border-gray-300 shadow-sm rounded-lg px-4 py-1.5 text-sm">Add your card</button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" id="cod" className="text-[#e47911] focus:ring-[#e47911]" />
                  <label htmlFor="cod" className="font-bold border-gray-300">Cash on Delivery (COD)</label>
                </div>
              </div>
            </div>
            
            {/* Promo code */}
            <div className="mt-6">
              <label className="text-sm font-bold block mb-2">Gift cards & promotional codes</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter code" className="border border-gray-300 rounded px-3 py-1.5 focus:border-[#e47911] outline-none shadow-sm  w-full max-w-50" />
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-500 shadow-sm rounded-lg px-4 py-1.5 text-sm">Apply</button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600">
              <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black w-auto px-6 rounded-lg text-sm border border-[#FCD200]/50 mb-4 shadow-sm">
                Use this payment method
              </Button>
              <p>You can review this order before it's final.</p>
            </div>
          </div>

          <hr className="border-gray-200 my-4" />

          {/* Section 3: Offers */}
          <div className="mb-6">
             <h3 className="text-lg md:text-xl font-bold text-gray-500 mb-2">3  Offers</h3>
          </div>
          <div className="mb-6">
             <h3 className="text-lg md:text-xl font-bold text-gray-500 mb-2">4  Items and shipping</h3>
          </div>

        </div>

        {/* Right Column (Order Summary) */}
        <div className="md:w-1/3">
          <div className="border border-gray-200 rounded p-4 bg-white sticky top-4 shadow-sm">
            <Button className="w-full mb-2 bg-[#FFD814] hover:bg-[#F7CA00] text-[#0f1111] rounded-full border border-transparent whitespace-nowrap font-medium shadow-[0_2px_5px_rgba(213,217,217,0.5)]">
               Place your order
            </Button>
            <p className="text-xs text-center text-gray-600 mb-4 px-2">By placing your order, you agree to Cartify's privacy notice and conditions of use.</p>
            
            <hr className="border-gray-200 my-4 -mx-4" />
            
            <h3 className="font-bold text-lg mb-2">Order Summary</h3>
            <div className="text-sm space-y-1 mb-2 text-[#0f1111]">
              <div className="flex justify-between">
                <span>Items ():</span>
                <span>EGP </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span>EGP 0.00</span>
              </div>
              <div className="flex justify-between text-gray-500 italic">
                <span>Free Shipping:</span>
                <span>-EGP 0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total before tax:</span>
                <span>EGP </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax to be collected:</span>
                <span>EGP 0.00</span>
              </div>
            </div>
            
            <hr className="border-gray-200 my-4 -mx-4" />
            
            <div className="flex justify-between font-bold text-lg text-[#b12704]">
              <span>Order total:</span>
              <span>EGP </span>
            </div>
            
            <div className="mt-4 bg-gray-50 p-2 text-xs rounded border border-gray-200">
               <span className="text-amazon-blue hover:underline cursor-pointer">How are shipping costs calculated?</span>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
