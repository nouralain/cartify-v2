import Image from "next/image";
import Link from "next/link";
import {Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/IProducts";
import WishlistButton from "../wishlist/WishlistButton";
import AddToCartBtn from './AddToCartBtn';


export function ProductCard({ product }: { product: IProduct }) {
  const {_id,imageCover,price,ratingsAverage,title,ratingsQuantity,brand} = product
  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 !== 0;

  return (
    <div key={_id} className="bg-white border border-gray-200 rounded-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 p-3 flex flex-col h-full group">
      <div className="relative ">
        <Link href={`/products/${_id}`} className=" h-48 w-full bg-gray-50 flex items-center justify-center p-2 rounded-sm mb-3 group-hover:bg-gray-100 transition-colors">
        <Image 
          src={imageCover} 
          alt={title} 
          
          fill
          className="object-contain mix-blend-multiply " 
          sizes="(max-width: 768px) 100vw, 250px"
        />
      </Link>
       <WishlistButton prodId={_id}/>
      </div>
      
      <div className=" grow flex flex-col">
        <h2 className="font-bold">{brand.name}</h2>
        <Link href={`/products/${_id}`}>
          <h3 className="text-[#0f1111] hover:text-[#c45500] font-medium text-sm line-clamp-2 mb-1">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-[#FFA41C]">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
            {[...Array(5 - Math.ceil(ratingsAverage))].map((_, i) => (
              <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
            ))}
          </div>
          <span className="text-amazon-blue text-sm hover:underline hover:cursor-pointer">{ratingsQuantity}</span>
        </div>
        
        <div className="mb-2">
          <span className="text-xs text-gray-500">2K+ bought in past month</span>
        </div>
        
        <div className="mb-auto">
            <Link href={`/products/${_id}`}>
          <div className="flex items-start">
            <span className="text-sm pt-1">EGP</span>
            <span className="text-2xl font-bold">{Math.floor(price)}</span>
            <span className="text-sm pt-1">
              {(price % 1).toFixed(2).substring(2)}
            </span>
          </div>
            </Link>
          <div className="text-xs text-muted- mt-1 space-y-1">
            <div className="flex items-center">
              <span className="font-bold text-[#0f1111] bg-gray-100 rounded px-1 flex shrink-0">vprime</span>
              <span className="ml-1">FREE delivery <strong>Tomorrow</strong></span>
            </div>
            <p>Or fastest delivery <strong>Today</strong></p>
          </div>
        </div>
        <AddToCartBtn prodId={_id} className={"w-full mt-3 bg-[#FFD814] hover:bg-[#F7CA00] text-black rounded-full border-0 shadow-none font-medium text-sm"}>
          Add to cart

        </AddToCartBtn>
       
      </div>
    </div>
  );
}
