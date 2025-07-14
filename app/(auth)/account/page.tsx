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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <svg className="animate-spin h-8 w-8 text-gray-600" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="ml-2 text-gray-600 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/shop")}
                aria-label="Go to Shop"
              >
                <ShoppingBagIcon size={20} className="mr-2" />
                <span>Shop</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/wishlist")}
                aria-label={`Wishlist with ${currentUser?.wishlist.length ?? 0} items`}
              >
                <Heart size={20} className="mr-2" />
                <span>Wishlist ({currentUser?.wishlist.length ?? 0})</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/cart")}
                aria-label={`Cart with ${currentUser?.cart.length ?? 0} items`}
              >
                <ShoppingCart size={20} className="mr-2" />
                <span>Cart ({currentUser?.cart.length ?? 0})</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    aria-label="Log out"
                  >
                    <LogOut size={20} className="mr-2" />
                    <span>Logout</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600">
                      Are you sure you want to log out? Your data will remain saved.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full mt-20 space-y-8">
        <div className="flex flex-col-1 gap-4 items-center space-y-4">
        {showUserInfoForm ? (
          <Card className="w-full bg-white shadow-lg rounded-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Update Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <form onSubmit={handleUserInfoSubmit(onUpdateUserInfo)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                    {...registerUserInfo("name", { required: "Name is required" })}
                    aria-invalid={errorsUserInfo.name ? "true" : "false"}
                  />
                  {errorsUserInfo.name && (
                    <p className="text-red-500 text-sm mt-1">{errorsUserInfo.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
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
                    <p className="text-red-500 text-sm mt-1">{errorsUserInfo.email.message}</p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    disabled={isSubmittingUserInfo}
                  >
                    {isSubmittingUserInfo ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
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
          <Card className="w-full bg-white shadow-lg rounded-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p>
                  <strong className="text-gray-700">Name:</strong> {currentUser.name}
                </p>
                <p>
                  <strong className="text-gray-700">Email:</strong> {currentUser.email}
                </p>
              </div>
              <Button
                onClick={() => setShowUserInfoForm(true)}
                aria-label="Edit user information"
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        )}
        {showShippingForm ? (
          <Card className="w-full bg-white shadow-lg rounded-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">
                {editingType ? `Edit "${editingType}" Address` : "Add New Address"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <form onSubmit={handleShippingSubmit(onSubmitShipping)} className="space-y-6">
                {!editingType && (
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                      Address Type (e.g., Home, Work)
                    </Label>
                    <Input
                      id="type"
                      className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                      {...registerShipping("type", {
                        required: "Type is required",
                        validate: (value) =>
                          !currentUser.shippingDetails.some((d) => d.type === value) ||
                          "Address type already exists",
                      })}
                      aria-invalid={errorsShipping.type ? "true" : "false"}
                    />
                    {errorsShipping.type && (
                      <p className="text-red-500 text-sm mt-1">{errorsShipping.type.message}</p>
                    )}
                  </div>
                )}
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
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
                    <p className="text-red-500 text-sm mt-1">{errorsShipping.phoneNumber.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                    {...registerShipping("address", { required: "Address is required" })}
                    aria-invalid={errorsShipping.address ? "true" : "false"}
                  />
                  {errorsShipping.address && (
                    <p className="text-red-500 text-sm mt-1">{errorsShipping.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                      {...registerShipping("city", { required: "City is required" })}
                      aria-invalid={errorsShipping.city ? "true" : "false"}
                    />
                    {errorsShipping.city && (
                      <p className="text-red-500 text-sm mt-1">{errorsShipping.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <Input
                      id="country"
                      className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500"
                      {...registerShipping("country", { required: "Country is required" })}
                      aria-invalid={errorsShipping.country ? "true" : "false"}
                    />
                    {errorsShipping.country && (
                      <p className="text-red-500 text-sm mt-1">{errorsShipping.country.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    disabled={isSubmittingShipping}
                  >
                    {isSubmittingShipping ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Saving...
                      </span>
                    ) : editingType ? "Update Address" : "Add Address"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
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
          <Card className="w-full bg-white shadow-lg rounded-lg">
            <CardHeader className="p-6">
              <CardTitle className="flex justify-between items-center text-xl font-semibold text-gray-900">
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
            <CardContent className="p-6 pt-0 space-y-6">
              {shippingDetails.length === 0 ? (
                <p className="text-gray-600">No saved addresses. Add one to get started!</p>
              ) : (
                shippingDetails.map((detail) => (
                  <div
                    key={detail.type}
                    className="border border-gray-200 p-4 rounded-lg space-y-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <p>
                        <strong className="text-gray-700">Type:</strong> {detail.type}
                      </p>
                      <p>
                        <strong className="text-gray-700">Phone:</strong> {detail.phoneNumber}
                      </p>
                      <p>
                        <strong className="text-gray-700">Address:</strong> {detail.address}
                      </p>
                      <p>
                        <strong className="text-gray-700">City:</strong> {detail.city}
                      </p>
                      <p>
                        <strong className="text-gray-700">Country:</strong> {detail.country}
                      </p>
                    </div>
                    <div className="flex space-x-4 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        onClick={() => onEditShipping(detail.type)}
                        aria-label={`Edit ${detail.type} address`}
                      >
                        <Pencil size={16} className="mr-2" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => onDeleteShipping(detail.type)}
                        aria-label={`Delete ${detail.type} address`}
                      >
                        <Trash size={16} className="mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}
        </div>
      </main>
    </div>
  );
}