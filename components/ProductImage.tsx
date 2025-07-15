"use client";

import Image from "next/image";
import { Product } from "@/lib/shop_data";

interface ProductImageProps {
  product: Product;
  className?: string;
}

export default function ProductImage({ product, className = "" }: ProductImageProps) {
  return (
    <div className={`relative w-full aspect-square overflow-hidden rounded-lg shadow ${className}`}>
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
