"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogOut, ShoppingBagIcon, Heart, ShoppingCart } from "lucide-react";
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

type ShippingFormData = {
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
};

type UserInfoFormData = {
  name: string;
  email: string;
};

export default function AccountPage() {
  const router = useRouter();

  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);

  const currentUser = useUserStore((state) => state.currentUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const shippingDetails = currentUser?.shippingDetails;

  const logout = useUserStore((state) => state.logout);
    const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    reset: resetShipping,
    formState: { isSubmitting: isSubmittingShipping },
  } = useForm<ShippingFormData>();

  const {
    register: registerUserInfo,
    handleSubmit: handleUserInfoSubmit,
    reset: resetUserInfo,
    formState: { isSubmitting: isSubmittingUserInfo },
  } = useForm<UserInfoFormData>();

  const onSubmitShipping = async (data: ShippingFormData) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      shippingDetails: data,
    };

    updateUser(updatedUser);
    setShowShippingForm(false);
  };

  const onUpdateUserInfo = async (data: UserInfoFormData) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: data.name,
      email: data.email,
    };

    updateUser(updatedUser);
    setShowUserInfoForm(false);
  };

  
  useEffect(() => {
    if (shippingDetails) {
      resetShipping(shippingDetails);
    }
  }, [shippingDetails, resetShipping]);

  useEffect(() => {
    if (currentUser) {
      resetUserInfo({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, resetUserInfo]);

  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Account</h1>
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

      <div className="w-full mt-20 space-y-6">
        {currentUser && (
          <>
          {showUserInfoForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Update User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUserInfoSubmit(onUpdateUserInfo)} className="space-y-4">
                  <div>
                    <Label className="mb-2">Name</Label>
                    <Input
                      type="text"
                      {...registerUserInfo("name", { required: true })}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Email</Label>
                    <Input
                      type="email"
                      {...registerUserInfo("email", { required: true })}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmittingUserInfo}>
                    {isSubmittingUserInfo ? "Updating..." : "Update"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ):
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                  <p><strong>Name: </strong>{currentUser.name}</p>
                  <p><strong>Email: </strong>{currentUser.email}</p>
              <Button onClick={() => setShowUserInfoForm(true)}>Update User Information</Button>
            </CardContent>
          </Card>
          }

            {showShippingForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {shippingDetails ? "Update Shipping Information" : "Add Shipping Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit(onSubmitShipping)} className="space-y-4">
                    <div>
                      <Label className="mb-2">Phone Number</Label>
                      <Input
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="1234567890"
                        {...registerShipping("phoneNumber", { required: true, pattern: /^[0-9]{10}$/ })}
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Address</Label>
                      <Input
                        type="text"
                        {...registerShipping("address", { required: true })}
                      />
                    </div>
                    <div>
                      <Label className="mb-2">City</Label>
                      <Input
                        type="text"
                        {...registerShipping("city", { required: true })}
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Country</Label>
                      <Input
                        type="text"
                        {...registerShipping("country", { required: true })}
                      />
                    </div>
                    <Button type="submit" disabled={isSubmittingShipping}>
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
                  <Button onClick={() => setShowShippingForm(true)}>
                    {shippingDetails ? "Update Shipping Information" : "Add Shipping Information"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
