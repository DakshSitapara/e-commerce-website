"use client";

import { useRouter, useParams } from "next/navigation";
import React from "react";
import { ShoppingBagIcon, Heart, ShoppingCart, User, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { products, CategoryColor, TypeColor } from "@/lib/shop_data";
import { useUserStore } from "@/lib/userStore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ProductImage";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const productId = parseInt(id as string, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  const product = products[productIndex];

  const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, currentUser } = useUserStore();

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

  const handleNext = () => {
    const nextIndex = (productIndex + 1) % products.length;
    router.push(`/shop/${products[nextIndex].id}`);
  };
  const handlePrev = () => {
    const prevIndex = (productIndex - 1 + products.length) % products.length;
    router.push(`/shop/${products[prevIndex].id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
           <h1 className="text-xl font-semibold">{product.name}</h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/shop")}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Shop</span>
            </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/wishlist")}
              >
                <Heart className="h-5 w-5" />
                <span className="hidden sm:inline">Wishlist ({wishlist.length})</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Cart ({cart.length})</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/account")}
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </div>
          </div>
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
                  addToWishlist(product);
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
          <div className="flex justify-between w-full">
            <Button title="Previous" variant="secondary" onClick={handlePrev}>
              <ArrowLeft />
            </Button>
            <Button title="Next" variant="secondary" onClick={handleNext}>
              <ArrowRight />
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

          <div className="flex flex-wrap gap-4">
                  <Button
                    variant={
                      cart.some((item) => item.id === product.id)
                        ? "destructive"
                        : "outline"
                    }
                    className="w-auto"
                    onClick={() => {
                      if (wishlist.some((item) => item.id === product.id)) {
                        removeFromWishlist(product.id);
                        addToCart(product);
                        toast.success(`${product.name} added to cart!`);
                        return;
                      } else if (cart.some((item) => item.id === product.id)) {
                        removeFromCart(product.id);
                        toast.success(`${product.name} removed from cart!`);
                        return;
                      }
                      addToCart(product);
                      toast.success(`${product.name} added to cart!`);
                    }}
                    aria-label="Add to Cart"
                  >
                    {cart.some((item) => item.id === product.id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
