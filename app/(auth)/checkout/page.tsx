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
    router.push("/shop");
  };

  if (cart.length > 0) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold mb-4">Complete your order first.</p>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.push("/billing")}
          aria-label="Go to Billing"
        >
          <CreditCardIcon className="h-5 w-5" />
          Billing
        </Button>
      </div>
    );
  }

  if (lastCart.length === 0) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <Link href="/shop">
          <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-8">Add some products to your cart!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lastCart.map((product, index) => (
              <li key={index} className="flex flex-col items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="w-16 h-16 rounded-md"
                  unoptimized
                />
                <p className="text-lg font-medium">{product.name}</p>
                <p className="text-gray-500">₹{product.price}</p>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-lg font-medium">
            Total: ₹
            {lastCart.reduce((total, product) => total + product.price, 0)}
          </p>
          <Button onClick={clearLastOrder}>Continue Shopping</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
