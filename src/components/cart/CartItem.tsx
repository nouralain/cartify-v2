import Image from 'next/image'
import React from 'react'
import DeleteProd from './DeleteProd'
import ProdCount from './ProdCount'
import { ICartProductItem } from '@/interfaces/ICartProductItem'

export default function CartItem({item , token}:{item:ICartProductItem  ,token:string}) {
  return (
    <>
      <div key={item._id} className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200">
              <div className="w-full sm:w-40 shrink-0">
                <div className="relative h-40 w-full bg-gray-50 flex items-center justify-center mix-blend-multiply">
                  <Image 
                    src={item.product.imageCover} 
                    alt={item.product.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-[#0f1111] line-clamp-2 pr-4 hover:underline cursor-pointer">
                     {item.product.title}
                    </h3>
                    <span className="text-lg font-bold text-[#0f1111]">{`${item.price} L.E`}</span>
                  </div>
                  <span className="text-xs text-[#007600] font-medium block mt-1">In Stock</span>
                  <div className="text-xs text-muted-foreground mt-1 space-y-1">
                    <div className="flex items-center">
                      <span>FREE Returns</span>
                    </div>
                  </div>
                  
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm scale-90 sm:scale-100 origin-left">
                  <ProdCount item={item}/>
                  <div className="h-4 border-l border-gray-300"></div>
<DeleteProd prodId={ item.product._id} token={token}/>
                </div>
              </div>
            </div>
    </>
  )
}
