"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CreditCardIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.currentUser);
  const cart = currentUser?.cart || [];
  const [lastCart, setLastCart] = useState<any[]>([]);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("lastCart") || "[]");
    setLastCart(storedOrder);
  }, []);

  const clearLastOrder = () => {
    localStorage.removeItem("lastCart");
    document.cookie = "hasRecentOrder=; Max-Age=0; path=/";
    router.push("/shop");
  };

  if (cart.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          You still have items in your cart
        </h2>
        <Button
          variant="default"
          onClick={() => router.push("/billing")}
          className="flex items-center gap-2"
        >
          <CreditCardIcon className="h-5 w-5" />
          Continue to Billing
        </Button>
      </div>
    );
  }

  if (lastCart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          No recent orders
        </h1>
        <p className="text-gray-500 mb-6">Browse our shop and add items to your cart.</p>
        <Button onClick={() => router.push("/shop")}>Go to Shop</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mb-8">
          Here's a summary of your recent purchase.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lastCart.map((product, index) => (
              <li
                key={index}
                className="flex flex-col items-center bg-gray-50 rounded-lg p-4 border"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="object-cover rounded-md mb-2 shadow"
                  unoptimized
                />
                <p className="text-base font-medium text-center">{product.name}</p>
                <p className="text-gray-500 text-sm">₹{product.price}</p>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
          <p className="text-lg font-semibold text-gray-700">
            Total: ₹
            {lastCart.reduce((total, product) => total + product.price, 0)}
          </p>
          <Button onClick={clearLastOrder} className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
