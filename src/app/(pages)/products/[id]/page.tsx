import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import WishlistButton from "@/components/wishlist/WishlistButton";
import AddToCartBtn from "@/components/product/AddToCartBtn";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await apiClient.getSpecificProduct(id);
  const {
    _id,
    brand,
    category,
    description,
    imageCover,
    images,
    price,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    slug,
    sold,
    subcategory,
    title,
  } = product.data;
  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="text-sm text-muted- mb-4 mt-2">
        Home &gt; Category &gt; Subcategory &gt; Product {product.data.title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative mt-4">
        {/* Gallery */}
        <div className="md:col-span-5 flex gap-4">
          <div className="hidden sm:flex flex-col gap-2">
            {images.map((thumb) => (
              <div
                key={thumb}
                className="w-10 h-10 border border-gray-400 hover:border-[#e77600] rounded-sm cursor-pointer p-1 transition-colors overflow-hidden"
              >
                <Image src={thumb} alt="" width={50} height={50} />
              </div>
            ))}
          </div>
          <div className="relative  grow h-100 md:h-150 bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
            <Image
              src={imageCover}
              alt={title}
              fill
              className="object-cover mix-blend-multiply drop-shadow-md"
            />
            <WishlistButton prodId={_id} />
          </div>
        </div>

        {/* Info Area */}
        <div className="md:col-span-4">
          <h1 className="text-2xl sm:text-3xl font-medium leading-tight text-[#0f1111] mb-2">
            {title}
          </h1>
          <a
            href="#"
            className="text-amazon-blue hover:underline text-sm tracking-wide"
          >
            Brand: {brand.name}
          </a>

          <div className="flex items-center gap-4 mt-2 pb-2 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">{ratingsAverage}</span>
              <div className="flex text-[#FFA41C]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <StarHalf className="h-4 w-4 fill-current" />
              </div>
            </div>
            <a href="#" className="text-amazon-blue hover:underline text-sm">
              {ratingsQuantity}
            </a>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-sm pb-1 relative -top-1">EGP</span>
              <span className="text-3xl font-medium">{price}</span>
              <span className="text-sm pb-1 relative -top-1">00</span>
            </div>
            <div className="text-sm text-muted- mt-1 space-y-1">
              <div className="flex items-center">
                <span className="font-bold text-[#0f1111] bg-gray-100 rounded px-1 shrink-0">
                  vprime
                </span>
                <span className="ml-1">FREE Returns</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-base mb-2">About this item</h3>
            <p>{description}</p>
          </div>
        </div>

        {/* Buy Box */}
        <div className="md:col-span-3">
          <div className="border border-gray-300 rounded-lg p-4 sticky top-4 shadow-sm">
            <span className="text-xl font-bold block mb-2">{price} EGP</span>

            <div className="text-sm text-muted- mb-4">
              <div className="flex items-center bg-transparent">
                <span className="font-bold text-[#0f1111] bg-gray-100 rounded px-1 mr-1">
                  vprime
                </span>
                FREE delivery <strong>Tomorrow, Nov 12</strong>
              </div>
              <div className="mt-1">
                Or fastest delivery <strong>Today, 5 PM - 10 PM</strong>
              </div>
              <div className="flex items-center gap-1 mt-2 mb-4 text-amazon-blue hover:underline cursor-pointer">
                <span className="text-xs text-gray-500">📍</span> Deliver to
                User - City 12345
              </div>
            </div>

            <span className="text-lg text-[#007600] font-medium block mb-4">
              In Stock
            </span>

            <div className="mb-4">
              <label
                htmlFor="qty"
                className="text-sm mr-2 shadow-sm border border-gray-300 rounded-sm bg-gray-100 flex items-center pl-2 w-max cursor-pointer hover:bg-gray-200"
              >
                Qty:
                <select
                  id="qty"
                  className="bg-transparent border-none outline-none pl-1 pr-4 py-1 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>

            <AddToCartBtn
            prodId={_id}
              className={
                "w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black rounded-full mb-2 font-medium border border-[#FCD200]/50 h-9"
              }
            >
              Add to cart
            </AddToCartBtn>
            <Button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black rounded-full mb-4 font-medium border border-[#FFA41C]/50 h-9">
              Buy Now
            </Button>

            <div className="text-xs text-muted- grid grid-cols-[1fr_2fr] gap-x-2 gap-y-1">
              <span>Ships from</span>
              <span className="text-[#0f1111]">Cartify</span>
              <span>Sold by</span>
              <span className="text-[#0f1111]">Cartify</span>
              <span>Returns</span>
              <span className="text-amazon-blue hover:underline cursor-pointer">
                Eligible for Return, Refund or Replacement within 30 days of
                receipt
              </span>
            </div>

            <hr className="my-4 border-gray-300" />
            <Button
              variant="outline"
              className="w-full rounded-sm text-sm border-gray-300 shadow-sm h-8 bg-white cursor-pointer hover:bg-gray-50 text-left justify-start font-normal"
            >
              Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
