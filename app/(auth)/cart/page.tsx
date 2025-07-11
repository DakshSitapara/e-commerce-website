"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon,  ShoppingBag, RotateCw, Heart, CreditCardIcon } from "lucide-react";
import { CategoryColor, TypeColor } from "@/lib/shop_data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { removeFromCart, clearCart, currentUser } = useUserStore();
  const { cart, wishlist } = currentUser ?? { cart: [], wishlist: [] };

  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Cart
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/shop")}
                className="hidden sm:flex items-center gap-2"
                aria-label="Shop"
              >
                <ShoppingBagIcon size={20} />
                <span className="hidden sm:inline">Shop</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/wishlist")}
                className="flex items-center gap-2"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                <span className="hidden sm:inline">Wishlist ({wishlist.length})</span>
              </Button>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        clearCart();
                        toast.success(`Cart cleared!`);
                      }}
                      aria-label="Clear Cart"
                    >
                      <RotateCw size={20} />
                      <span className="hidden sm:inline">Clear Cart</span>
                    </Button>
                    <Button
                      onClick={() => router.push("/billing")}
                      aria-label="Billing"
                    >
                      <CreditCardIcon size={20} />
                      <span className="hidden sm:inline">Billing</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {cart.length === 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Link href="/shop">
            <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 w-full gap-4 mt-16">
          {cart.map((product) => (
            <Card
              key={product.id}
              className="relative mb-4 p-4 rounded-lg shadow-md bg-white"
            >
              <CardHeader className="flex justify-between">
                <CardTitle className="text-lg font-semibold">
                  {product.name}
                </CardTitle>
                <Badge
                  className={`absolute top-2 right-2 ${CategoryColor(
                    product.category
                  )}`}
                >
                  {product.category}
                </Badge>
                <Badge
                  className={`absolute top-10 right-2 ${TypeColor(
                    product.type
                  )}`}
                >
                  {product.type}
                </Badge>
              </CardHeader>
              <CardContent className="flex justify-between">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  loader={() => product.image}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-2 absolute bottom-4 right-0 px-2">
                <p className="text-sm text-gray-600">₹{product.price}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    removeFromCart(product.id);
                    toast.success(`${product.name} Removed from cart!`);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-900 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

