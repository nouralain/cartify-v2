"use client"

import { useState } from "react";
import DeliveryLocationPopover from "../layout/DeliveryLocation";

export default function ChangeAddressBtn() {
      const [openPoppers, setOpenPoppers] = useState(false);
    
  return (
<>
    <button onClick={() => setOpenPoppers(!openPoppers)} className="text-amazon-blue hover:text-[#c45500] hover:underline font-medium h-fit">Change</button>
{openPoppers && (
            <DeliveryLocationPopover onClose={() => setOpenPoppers(false)} />
          )}
</>    
  )
}
