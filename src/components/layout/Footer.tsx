"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-amazon-dark text-white mt-auto">
      {/* Back to top feature */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="block text-center bg-[#37475a] hover:bg-[#485769] py-4 text-sm transition-colors cursor-pointer text-white"
      >
        Back to top
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4 text-sm md:text-base">Get to Know Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#" className="hover:underline">Careers</Link></li>
            <li><Link href="#" className="hover:underline">Blog</Link></li>
            <li><Link href="#" className="hover:underline">About Cartify</Link></li>
            <li><Link href="#" className="hover:underline">Investor Relations</Link></li>
            <li><Link href="#" className="hover:underline">Cartify Devices</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm md:text-base">Make Money with Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#" className="hover:underline">Sell products on Cartify</Link></li>
            <li><Link href="#" className="hover:underline">Sell on Cartify Business</Link></li>
            <li><Link href="#" className="hover:underline">Sell apps on Cartify</Link></li>
            <li><Link href="#" className="hover:underline">Become an Affiliate</Link></li>
            <li><Link href="#" className="hover:underline">Advertise Your Products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm md:text-base">Cartify Payment Products</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#" className="hover:underline">Cartify Business Card</Link></li>
            <li><Link href="#" className="hover:underline">Shop with Points</Link></li>
            <li><Link href="#" className="hover:underline">Reload Your Balance</Link></li>
            <li><Link href="#" className="hover:underline">Cartify Currency Converter</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm md:text-base">Let Us Help You</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/support" className="hover:underline">Cartify and COVID-19</Link></li>
            <li><Link href="/support" className="hover:underline">Your Account</Link></li>
            <li><Link href="/support" className="hover:underline">Your Orders</Link></li>
            <li><Link href="/support" className="hover:underline">Shipping Rates & Policies</Link></li>
            <li><Link href="/support" className="hover:underline">Returns & Replacements</Link></li>
            <li><Link href="/support" className="hover:underline">Help</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3a4553] py-8 text-center text-sm text-gray-300">
        <div className="flex justify-center items-center gap-4 flex-wrap md:gap-6 mb-4">
          <Link href="#" className="hover:underline">Conditions of Use</Link>
          <Link href="#" className="hover:underline">Privacy Notice</Link>
          <Link href="#" className="hover:underline">Consumer Health Data Privacy Disclosure</Link>
          <Link href="#" className="hover:underline">Your Ads Privacy Choices</Link>
        </div>
        <p>© 1996-2026, Cartify.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}
