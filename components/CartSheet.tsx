"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCardIcon, Heart, Minus, Plus, RotateCw, Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import { useUserStore } from "@/lib/userStore";
import toast from "react-hot-toast";

export default function CartSheet() {
  const router = useRouter();
  const { removeFromCart, clearCart, currentUser, quantity, updateQuantity, gusteUser } = useUserStore();
  const { cart } = currentUser ? currentUser : gusteUser ?? { cart: [] };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared!");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="flex justify-between">
            Cart
            {cart.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-red-600 hover:text-red-800"
                onClick={handleClearCart}
              >
                <RotateCw className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map((product) => (
              <div key={product.id} className="flex gap-4 border-b pb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover shadow-sm"
                  loader={() => product.image}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <span className="text-xs font-medium">₹ {product.price}</span>
                  </div>
                  <div className="mt-1 flex gap-1">
                    <Badge className={CategoryColor(product.category)}>{product.category}</Badge>
                    <Badge className={TypeColor(product.type)}>{product.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2 w-[100px] border border-gray-300 rounded-2xl">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        quantity(product.id) > 1
                          ? updateQuantity(product.id, quantity(product.id) - 1)
                          : removeFromCart(product.id)
                      }
                    >
                      {quantity(product.id) > 1 ? <Minus size={14} /> : <Trash2 size={14} />}
                    </Button>
                    <span className="text-sm">{quantity(product.id)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(product.id, quantity(product.id) + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="flex flex-col space-y-2 mt-6">
            <div className="flex justify-between text-sm font-medium">
              <span>
                Total ({cart.reduce((total, p) => total + p.quantity, 0)} items)
              </span>
              <span>
                ₹ {cart.reduce((total, p) => total + p.quantity * p.price, 0)}
              </span>
            </div>
            <Button onClick={() => router.push("/billing")} className="w-full">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
