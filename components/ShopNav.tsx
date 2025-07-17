"use client";

import React from "react";
import { useRouter } from "next/navigation";    
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Heart } from "lucide-react";
import { useUserStore } from "@/lib/userStore";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"

export default function ShopNav() {

    const router = useRouter();

    const { currentUser } = useUserStore(); 

    const cart = currentUser?.cart || [];
    const wishlist = currentUser?.wishlist || [];
    const { addToCart, removeFromCart, removeFromWishlist } = useUserStore();

    return (
        <div className="flex items-center justify-between h-16">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900"><Link href="/shop">Shop</Link></h1>
            <div className="flex items-center gap-2">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant={"outline"} onClick={() => router.push("/cart")}>
                            <ShoppingCart size={20} />
                            Cart ({cart.length})
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className={cart.length === 0 ? "hidden" : "w-full overflow-y-auto max-h-100"}>
                        <div className="flex flex-col gap-4">
                            {cart.map((product: any) => (
                                <div key={product.id} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 overflow-hidden rounded-md">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium leading-none">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">₹ {product.price}
                                            <Button
                                                variant={"link"}
                                                className="text-xs text-blue-300  hover:text-blue-500" 
                                                onClick={() => removeFromCart(product.id)}>
                                                Remove</Button>
                                        </p>
                                        <p className="text-xs text-muted-foreground">Qty. {product.quantity}</p>
                                        <p className="text-xs text-muted-foreground">SubTotal : ₹ {product.price * product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            <section>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium leading-none">Total</p>
                                    <p className="text-sm font-medium leading-none">
                                        ₹ {cart.reduce((total: number, product: any) => total + product.price * product.quantity, 0)}
                                    </p>
                                </div>
                            </section>
                            <div className="flex items-center justify-between gap-2">
                                <Button variant={"outline"} size={"sm"} onClick={() => router.push("/cart")}>View Cart</Button>
                                <Button variant={"default"} size={"sm"} onClick={() => router.push("/billing")}>Checkout</Button>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant={"outline"} onClick={() => router.push("/wishlist")}>
                            <Heart size={20} />
                            Wishlist ({wishlist.length})
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className={wishlist.length === 0 ? "hidden" : "w-full overflow-y-auto max-h-50"}>
                        <div className="flex flex-col gap-4">
                            {wishlist.map((product: any) => (
                                <div key={product.id} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 overflow-hidden rounded-md">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium leading-none">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">₹ {product.price}</p>
                                        <div className="flex items-center">
                                            <Button 
                                                size={"sm"}
                                                variant={"link"}
                                                className="text-xs text-blue-300 hover:text-blue-500" 
                                                onClick={() => removeFromWishlist(product.id)}>
                                                    Remove
                                            </Button>
                                            <Button 
                                                size={"sm"}
                                                variant={"link"}
                                                className="text-xs " 
                                                onClick={() => {
                                                    if (wishlist.some((item) => item.id === product.id)) {
                                                    removeFromWishlist(product.id);
                                                    }
                                                    addToCart({ ...product, quantity: 1 });
                                                }}>
                                                    Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <Button variant={"outline"} onClick={() => router.push("/account")}>
                    <User size={20} />
                    Account
                </Button>
            </div>
        </div>
    )
}