"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingBagIcon, Heart, ShoppingCart } from "lucide-react";
import { logout } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loginUser") || "null");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => { logout(); router.push("/login");};

  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Account
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button title="Shop" variant="outline" onClick={() => router.push("/shop")}>
                <ShoppingBagIcon size={20} />
                <span className="hidden sm:inline">Shop</span>
              </Button>
              <Button
                title="Wishlist"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/wishlist")}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                <span className="hidden sm:inline">
                  Wishlist ({wishlist.length})
                </span>
              </Button>
              <Button
                title="Cart"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/cart")}
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Cart ({cart.length})</span>
              </Button>
              <Button title="Logout" variant="destructive" onClick={handleLogout}>
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>  
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {user && (
        <div className="w-full mt-15">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}

