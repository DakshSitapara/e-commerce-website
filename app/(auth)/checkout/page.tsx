"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBagIcon } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart);

    if (cart.length === 0) {
        return (
            <div className="items-center px-4 py-2">
                Your cart is empty.
                <Button
                    variant="outline"
                    className="flex items-center gap-2 mt-4"
                    onClick={() => router.push("/shop")}
                    aria-label="Shop"
                >
                    <ShoppingBagIcon className="h-5 w-5" />
                    Shop
                </Button>
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
                        {cart.map((product, index) => (
                            <li key={index} className="flex flex-col items-center">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    loader={({ src }) => src}
                                    className="w-16 h-16 rounded-md"
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
                        {cart.reduce((total, product) => total + product.price, 0)}
                    </p>
                    <Button onClick={() => {router.push("/shop"), useCartStore.getState().clearCart()}}>Continue Shopping</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

