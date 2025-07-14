"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

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
    formState: { errors: errorsShipping, isSubmitting: isSubmittingShipping },
  } = useForm<ShippingFormData>({
    defaultValues: {
      type: "",
      address: "",
      city: "",
      country: "",
      phoneNumber: "",
    },
  });

  const {
    register: registerUserInfo,
    handleSubmit: handleUserInfoSubmit,
    reset: resetUserInfo,
    formState: { errors: errorsUserInfo, isSubmitting: isSubmittingUserInfo },
  } = useForm<UserInfoFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const onSubmitShipping = async (data: ShippingFormData) => {
    if (!currentUser) return;

    const sanitizedData = {
      type: data.type,
      address: data.address,
      city: data.city,
      country: data.country,
      phoneNumber: data.phoneNumber,
    };

    try {
      const updatedShippingDetails = editingType
        ? currentUser.shippingDetails.map((detail) =>
            detail.type === editingType ? { ...sanitizedData, type: editingType } : detail
          )
        : [...currentUser.shippingDetails, sanitizedData];

      await updateUser({ ...currentUser, shippingDetails: updatedShippingDetails });
      toast.success(editingType ? "Address updated!" : "Address added!");
      resetShipping({
        type: "",
        address: "",
        city: "",
        country: "",
        phoneNumber: "",
      });
      setEditingType(null);
      setShowShippingForm(false);
    } catch (error) {
      console.error("Failed to update shipping details:", error);
      toast.error("Failed to save address. Please try again.");
    }
  };

  const onEditShipping = useCallback((type: string) => {
    const detail = currentUser?.shippingDetails.find((d) => d.type === type);
    if (detail) {
      resetShipping(detail);
      setEditingType(type);
      setShowShippingForm(true);
    }
  }, [currentUser, resetShipping]);

  const onDeleteShipping = async (type: string) => {
    if (!currentUser) return;
    try {
      const updatedShipping = currentUser.shippingDetails.filter(
        (detail) => detail.type !== type
      );
      await updateUser({ ...currentUser, shippingDetails: updatedShipping });
      toast.success("Address deleted!");
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address. Please try again.");
    }
  };

  const onUpdateUserInfo = async (data: UserInfoFormData) => {
    if (!currentUser) return;
    const sanitizedData = {
      name: data.name,
      email: data.email,
    };
    try {
      await updateUser({ ...currentUser, ...sanitizedData });
      toast.success("User information updated!");
      setShowUserInfoForm(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user information. Please try again.");
    }
  };

  useEffect(() => {
    if (currentUser && showUserInfoForm) {
      resetUserInfo({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, resetUserInfo, showUserInfoForm]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg className="animate-spin h-8 w-8 text-gray-600" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto max-w-xl p-4">
      <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Account</h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" onClick={() => router.push("/shop")} aria-label="Go to Shop">
                <ShoppingBagIcon size={20} />
                <span className="hidden sm:inline">Shop</span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/wishlist")} aria-label={`Wishlist with ${currentUser?.wishlist.length ?? 0} items`}>
                <Heart size={20} />
                <span className="hidden sm:inline">
                  Wishlist ({currentUser?.wishlist.length ?? 0})
                </span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/cart")} aria-label={`Cart with ${currentUser?.cart.length ?? 0} items`}>
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">
                  Cart ({currentUser?.cart.length ?? 0})
                </span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" aria-label="Log out">
                    <LogOut size={20} />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You’ll be logged out, but your data will remain saved.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full mt-20 space-y-6">
        {showUserInfoForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Update User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserInfoSubmit(onUpdateUserInfo)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    {...registerUserInfo("name", { required: "Name is required" })}
                    aria-invalid={errorsUserInfo.name ? "true" : "false"}
                  />
                  {errorsUserInfo.name && (
                    <p className="text-red-500 text-sm">{errorsUserInfo.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerUserInfo("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                    aria-invalid={errorsUserInfo.email ? "true" : "false"}
                  />
                  {errorsUserInfo.email && (
                    <p className="text-red-500 text-sm">{errorsUserInfo.email.message}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isSubmittingUserInfo}>
                    {isSubmittingUserInfo ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowUserInfoForm(false)}
                    aria-label="Cancel user info edit"
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
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <Button onClick={() => setShowUserInfoForm(true)} aria-label="Edit user information">
                Edit Info
              </Button>
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
                    <Label htmlFor="type">Type (e.g., Home, Work)</Label>
                    <Input
                      id="type"
                      {...registerShipping("type", {
                        required: "Type is required",
                        validate: (value) =>
                          !currentUser.shippingDetails.some((d) => d.type === value) ||
                          "Address type already exists",
                      })}
                      aria-invalid={errorsShipping.type ? "true" : "false"}
                    />
                    {errorsShipping.type && (
                      <p className="text-red-500 text-sm">{errorsShipping.type.message}</p>
                    )}
                  </div>
                )}
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    {...registerShipping("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Invalid phone number format (e.g., +1234567890)",
                      },
                    })}
                    aria-invalid={errorsShipping.phoneNumber ? "true" : "false"}
                  />
                  {errorsShipping.phoneNumber && (
                    <p className="text-red-500 text-sm">{errorsShipping.phoneNumber.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    {...registerShipping("address", { required: "Address is required" })}
                    aria-invalid={errorsShipping.address ? "true" : "false"}
                  />
                  {errorsShipping.address && (
                    <p className="text-red-500 text-sm">{errorsShipping.address.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...registerShipping("city", { required: "City is required" })}
                    aria-invalid={errorsShipping.city ? "true" : "false"}
                  />
                  {errorsShipping.city && (
                    <p className="text-red-500 text-sm">{errorsShipping.city.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...registerShipping("country", { required: "Country is required" })}
                    aria-invalid={errorsShipping.country ? "true" : "false"}
                  />
                  {errorsShipping.country && (
                    <p className="text-red-500 text-sm">{errorsShipping.country.message}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isSubmittingShipping}>
                    {isSubmittingShipping ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Saving...
                      </span>
                    ) : editingType ? "Update" : "Add"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowShippingForm(false);
                      setEditingType(null);
                      resetShipping({
                        type: "",
                        address: "",
                        city: "",
                        country: "",
                        phoneNumber: "",
                      });
                    }}
                    aria-label="Cancel address form"
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
                    resetShipping({
                      type: "",
                      address: "",
                      city: "",
                      country: "",
                      phoneNumber: "",
                    });
                    setEditingType(null);
                    setShowShippingForm(true);
                  }}
                  aria-label="Add new shipping address"
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
                      aria-label={`Edit ${detail.type} address`}
                    >
                      <Pencil size={16} /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteShipping(detail.type)}
                      aria-label={`Delete ${detail.type} address`}
                    >
                      <Trash size={16} /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}