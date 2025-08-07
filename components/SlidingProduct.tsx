"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { products } from "@/lib/shop_data";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

export default function ProductCarousel() {
  const router = useRouter();

  return (
    <div className="relative max-w-[1100px]">
      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="relative"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="px-4">
              <div className="flex flex-col md:flex-row items-center bg-transparent shadow-none border-none rounded-lg overflow-hidden transition duration-300 ease-in-out">
                <div className="relative w-full md:w-1/2 aspect-square">
                  <Image
                    src={product.image || "/fallback.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg cursor-pointer"
                    priority
                    onClick={() => {
                      router.push(`/shop/${product.id}`);
                    }}
                  />
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm text-justify">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xl font-semibold text-gray-800">
                      ₹{product.price}
                    </span>
                    <p className="text-lg text-gray-600 flex items-center">
                      {product.rating}
                      <Star className="h-4 w-4 text-yellow-400 ml-1" />
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-transparent border-none hover:bg-transparent p-2 transition" />
        <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-transparent border-none hover:bg-transparent p-2 transition" />
      </Carousel>
    </div>
  );
}
