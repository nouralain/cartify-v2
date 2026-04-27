"use client"
import { IBrand } from "@/interfaces/IBrand";
import { ICategory } from "@/interfaces/ICategory";
import { apiClient } from "@/lib/api-client";
import { Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export  function CategoryDropdown() {
  
const [categories,setCategories] = useState<ICategory[]>([])
const [brands,setBrands] = useState<IBrand[]>([])
  
  useEffect(()=>{
    async function getData(){
      const cats = await apiClient.getCategories()
      const bran = await apiClient.getBrands()
      setCategories(cats.data);
        setBrands(bran.data);
    }
    getData()
  },[])
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 font-bold hover:border hover:border-white border border-transparent px-1 rounded-sm py-1 outline-none">
        <Menu className="h-5 w-5" />
        All
      </button>

      {/* Invisible bridge to prevent hover loss when moving mouse down */}
      <div className="absolute top-full left-0 w-full h-2 hidden group-hover:block" />

      {/* The visible hover area that triggers the Mega Menu */}
      <div className="absolute  top-[calc(100%+4px)] left-0 w-75 sm:w-87.5 bg-white text-[#0f1111] shadow-2xl border border-gray-200 hidden group-hover:flex flex-col z-50 rounded-sm overflow-hidden h-[70vh] max-h-125 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-default">
        <div className="bg-amazon-dark text-white px-6 py-4 flex items-center gap-3">
          <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Hello, sign in</span>
        </div>
        
        <div className="grow overflow-y-auto pb-4">
          <div className="py-3 border-b border-gray-300">
            <h3 className="font-bold text-base px-6 py-2 tracking-tight text-[#0f1111]">Shop by Category</h3>
            <ul className="text-sm">
              {categories.slice(5).map((category, idx) => (
                <li key={idx}>
                  <Link href={`/categories/${category._id}`} className="flex items-center justify-between px-6 py-2 hover:bg-gray-100 text-[#111] transition-colors">
                    {category.name} <ChevronRight className="h-4 w-4 text-gray-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-3">
            <h3 className="font-bold text-base px-6 py-2 tracking-tight text-[#0f1111]">Shop by Brand</h3>
            <ul className="text-sm">
              {brands.slice(0,5).map((brand, idx) => (
                <li key={idx}>
                  <Link href={`/brands/${brand._id}`} className="flex items-center justify-between px-6 py-3 hover:bg-gray-100 text-[#111] transition-colors">
                    {brand.name} <ChevronRight className="h-4 w-4 text-gray-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
