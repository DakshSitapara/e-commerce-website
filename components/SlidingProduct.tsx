"use client";

import Image from "next/image";
import { products, CategoryColor, TypeColor } from "@/lib/shop_data";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductCarousel() {

  const router = useRouter();

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 shadow-none border-none">
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <div className="flex flex-col md:flex-row items-center bg-transparent shadow-md rounded-lg overflow-hidden">
                <div className="relative w-full md:w-1/2 aspect-square">
                  <Image
                    src={product.image || "/fallback.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg cursor-pointer"
                    priority
                    onClick={() => { router.push(`/shop/${product.id}`); }}
                  />
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xl font-semibold text-gray-800">₹{product.price}</span>
                    <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <span className={`text-white text-xs px-2 py-1 rounded ${CategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                    <span className={`text-white text-xs px-2 py-1 rounded ${TypeColor(product.type)}`}>
                      {product.type}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent shadow-none border-none" />
        <CarouselNext className="bg-transparent shadow-none border-none" />
      </Carousel>
    </div>
  );
}
