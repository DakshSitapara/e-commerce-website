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
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

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
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xl font-semibold text-gray-800">₹{product.price}</span>
                    <p className="text-lg text-gray-600 flex items-center">{product.rating}<Star className="h-4 w-4 text-yellow-400 ml-1" /></p>
                  </div>
                  <div className="flex flex-wrap space-x-2">
                    <Badge className={`${CategoryColor(product.category)} inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}>
                      {product.category}
                    </Badge>
                    <Badge className={`${TypeColor(product.type)} inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}>
                      {product.type}
                    </Badge>
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
