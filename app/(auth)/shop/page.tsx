"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import { products, CategoryColor, TypeColor, Category, Type } from "@/lib/shop_data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserStore } from "@/lib/userStore";
import ShopNav from "@/components/ShopNav";
import Footer from "@/components/footer";
import ProductCarousel from "@/components/SlidingProduct";
import ShopFilters from "@/components/filtere";

export default function ShopPage() {
  const router = useRouter();
  const { addToCart, addToWishlist, removeFromWishlist, removeFromCart, currentUser } = useUserStore();
  const { cart, wishlist } = currentUser ?? { cart: [], wishlist: [] };

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesType = type === "all" || product.type === type;
    const matchesMinPrice = product.price >= priceRange[0];
    const matchesMaxPrice = product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesType && matchesMinPrice && matchesMaxPrice;
  });

  const handleResetFilters = () => {
    setCategory("all");
    setType("all");
    setPriceRange([0, 1500]);
    setSearch("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')] bg-cover bg-center">
      <nav className="fixed top-0 z-10 w-full bg-[#131921] shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <ShopNav />
        </div>
      </nav>

      <main className="mx-auto max-w-8xl px-4 pt-20 pb-8 items-center">
        <div
          className={`fixed top-20 left-0 h-auto bg-transparent border-none shadow-none  z-10 w-64 p-6 transition-transform duration-300 sm:translate-x-0 sm:w-72 lg:w-80`}
        >
          <ShopFilters
            category={category}
            setCategory={setCategory}
            type={type}
            setType={setType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            search={search}
            setSearch={setSearch}
            onReset={handleResetFilters}
          />
        </div>

        <div className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:ml-72 lg:ml-80">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="sm:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="mb-12">
            <ProductCarousel />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:justify-between sm:flex-row sm:gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="min-w-[250px] max-w-[250px] flex-shrink-0 group overflow-hidden transition-all hover:shadow-xl py-0"
                >
                  <CardHeader className="p-0 gap-0">
                    <div className="relative h-full w-full">
                      <Image
                        src={product.image || "/fallback.jpg"}
                        alt={product.name}
                        width={500}
                        height={500}
                        className={`h-80 w-full transition-transform group-hover:scale-105 cursor-pointer`}
                        onClick={() => router.push(`/shop/${product.id}`)}
                      />

                      {currentUser && (
                        <Button
                          title={
                            wishlist.some((item) => item.id === product.id)
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          className="absolute top-2 right-2 bg-transparent shadow-none hover:shadow-none hover:bg-transparent"
                          size={"icon"}
                          onClick={() => {
                            if (
                              wishlist.some((item) => item.id === product.id)
                            ) {
                              removeFromWishlist(product.id);
                              toast.success(
                                `${product.name} removed from wishlist!`
                              );
                            } else {
                              addToWishlist({ ...product, quantity: 1 });
                              toast.success(
                                `${product.name} added to wishlist!`
                              );
                            }
                          }}
                          hidden={cart.some((item) => item.id === product.id)}
                        >
                          <Heart
                            className={`h-6 w-6 ${
                              wishlist.some((item) => item.id === product.id)
                                ? "fill-red-500 text-red-500"
                                : " text-red-500"
                            }`}
                          />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="w-full font-black text-xl sm:text-2xl text-center">
                No products found.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}