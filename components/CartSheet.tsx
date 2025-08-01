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
import {
  CreditCardIcon,
  Minus,
  Plus,
  RotateCw,
  Trash2,
  Trash2Icon,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import { useUserStore } from "@/lib/userStore";
import toast from "react-hot-toast";

export default function CartSheet() {
  const router = useRouter();
  const {
    removeFromCart,
    clearCart,
    currentUser,
    quantity,
    updateQuantity,
    gusteUser,
  } = useUserStore();
  const { cart: guestCart } = gusteUser ?? { cart: [] };
  const { cart } = currentUser ? currentUser : gusteUser ?? { cart: [] };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared!");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative bg-transparent border border-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white">
          <div className="hover:scale-x-[-1] transition duration-300">
            <ShoppingCart size={20} />
          </div>
          {cart.length > 0 || guestCart.length > 0 ? (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-amber-50 text-yellow-700 text-xs rounded-full flex items-center justify-center">
              {cart.length > 0 ? cart.length : guestCart.length}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[400px] flex flex-col justify-between h-full bg-teal-50"
      >
        <SheetHeader className="border-b">
          <SheetTitle className="flex justify-between items-center">
            <span className="text-lg font-bold">Your Cart</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-4 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 px-2">
              {cart.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex gap-4 pb-4 border-b border-gray-200 ${
                    index === cart.length - 1 ? "border-none" : ""
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover aspect-square"
                    loader={() => product.image}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-lg text-gray-800">
                        {product.name}
                      </h1>
                      <Button
                        title="Remove from Cart"
                        variant="link"
                        size="sm"
                        className="text-xs text-red-600 hover:animate-pulse transition-colors"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium text-gray-600">
                          Price: ₹{product.price}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          Total: ₹{product.price * quantity(product.id)}
                        </span>
                      </div>
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(product.id, quantity(product.id) - 1)
                          }
                          className="px-2"
                          disabled={quantity(product.id) <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="text-sm px-3 text-gray-700">
                          {quantity(product.id)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(product.id, quantity(product.id) + 1)
                          }
                          className="px-2"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="pt-4 border-t mt-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>
                  Total ({cart.reduce((total, p) => total + p.quantity, 0)}{" "}
                  items)
                </span>
                <span>
                  ₹ {cart.reduce((total, p) => total + p.quantity * p.price, 0)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="destructive"
                  onClick={() => handleClearCart()}
                  className="flex-1"
                >
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button
                  onClick={() => router.push("/billing")}
                  className="flex-1"
                >
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  Billing
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
