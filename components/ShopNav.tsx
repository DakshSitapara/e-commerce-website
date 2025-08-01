"use client";

import React from "react";
import { useRouter } from "next/navigation";    
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Heart } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/lib/userStore";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import CartSheet from "@/components/CartSheet";

export default function ShopNav() {

    const router = useRouter();

    const { currentUser, gusteUser } = useUserStore(); 

    const guestCart = gusteUser?.cart || [];
    const cart = currentUser?.cart || [];
    const wishlist = currentUser?.wishlist || [];
    const { addToCart, removeFromCart, removeFromWishlist } = useUserStore();

    return (
      <div className="bg-[#131921] flex items-center justify-between h-16">
        <h1 className="text-xl sm:text-2xl font-bold border border-transparent text-white hover:border hover:border-white">
          <Link href="/shop">Shop</Link>
        </h1>
        <div className="flex items-center">
          {/* <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                onClick={() => router.push("/cart")}
                className="relative bg-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white"
              >
                <ShoppingCart size={20} />
                Cart
                {cart.length > 0 || guestCart.length > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-yellow-700 text-xs rounded-full flex items-center justify-center">
                    {cart.length > 0 ? cart.length : guestCart.length}
                  </span>
                ) : (
                  <></>
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className={
                (currentUser ? cart.length : guestCart.length) === 0
                  ? "hidden"
                  : "w-full overflow-y-auto max-h-100"
              }
            >
              <div className="flex flex-col gap-4">
                {(currentUser ? cart : guestCart).map((product: any) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none">
                        {product.name}
                      </p>
                      <p className="flex items-center gap-6 text-xs text-muted-foreground">
                        ₹ {product.price}
                        <Button
                          variant={"link"}
                          className="text-xs text-blue-300  hover:text-blue-500 w-auto px-0 h-0"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </Button>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty. {product.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SubTotal : ₹ {product.price * product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <section>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">Total</p>
                    <p className="text-sm font-medium leading-none">
                      ₹{" "}
                      {(currentUser ? cart : guestCart).reduce(
                        (total: number, product: any) =>
                          total + product.price * product.quantity,
                        0
                      )}
                    </p>
                  </div>
                </section>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => router.push("/cart")}
                  >
                    View Cart
                  </Button>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    onClick={() => router.push("/billing")}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard> */}
          <CartSheet />
          <HoverCard>
            <HoverCardTrigger asChild>
              {currentUser && (
                <Button
                  onClick={() => router.push("/wishlist")}
                  className="relative bg-transparent border border-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white"
                >
                  <div className="hover:scale-x-[-1] transition duration-300">
                    <Heart />
                  </div>
                  {wishlist.length > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-amber-50 text-yellow-700 text-xs rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  ) : (
                    <></>
                  )}
                </Button>
              )}
            </HoverCardTrigger>
            <HoverCardContent
              className={
                wishlist.length === 0
                  ? "hidden"
                  : "w-full overflow-y-auto max-h-50"
              }
            >
              <div className="flex flex-col gap-4">
                {wishlist.map((product: any) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 overflow-hidden rounded-md">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover aspect-square"
                        loader={() => product.image}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹ {product.price}
                      </p>
                      <div className="flex items-center">
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-xs text-blue-300 hover:text-blue-500"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          Remove
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-xs "
                          onClick={() => {
                            if (
                              wishlist.some((item) => item.id === product.id)
                            ) {
                              removeFromWishlist(product.id);
                            }
                            addToCart({ ...product, quantity: 1 });
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          {currentUser ? (
            <Button
              onClick={() => router.push("/account")}
              className="bg-transparent border border-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white"
            >
              <div className="hover:scale-x-[-1] transition duration-300">
                <User />
              </div>
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-transparent border border-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white"
            >
              <User />
            </Button>
          )}
        </div>
      </div>
    );
}