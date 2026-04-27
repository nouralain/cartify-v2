"use client";
import Link from "next/link";
import { ShoppingCart, MapPin } from "lucide-react";
import { CategoryDropdown } from "@/components/layout/CategoryDropdown";
import logo from "../../../public/Gemini_Generated_Image_smrgtbsmrgtbsmrg (1)(1).png";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeliveryLocationPopover from "./DeliveryLocation";
import { usePathname} from "next/navigation";
import { IResponse } from '@/interfaces/IResponse';
import { ICategory } from "@/interfaces/ICategory";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
export function Header({categories}:{categories:IResponse<ICategory[]>}) {
  const [openPoppers, setOpenPoppers] = useState(false);

  // when url changes close poppers -> fix unclosing popper when return back to home
  const pathname = usePathname();
  useEffect(() => {
    setOpenPoppers(false);
  }, [pathname]);

  const session = useSession()

  return (
    <>
      <header className="flex flex-col w-full relative z-40 " id="top">
        {/* Announcement Bar */}
        <div className="bg-[#ff9900] text-[#0f1111] text-xs sm:text-sm font-bold text-center py-1.5 px-4 flex justify-center items-center hover:bg-amazon-accent-hover transition-colors cursor-pointer group">
          <span>Free Delivery on your first order. </span>
          <span className="ml-1 underline decoration-transparent group-hover:decoration-[#0f1111] transition-colors">
            Shop Now
          </span>
        </div>

        {/* Top Bar */}
        <div className="bg-amazon-dark py-2 text-white flex flex-col sm:flex-row items-center px-4  gap-4 ">
          <div className="flex w-full sm:w-auto items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col justify-center px-1 border border-transparent hover:border-white rounded-sm pb-1 me-6"
            >
              <span className="text-2xl font-bold tracking-tighter ">
                <div className="flex items-center gap-2">
                  <Image src={logo} alt="logo" width={30} height={30} />
                  <span>
                    Cartify<span className="text-sm">.eg</span>
                  </span>
                </div>
              </span>
            </Link>

            {/* Mobile Cart/User Icons */}
            <div className="sm:hidden flex items-center gap-2">
              <Link
                href="/cart"
                className="flex items-center px-2 border border-transparent rounded-sm relative"
              >
                <span className="absolute -top-1 left-4 font-bold text-[#ff9900]">
                  0
                </span>
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Location (Desktop) */}
          <button
            onClick={() => setOpenPoppers(!openPoppers)}
            className="hidden md:flex items-end px-2  border border-transparent hover:border-white rounded-sm cursor-pointer pb-1"
          >
            <MapPin className="h-5 w-5 mb-1 mr-1" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-300 leading-tight">
                Deliver to
              </span>
              <span className="text-sm font-bold leading-tight">
                Your Address
              </span>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <SearchBar categories={categories} />
          {/* Account & Lists */}
         {session.status==="unauthenticated"? <Link
            href={"/auth/login"}
            className="hidden md:flex flex-col px-2 border border-transparent hover:border-white rounded-sm cursor-pointer"
          >
            <span className="text-xs text-gray-300 leading-tight">
              Hello, sign in
            </span>
            <span className="text-sm font-bold leading-tight">
              Account & Lists
            </span>
          </Link>:
          <Button onClick={()=>signOut({callbackUrl:"/auth/login"})} className="px-2 border border-transparent hover:border-white rounded-sm cursor-pointer text-sm  font-bold leading-tight">Sign out</Button>
          }

          {/* Returns & Orders */}
          <Link href="/orders" className="hidden lg:flex flex-col px-2 border border-transparent hover:border-white rounded-sm cursor-pointer">
            <span className="text-xs text-gray-300 leading-tight">Returns</span>
            <span className="text-sm font-bold leading-tight">& Orders</span>
          </Link>

          {/* Cart - Desktop */}
          <Link
            href="/cart"
            className="hidden sm:flex items-center px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer relative"
          >
            <div className="relative">
              <span className="absolute -top-2 left-3 font-bold text-[#ff9900]">
                0
              </span>
              <ShoppingCart className="h-8 w-8" />
            </div>
            <span className="text-sm font-bold mt-3 hidden md:block">Cart</span>
          </Link>
        </div>
        {/* Sub Bar */}
        <div className="bg-[#37475a] text-white flex items-center px-4 py-1 gap-2 sm:gap-4 text-sm min-h-10 flex-wrap md:flex-nowrap">
          <CategoryDropdown />
          <Link
            href="/products"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1"
          >
            Today&apos;s Deals
          </Link>
          <Link
            href="/categories"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1"
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1"
          >
            Featured Brands
          </Link>
          <Link
            href="/support"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1"
          >
            Customer Service
          </Link>
         
          <Link
            href="/orders"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1 hidden sm:block"
          >
            My Orders
          </Link>
          <Link
            href="/wishlist"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1 hidden sm:block"
          >
            My Wishlist
          </Link>
           {session.status==="unauthenticated"&&<Link
            href="/auth/register"
            className="hover:border hover:border-white border border-transparent px-1 rounded-sm whitespace-nowrap py-1"
          >
            Register
          </Link> }
        </div>
      </header>
      {openPoppers && (
        <DeliveryLocationPopover onClose={() => setOpenPoppers(false)} />
      )}
    </>
  );
}
