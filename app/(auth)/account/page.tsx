"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  LogOut,
  ShoppingBagIcon,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUserStore } from "@/lib/userStore";

type FormData = {
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
};

export default function AccountPage() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);
  const shippingDetails = currentUser?.shippingDetails;
  const addShippingDetails = useUserStore((state) => state.addShippingDetails);
  const updateShippingDetails = useUserStore((state) => state.updateShippingDetails);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (shippingDetails) {
      reset(shippingDetails);
    }
  }, [shippingDetails, reset]);

  useEffect(() => {
    if (shippingDetails) {
      setShowForm(false); }
  }, [shippingDetails]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const onSubmit = async (data: FormData) => {
    if (!currentUser) return;
    if (shippingDetails) {
      updateShippingDetails(data);
    } else {
      addShippingDetails(data);
    }
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Account
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" onClick={() => router.push("/shop")}>
                <ShoppingBagIcon size={20} />
                <span className="hidden sm:inline">Shop</span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/wishlist")}>
                <Heart size={20} />
                <span className="hidden sm:inline">
                  Wishlist ({currentUser?.wishlist.length ?? 0})
                </span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/cart")}>
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">
                  Cart ({currentUser?.cart.length ?? 0})
                </span>
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {currentUser && (
        <div className="w-full mt-20">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {currentUser && (
        <div className="w-full mt-6">
          {showForm ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {shippingDetails ? "Update Shipping Information" : "Add Shipping Information"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label className="mb-2">Phone Number</Label>
                    <Input
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="1234567890"
                      {...register("phoneNumber", { required: true, pattern: /^[0-9]{10}$/ })}
                      defaultValue={shippingDetails?.phoneNumber}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Address</Label>
                    <Input
                      type="text"
                      {...register("address", { required: true })}
                      defaultValue={shippingDetails?.address}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">City</Label>
                    <Input
                      type="text"
                      {...register("city", { required: true })}
                      defaultValue={shippingDetails?.city}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Country</Label>
                    <Input
                      type="text"
                      {...register("country", { required: true })}
                      defaultValue={shippingDetails?.country}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {shippingDetails ? "Update" : "Add and Save"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Phone Number:</strong> {shippingDetails?.phoneNumber}</p>
                <p><strong>Address:</strong> {shippingDetails?.address}</p>
                <p><strong>City:</strong> {shippingDetails?.city}</p>
                <p><strong>Country:</strong> {shippingDetails?.country}</p>
                <Button className="mt-4" onClick={() => setShowForm(true)}>
                    {shippingDetails ? "Update Shipping Information" : "Add Shipping Information"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
