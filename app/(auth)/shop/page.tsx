"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Star, Heart, Search, RotateCw } from "lucide-react";
import { products, CategoryColor, TypeColor, Category, Type } from "@/lib/shop_data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {useCartStore} from "@/lib/cartStore";
import {useWishlistStore} from "@/lib/wishlistStore";
import {Input} from "@/components/ui/input";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";


export default function ShopPage() {
  const { addToCart ,cart } = useCartStore();
  const { wishlist, addToWishlist , removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || product.category === category) &&
    (type === "all" || product.type === type)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearch}
                  className="rounded-md border border-gray-300 pr-4 py-2"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/wishlist")}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                Wishlist ({wishlist.length})
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/cart")}
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart ({cart.length})
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/account")}>
                <User className="h-5 w-5" />
                Account
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pt-20 pb-8">

              <div className="flex flex-row gap-4 items-center mb-4">
                <h2>Filtere : </h2>
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Category:</span>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {Object.values(Category).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={type}
                  onValueChange={setType}
                >
                  <SelectTrigger className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Type:</span>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {Object.values(Type).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  className="flex items-center"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                    setType("all");
                  }}
                >
                  <RotateCw className="h-5 w-5"/>
                </Button>
              </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="relative w-70 group overflow-hidden transition-all hover:shadow-xl py-0"
              >
                <CardHeader className="p-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="h-80 w-100 transition-transform group-hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 py-0 space-y-2">
                  <CardTitle className="text-lg font-semibold">
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
                    <span className="text-gray-500 ml-1">{product.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (wishlist.some((item) => item.id === product.id)) {
                        removeFromWishlist(product.id);
                        addToCart(product);
                        toast.success(`${product.name} added to cart!`);
                        return;
                      }
                      addToCart(product);
                      toast.success(`${product.name} added to cart!`);
                    }}
                    aria-label="Add to Cart"
                    disabled={cart.some((item) => item.id === product.id)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className="w-full mt-2"
                    onClick={() => {
                      addToWishlist(product);
                      toast.success(`${product.name} added to wishlist!`);
                    }}
                    aria-label="Add to Wishlist"
                    disabled={wishlist.some((item) => item.id === product.id) || cart.some((item) => item.id === product.id)}
                  >
                    Add to Wishlist
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className=" font-black text-2xl text-center">
              No products found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

