"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import { ProductCard } from "../product/productCard";
import { Skeleton } from "../ui/skeleton";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  
  const [wishListProd, setWishListProd] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getWishProd() {
    if (!session?.user?.token) return;
    
    setIsLoading(true);
    try {
      const resp = await apiClient.getUserWishlist(session.user.token);
      setWishListProd(resp.data); 
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getWishProd();
    }
  }, [status]); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : wishListProd?.length > 0 ? (
        wishListProd.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}