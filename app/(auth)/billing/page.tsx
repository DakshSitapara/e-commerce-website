"use client";

import React from "react";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function BillingPage() {
    const router = useRouter();
    const { cart } = useCartStore();
  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      <Button onClick={() => router.push("/shop")}>Shop</Button>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.map((item: any, index: number) => (
              <li key={index} className="flex flex-col items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  loader={({ src }) => src}
                  className="w-16 h-16 rounded-md"
                />
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-gray-500">₹{item.price}</p>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-lg font-medium">
            Total: ₹
            {cart.reduce(
              (total: number, item: any) => total + item.price,
              0
            )}
          </p>
          <Button onClick={() => router.push("/checkout")}>Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}