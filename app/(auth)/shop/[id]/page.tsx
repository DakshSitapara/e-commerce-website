"use client";

import { useRouter, useParams } from "next/navigation";
import React from "react";
import { ShoppingBagIcon, Heart, ShoppingCart, User, ArrowRight, ArrowLeft, Star, Minus, Plus, Trash2 } from "lucide-react";
import { products, CategoryColor, TypeColor } from "@/lib/shop_data";
import { useUserStore } from "@/lib/userStore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ProductImage";
import ShopNav from "@/components/ShopNav";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const productId = parseInt(id as string, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  const product = products[productIndex];

  const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, currentUser , updateQuantity, quantity } = useUserStore();

  const cart = currentUser?.cart || [];
  const wishlist = currentUser?.wishlist || [];

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <p className="text-lg font-semibold mb-4">Product not found.</p>
        <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <ShopNav />
        </div>
      </nav>

      <main className="flex flex-col lg:flex-row items-center justify-center px-4 py-20 gap-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center w-full lg:w-1/2 space-y-4">
          <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow">
            <ProductImage product={product} />

            <Button
              title={
                wishlist.some((item) => item.id === product.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="absolute top-2 right-2 bg-transparent shadow-none hover:shadow-none hover:bg-transparent"
              size={"icon"}
              onClick={() => {
                if (wishlist.some((item) => item.id === product.id)) {
                  removeFromWishlist(product.id);
                  toast.success(
                    `${product.name} removed from wishlist!`
                  );
                } else {
                  addToWishlist({...product, quantity: 1});
                  toast.success(
                    `${product.name} added to wishlist!`
                  );
                }
              }}
              hidden={cart.some((item) => item.id === product.id)}
            >
              <Heart
                className={`h-10 w-10 ${wishlist.some((item) => item.id === product.id)
                  ? "fill-red-500 text-red-500"
                  : " text-red-500"
                }`}
              />
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-2xl font-semibold text-gray-800">₹{product.price}</p>
          <div className="flex flex-wrap space-x-2">
            <Badge className={`${CategoryColor(product.category)}`}>
              {product.category}
            </Badge>
            <Badge className={`${TypeColor(product.type)}`}>
              {product.type}
            </Badge>
          </div>
          <p className="text-lg text-gray-600 flex items-center">{product.rating}<Star className="h-4 w-4 text-yellow-400 ml-1" /></p>
          <p className="text-lg text-gray-600">{product.description}</p>

          <div className="flex flex-wrap gap-4">
                  {quantity(product.id) > 0 ? (
                    <div className="flex items-center justify-between w-auto border border-gray-300 rounded-md">
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
                      variant="outline"
                      onClick={() => {
                        if (wishlist.some((item) => item.id === product.id)) {
                          removeFromWishlist(product.id);
                          toast.success(`${product.name} removed from wishlist!`);
                        }
                        addToCart({ ...product, quantity: 1 });
                        toast.success(`${product.name} added to cart!`);
                      }}
                      className="bg-transparent"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
          </div>
        </div>
      </main>
    </div>
  );
}
