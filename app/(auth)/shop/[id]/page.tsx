"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, User, ShoppingBagIcon } from "lucide-react";
import { Product, products, CategoryColor, TypeColor } from "@/lib/shop_data";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";
import toast from "react-hot-toast";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, cart, removeFromCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const router = useRouter();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === params.id);
    setProduct(foundProduct ?? null);
  }, [params]);

  if (!product)
    return (
      <div>
        Product not found{" "}
        <Button onClick={() => router.push(`/shop`)}>Go back</Button>
      </div>
    );

  return (
    <div>
    <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.push("/shop")}
            aria-label="Shop"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Shop</span>
          </Button>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/wishlist")}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden sm:inline">
                Wishlist ({wishlist.length})
              </span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/cart")}
              aria-label="Cart"
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
    <div className="flex flex-col md:flex-row gap-8 w-full p-4 mt-15 items-center justify-center">
      <div className="relative flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-md md:w-96 md:h-96"
        />
        <Button
          title={
            wishlist.some((item) => item.id === product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute top-2 right-2 bg-transparent shadow-none hover:shadow-none hover:bg-transparent"
          onClick={() => {
            if (wishlist.some((item) => item.id === product.id)) {
              removeFromWishlist(product.id);
              toast.success(
                `${product.name} removed from wishlist!`
              );
            } else {
              addToWishlist(product);
              toast.success(`${product.name} added to wishlist!`);
            }
          }}
          hidden={cart.some((item) => item.id === product.id)}
        >
          <Heart
            className={`h-6 w-6 ${
              wishlist.some((item) => item.id === product.id)
                ? "fill-red-500 text-red-500"
                : " text-red-500"
            }
            `}
          />
        </Button>
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 text-xl mb-4">₹{product.price}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg mr-1">★</span>
            <span className="text-gray-600">{product.rating} / 5</span>
          </div>
          <div className="flex space-x-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${CategoryColor(
                product.category
              )}`}
            >
              {product.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${TypeColor(
                product.type
              )}`}
            >
              {product.type}
            </span>
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              onClick={() => {
                if (cart.some((item) => item.id === product.id)) {
                  removeFromCart(product.id);
                  toast.success(`${product.name} removed from cart!`);
                } else {
                  addToCart(product);
                  toast.success(`${product.name} added to cart!`);
                }
              }}
              variant={
                cart.some((item) => item.id === product.id)
                  ? "destructive"
                  : "default"
              }
            >
              {cart.some((item) => item.id === product.id)
                ? "Remove from Cart"
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
