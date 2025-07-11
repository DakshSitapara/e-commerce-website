"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingBagIcon, Heart, ShoppingCart } from "lucide-react";
import { useUserStore } from "@/lib/userStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountPage() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => { logout(); router.push("/login"); };

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
                  Wishlist ({currentUser?.wishlist.length ?? 0})
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
                <span className="hidden sm:inline">Cart ({currentUser?.cart.length ?? 0})</span>
              </Button>
              <Button title="Logout" variant="destructive" onClick={handleLogout}>
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>  
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {currentUser && (
        <div className="w-full mt-15">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Name: {currentUser.name}</p>
              <p>Email: {currentUser.email}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

