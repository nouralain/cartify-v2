"use client";
import { IBrand } from "@/interfaces/IBrand";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {  useState } from "react";

export default function BrandsList({ brands }: { brands:IBrand[] }) {
  const [showAllBrands, setShowAllBrands] = useState(false);
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentBrandId = searchParams.get("brand");

    function handleBrandClick(id:string){
      const params = new URLSearchParams(searchParams)
      if (currentBrandId === id) {
      params.delete("brand");
    } else {
      params.set("brand", id);
    }
      router.push(`?${params.toString()}`)
    }
 const displayedBrands = showAllBrands ? brands : brands.slice(0, 5);
  return (
    <>
      {
      displayedBrands.map((brand) => (
        <label
          key={brand._id}
          className="flex items-center space-x-2 text-sm cursor-pointer hover:text-[#c45500]"
        >
          <input
            type="radio"
            name="brand"
            checked={currentBrandId === brand._id}
            onClick={() => handleBrandClick(brand._id)}
            className="rounded text-amazon-blue focus:ring-[#ff9900]"
          />
          <span>{brand.name}</span>
        </label>
      ))
      }
      <button
        onClick={() => setShowAllBrands(!showAllBrands)}
        className="flex items-center hover:underline hover:text-amazon-accent "
      >
        <ChevronDown />
        {showAllBrands ? "See less" : "See more"}
      </button>
    </>
  );
}
