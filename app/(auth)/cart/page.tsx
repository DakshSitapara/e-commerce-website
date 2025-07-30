"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ShopNav from "@/components/ShopNav";
import { ShoppingBagIcon, ShoppingBag, RotateCw, CreditCardIcon, Heart, Minus, Plus, Trash2, } from "lucide-react";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import { useUserStore } from "@/lib/userStore";

export default function CartPage() {
  const router = useRouter();
  const { removeFromCart, clearCart, currentUser, quantity, updateQuantity, gusteUser } = useUserStore();
  const { cart } = currentUser ? currentUser : gusteUser ?? { cart: [] };
  
  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared!");
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 py-6">
          <nav className="fixed top-0 z-10 w-full bg-[#131921] shadow-md">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <ShopNav />
            </div>
          </nav>

      {cart.length === 0 ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4">
          <Link href="/shop">
            <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        </div>
      ) : (
        <>
        <div className="fixed top-18 right-8 flex items-center space-x-2 sm:space-x-4">
          {cart.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="hidden sm:flex items-center gap-2"
                  aria-label="Clear Cart"
                >
                  <RotateCw size={20} />
                  <span className="hidden sm:inline">Clear Cart</span>
                </Button>
                <Button
                  onClick={() => router.push("/billing")}
                  className="flex items-center gap-2"
                  aria-label="Billing"
                >
                  <CreditCardIcon size={20} />
                  <span className="hidden sm:inline">Billing</span>
                </Button>
              </>
            )}
        </div>
        <div className="mt-24 w-full grid grid-cols-1 gap-6">
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader className="relative">
                <CardTitle className="flex justify-between gap-2 text-lg font-semibold border-b border-gray-300 pb-4">
                    Shopping Cart <h2 className="text-sm text-gray-600 px-6 ">Price</h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cart.map((product) => (
                  <div key={product.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover shadow-md"
                      loader={() => product.image}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="font-semibold">{product.name} x{product.quantity}</h2>
                        <p className="font-semibold mx-6">₹ {product.price}</p>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Badge className={CategoryColor(product.category)}>{product.category}</Badge>
                        <Badge className={TypeColor(product.type)}>{product.type}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                      <div className="relative flex items-center justify-between w-[100px] border border-gray-300 mt-1 rounded-2xl">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => quantity(product.id) > 1 ? updateQuantity(product.id, quantity(product.id) - 1) : removeFromCart(product.id)}
                          className="flex items-center justify-center hover:bg-transparent"
                        >
                          {quantity(product.id) > 1 ? <Minus /> : <Trash2 />}
                        </Button>
                        <span className="mx-2">{quantity(product.id)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(product.id, quantity(product.id) + 1)}
                          className="flex items-center justify-center hover:bg-transparent"
                        >
                          <Plus />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center justify-center hover:bg-transparent text-indigo-800"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>    
              <CardFooter className="flex justify-end items-center border-t border-gray-300">
                  <span className="text-lg font-semibold px-5">
                    Total {`(${cart.reduce((total, product) => total + product.quantity, 0)} items)`}: ₹ {cart.reduce((total, product) => total + product.price * product.quantity, 0)}
                  </span>
              </CardFooter>          
            </Card>
        </div>
        </>
      )}
    </div>
  );
}
