import { IBrand } from '@/interfaces/IBrand'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandGrid({brand}:{brand:IBrand}) {

  return (
    <Link key={brand._id} href={`/brands/${brand._id}`} className="bg-white border border-gray-200 rounded-sm p-4 flex flex-col items-center hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow group relative">
             <div className="w-full h-24 mb-4 relative flex items-center justify-center p-2 mix-blend-multiply">
               <Image 
                 src={brand.image} 
                 alt={brand.name} 
                 fill
                 className="object-contain" 
                 sizes="(max-width: 768px) 100vw, 200px"
               />
             </div>
             <span className="font-bold text-center text-sm group-hover:text-[#c45500] text-amazon-blue group-hover:underline">{brand.name}</span>
           </Link>
  )
}
