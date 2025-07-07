"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBagIcon, ShoppingCart } from "lucide-react";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import toast from "react-hot-toast";
import {useWishlistStore} from "@/lib/wishlistStore";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const router = useRouter();

      if (cart.length === 0) {
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
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                className="flex items-center gap-2 mt-4"
                onClick={() => router.push("/wishlist")}
                aria-label="wishlist"
              >
                <Heart className="h-5 w-5" />
                wishlist ({wishlist.length})
              </Button>
            )}
          </div>
        );
      }
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between mb-4">
        <h1>Cart</h1>
        <p className="text-sm text-gray-600">
          You have {cart.length} items in your cart.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cart.map((product) => (
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
            <CardFooter className="absolute bottom-4 right-0 px-2">
              <Button onClick={() => {removeFromCart(product.id),toast.success(` ${product.name} Removed from cart!`);}}>Remove</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-row justify-end gap-4 mt-4">
        <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
        <Button onClick={() => {clearCart(),toast.success(`Cart cleared!`);}}>Clear Cart</Button>
      </div>
    </div>
  );
}

