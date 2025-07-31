"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {Product}  from "@/lib/shop_data";

type Props = {
  products: Product[];
};

export default function EmblaAutoScroll({ products }: Props) {
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll({ speed: 2, startDelay: 0, stopOnInteraction: false })]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] max-w-[250px] flex-shrink-0 cursor-pointer" onClick={() => router.push(`/shop/${product.id}`)}>
            <div className="relative h-64 w-full">
              <Image
                src={product.image || "/fallback.jpg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}
