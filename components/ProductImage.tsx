"use client";

import Image from "next/image";
import { Product } from "@/lib/shop_data";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className={`relative w-full aspect-square overflow-hidden rounded-lg shadow`}>
      <Image
        src={product.image || "/fallback.jpg"}
        alt={product.name}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
