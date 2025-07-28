"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
import type { EmblaCarouselType } from "embla-carousel";

interface ProductCarouselProps {
  selectedIndex: number;
}

export default function ProductCarousel({ selectedIndex }: ProductCarouselProps) {
  const router = useRouter();
  const emblaRef = useRef<EmblaCarouselType | null | undefined>(null);

  useEffect(() => {
    if (
      emblaRef.current &&
      typeof selectedIndex === "number" &&
      selectedIndex >= 0 &&
      selectedIndex < products.length
    ) {
      emblaRef.current.scrollTo(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full max-w-5xl mx-auto p-4 shadow-none border-none">
      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[Autoplay({ delay: 3000 })]}
        orientation="horizontal"
        setApi={(api) => {
          emblaRef.current = api;
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <div className="flex flex-col md:flex-row items-center bg-transparent shadow-none border-none rounded-lg overflow-hidden">
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
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
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
        <CarouselPrevious className="bg-transparent shadow-none border-none hover:bg-transparent" />
        <CarouselNext className="bg-transparent shadow-none border-none hover:bg-transparent" />
      </Carousel>
    </div>
  );
}
