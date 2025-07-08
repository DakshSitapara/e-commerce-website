"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";
import toast from "react-hot-toast";

export default function CartPage() {
    const { cart, addToCart } = useCartStore();
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const router = useRouter();

  if (wishlist.length === 0) {
    return (
      <div className="items-center px-4 py-2">
        Your wishlist is empty.
        <Button
          variant="outline"
          className="flex items-center gap-2 mt-4"
          onClick={() => router.push("/shop")}
          aria-label="Shop"
        >
          <ShoppingBagIcon className="h-5 w-5" />
          Shop
        </Button>
        {cart.length > 0 && (
          <Button
            variant="outline"
            className="flex items-center gap-2 mt-4"
            onClick={() => router.push("/cart")}
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart ({cart.length})
          </Button>
        )}
      </div>
    );
  }
  

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between mb-4">
        <h1>Wishlist</h1>
        <p className="text-sm text-gray-600">
          You have {wishlist.length} items in your wishlist.
        </p>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.push("/cart")}
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart ({cart.length})
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((product) => (
          <Card
            key={product.id}
            className="relative mb-4 p-4 rounded-lg shadow-md"
          >
            <CardHeader className="flex justify-between">
              <CardTitle className="text-lg font-semibold">
                {product.name}
              </CardTitle>
              <Badge
                className={`absolute top-2 right-2 ${CategoryColor(
                  product.category
                )}`}
              >
                {product.category}
              </Badge>
              <Badge
                className={`absolute top-10 right-2 ${TypeColor(product.type)}`}
              >
                {product.type}
              </Badge>
            </CardHeader>
            <CardContent className="flex justify-between">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                loader={() => product.image}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </CardContent>
            <CardFooter className="flex flex-col absolute bottom-4 right-0 px-2 gap-2">
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <Button
                onClick={() => {
                  addToCart(product),
                    removeFromWishlist(product.id),
                    toast.success(` ${product.name} Added to cart!`);
                }}
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  removeFromWishlist(product.id),
                    toast.success(` ${product.name} Removed from wishlist!`);
                }}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-row justify-end gap-4 mt-4">
        <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
        <Button
          onClick={() => {
            clearWishlist(), toast.success("Wishlist cleared!");
          }}
        >
          Clear Wishlist
        </Button>
      </div>
    </div>
  );
}

