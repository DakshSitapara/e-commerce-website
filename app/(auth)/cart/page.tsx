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

import {
  ShoppingBagIcon,
  ShoppingBag,
  RotateCw,
  CreditCardIcon,
  Heart,
  Minus,
  Plus,
} from "lucide-react";

import { CategoryColor, TypeColor } from "@/lib/shop_data";
import { useUserStore } from "@/lib/userStore";

export default function CartPage() {
  const router = useRouter();
  const { removeFromCart, clearCart, currentUser, quantity, updateQuantity } = useUserStore();
  const { cart } = currentUser ?? { cart: [] }; 

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared!");
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 py-6">
          <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
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
        <div className="fixed top-18 right-4 flex items-center space-x-2 sm:space-x-4">
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
        <div className="mt-24 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((product) => (
            <Card key={product.id} className="bg-white shadow-md rounded-lg">
              <CardHeader className="relative">
                <CardTitle className="text-lg font-semibold">{product.name}   x {product.quantity}</CardTitle>
                <Badge className={`absolute top-2 right-2 ${CategoryColor(product.category)}`}>
                  {product.category}
                </Badge>
                <Badge className={`absolute top-10 right-2 ${TypeColor(product.type)}`}>
                  {product.type}
                </Badge>
              </CardHeader>

              <CardContent className="flex justify-center py-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={120}
                  height={120}
                  loader={() => product.image}
                  className="w-32 h-32 object-cover rounded-md shadow"
                />
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-gray-600">₹{product.price}</p>
                {quantity(product.id) > 0 ? (
                    <div className="flex items-center justify-between w-1/2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </Button>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>{
                            if(quantity(product.id) > 1){
                              updateQuantity(product.id, quantity(product.id) - 1)
                            }else{
                              removeFromCart(product.id)
                            }}}
                        >
                          <Minus />
                        </Button>
                        <span className="mx-2">{quantity(product.id)}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(product.id, quantity(product.id) + 1)
                          }
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  ) :(
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  )
                }
              </CardFooter>
            </Card>
          ))}
        </div>
        </>
      )}
    </div>
  );
}
