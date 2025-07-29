"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
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

  const { addToCart, addToWishlist, removeFromWishlist, removeFromCart, currentUser, quantity, updateQuantity } = useUserStore();
  const { cart, wishlist } = currentUser ?? { cart: [], wishlist: [] };

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);


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
      <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pt-20 pb-8 items-center">
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
        <div className="flex justify-between items-center mb-4 shadow-none border-none">
          <ProductCarousel />
        </div>
        <div className="">
          <div className="flex max-w-7xl min-w-7xl overflow-x-auto space-x-4 py-4 transition-all">
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
                        className={`h-80 w-full transition-transform group-hover:scale-105 cursor-pointer ${
                          cart.some((item) => item.id === product.id)
                            ? "filter blur-sm"
                            : ""
                        }`}
                        onClick={() => router.push(`/shop/${product.id}`)}
                      />
                      {currentUser &&
                        cart.some((item) => item.id === product.id) && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                            <ShoppingCart
                              className="h-10 w-10 text-2xl cursor-pointer hover:text-gray-500 hover:scale-110 transition-all"
                              onClick={() => router.push("/cart")}
                            />
                          </div>
                        )}
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
                  {/* <CardContent className="p-4 py-0 space-y-2">
                  <CardTitle className="text-sm sm:text-lg font-semibold">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">₹{product.price}</p>
                    <div className="flex space-x-2">
                      <Badge className={` ${CategoryColor(product.category)}`}>
                        {product.category}
                      </Badge>
                      <Badge className={` ${TypeColor(product.type)}`}>
                        {product.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-500 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                  {quantity(product.id) > 0 ? (
                    <div className="flex items-center justify-between w-full border border-gray-300 rounded-2xl">
                      {quantity(product.id) > 1 ? (
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity(product.id) - 1)}
                            className="flex items-center justify-center hover:bg-transparent"
                          >
                            <Minus />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center justify-center hover:bg-transparent"
                        >
                          <Trash2 />
                        </Button>
                      )}
                        <span className="mx-2">{quantity(product.id)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(product.id, quantity(product.id) + 1) }
                          className="flex items-center justify-center hover:bg-transparent"
                        >
                          <Plus />
                        </Button>
                      </div>
                  ) : (
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        if (wishlist.some((item) => item.id === product.id)) {
                          removeFromWishlist(product.id);
                          toast.success(`${product.name} removed from wishlist!`);
                        }
                        addToCart({ ...product, quantity: 1 });
                        toast.success(`${product.name} added to cart!`);
                      }}
                      className="w-full"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                  </div>
                </CardFooter> */}
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


