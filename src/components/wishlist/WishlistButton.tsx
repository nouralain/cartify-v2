"use client";
import useWishListButton from "@/hooks/useWishListButton";
import { Heart } from "lucide-react";


export default function WishlistButton({ prodId }: { prodId: string }) {
  const {isAdded,handleWishList} = useWishListButton(prodId)
 return (
    <button onClick={handleWishList}>
      <Heart
        size={20}
        strokeWidth={1}
        className={`absolute top-2 right-2 hover:text-red-500 ${isAdded ? "text-red-700 fill-red-700" : "text-black"}`}
      />
    </button>
  );
}
