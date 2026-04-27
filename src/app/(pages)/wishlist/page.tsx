import CartItem from '@/components/wishlist/WishlistItem';

export default async function WishlistPage() {

  return (
    <div className="bg-[#eaeded] min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white border text-[#0f1111] border-gray-200 p-4 md:p-6 shadow-sm mb-6 rounded-sm">
          <h1 className="text-2xl md:text-[28px] font-normal mb-1">Your Favourit items</h1>
          
          <div className="flex border-b border-gray-200 mb-4 space-x-6 mt-4">
            <span className="py-2 border-b-2 border-[#e47911] text-[#0f1111] font-bold text-sm tracking-wide">Wish List</span>
          </div>
          
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-gray-200 pb-4">
            <p className="text-sm font-medium">You have  items in your list.</p>
           
          </div>
          
         
           <CartItem/>
         
        </div>
      </div>
    </div>
  );
}
