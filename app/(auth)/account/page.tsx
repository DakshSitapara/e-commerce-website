"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogOut, ShoppingBagIcon, Heart, ShoppingCart, Pencil, Trash } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ShippingFormData = {
  type: string;
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

  const [editingType, setEditingType] = useState<string | null>(null);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const currentUser = useUserStore((state) => state.currentUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const logout = useUserStore((state) => state.logout);
  const shippingDetails = currentUser?.shippingDetails || [];

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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const onSubmitShipping = (data: ShippingFormData) => {
    if (!currentUser) return;

    const updatedShippingDetails = editingType
      ? currentUser.shippingDetails.map((detail) =>
          detail.type === editingType ? { ...data, type: editingType } : detail
        )
      : [...currentUser.shippingDetails, data];

    updateUser({ ...currentUser, shippingDetails: updatedShippingDetails });
    resetShipping();
    setEditingType(null);
    setShowShippingForm(false);
  };

  const onEditShipping = (type: string) => {
    const detail = currentUser?.shippingDetails.find((d) => d.type === type);
    if (detail) {
      resetShipping(detail);
      setEditingType(type);
      setShowShippingForm(true);
    }
  };

  const onDeleteShipping = (type: string) => {
    if (!currentUser) return;
    const updatedShipping = currentUser.shippingDetails.filter(
      (detail) => detail.type !== type
    );
    updateUser({ ...currentUser, shippingDetails: updatedShipping });
  };

  const onUpdateUserInfo = (data: UserInfoFormData) => {
    if (!currentUser) return;
    updateUser({ ...currentUser, ...data });
    setShowUserInfoForm(false);
  };

  useEffect(() => {
    if (currentUser) {
      resetUserInfo({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, resetUserInfo]);

  return (
    <div className="flex flex-col items-center mx-auto max-w-xl p-4">
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <LogOut size={20} />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You’ll be logged out, but your data will remain saved.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>Logout</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                      <Label>Name</Label>
                      <Input type="text" {...registerUserInfo("name", { required: true })} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" {...registerUserInfo("email", { required: true })} />
                    </div>
                    <Button type="submit" disabled={isSubmittingUserInfo}>
                      {isSubmittingUserInfo ? "Updating..." : "Update"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <Button onClick={() => setShowUserInfoForm(true)}>Edit Info</Button>
                </CardContent>
              </Card>
            )}
            {showShippingForm ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingType ? `Edit "${editingType}" Address` : "Add Shipping Address"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit(onSubmitShipping)} className="space-y-4">
                      {!editingType && (
                        <div>
                          <Label>Type (e.g., Home, Work)</Label>
                          <Input {...registerShipping("type", { required: true })} />
                        </div>
                      )}
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          pattern="[0-9]{10}"
                          {...registerShipping("phoneNumber", { required: true })}
                        />
                      </div>
                      <div>
                        <Label>Address</Label>
                        <Input {...registerShipping("address", { required: true })} />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input {...registerShipping("city", { required: true })} />
                      </div>
                      <div>
                        <Label>Country</Label>
                        <Input {...registerShipping("country", { required: true })} />
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit" disabled={isSubmittingShipping}>
                          {editingType ? "Update" : "Add"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowShippingForm(false);
                            setEditingType(null);
                            resetShipping();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Saved Addresses
                      <Button
                        onClick={() => {
                          resetShipping();
                          setEditingType(null);
                          setShowShippingForm(true);
                        }}
                      >
                        Add New Address
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {shippingDetails.map((detail) => (
                      <div key={detail.type} className="border p-4 rounded space-y-1">
                        <p><strong>Type:</strong> {detail.type}</p>
                        <p><strong>Phone:</strong> {detail.phoneNumber}</p>
                        <p><strong>Address:</strong> {detail.address}</p>
                        <p><strong>City:</strong> {detail.city}</p>
                        <p><strong>Country:</strong> {detail.country}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditShipping(detail.type)}
                          >
                            <Pencil size={16} /> Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDeleteShipping(detail.type)}
                          >
                            <Trash size={16} /> Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
          </>
        )}
      </div>
    </div>
  );
}
