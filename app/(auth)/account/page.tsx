"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  LogOut,
  ShoppingBagIcon,
  Heart,
  ShoppingCart,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/lib/userStore";
import toast from "react-hot-toast";
import {
  ShippingFormDialog,
  ShippingFormData,
} from "@/components/ShippingFormDialog";

type UserInfoFormData = {
  name: string;
  email: string;
};

export default function AccountPage() {
  const router = useRouter();
  const currentUser = useUserStore((s) => s.currentUser);
  const updateUser = useUserStore((s) => s.updateUser);
  const logout = useUserStore((s) => s.logout);
  const users = useUserStore((s) => s.users);
  const deleteShippingDetails = useUserStore((s) => s.deleteShippingDetails);

  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [editingShipping, setEditingShipping] = useState<ShippingFormData | null>(null);

  const {
    register: regUser,
    handleSubmit: subUser,
    reset: resetUser,
    formState: { errors: errUser, isSubmitting: submittingUser },
  } = useForm<UserInfoFormData>();

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    router.push("/login");
  };

  const onSubmitUser = async (data: UserInfoFormData) => {
    if (!currentUser) return;

    const duplicate = users.find(
      (u) => u.email === data.email && u.email !== currentUser.email
    );
    if (duplicate) {
      toast.error("This email is already in use.");
      return;
    }

    try {
      await updateUser({ ...currentUser, ...data });
      toast.success("Profile updated!");
      setShowUserInfoForm(false);
    } catch {
      toast.error("Update failed.");
    }
  };

  useEffect(() => {
    if (currentUser && showUserInfoForm) {
      resetUser({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, showUserInfoForm, resetUser]);

  const handleShippingSave = async (data: ShippingFormData) => {
    if (!currentUser) return;

    const typeExists = currentUser.shippingDetails.some(
      (d) =>
        d.type.toLowerCase() === data.type.toLowerCase() &&
        (!editingShipping || editingShipping.type.toLowerCase() !== data.type.toLowerCase())
    );
    if (typeExists) {
      toast.error("Address type already exists.");
      return;
    }

    const updated = editingShipping
      ? currentUser.shippingDetails.map((d) =>
          d.type === editingShipping.type
            ? { ...data, type: editingShipping.type }
            : d
        )
      : [...(currentUser.shippingDetails || []), data];

    try {
      await updateUser({ ...currentUser, shippingDetails: updated });
      toast.success(editingShipping ? "Address updated!" : "Address added!");
    } catch {
      toast.error("Failed to update address.");
    }

    setEditingShipping(null);
  };

  const onEdit = useCallback((detail: ShippingFormData) => {
    setEditingShipping(detail);
    setShippingDialogOpen(true);
  }, []);

  const onDelete = (type: string) => {
    if (!currentUser) return;
    deleteShippingDetails(type);
    toast.success("Deleted!");
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto py-8 px-4">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/shop")}>
                <ShoppingBagIcon size={20} className="mr-2" />
                Shop
              </Button>
              <Button variant="outline" onClick={() => router.push("/wishlist")}>
                <Heart size={20} className="mr-2" />
                Wishlist ({currentUser.wishlist.length})
              </Button>
              <Button variant="outline" onClick={() => router.push("/cart")}>
                <ShoppingCart size={20} className="mr-2" />
                Cart ({currentUser.cart.length})
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </nav>

      <main className="mt-24">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                {showUserInfoForm ? (
                  <form onSubmit={subUser(onSubmitUser)} className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input {...regUser("name", { required: "Name is required" })} />
                      {errUser.name && (
                        <p className="text-sm text-red-600">{errUser.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        {...regUser("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/,
                            message: "Invalid email",
                          },
                        })}
                      />
                      {errUser.email && (
                        <p className="text-sm text-red-600">{errUser.email.message}</p>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowUserInfoForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submittingUser}>
                        {submittingUser ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> {currentUser.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentUser.email}
                    </p>
                    <Button onClick={() => setShowUserInfoForm(true)}>Edit Profile</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/2">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>My Addresses</CardTitle>
                <Button onClick={() => { setEditingShipping(null); setShippingDialogOpen(true); }}>
                  Add New Address
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentUser.shippingDetails.length === 0 && <p>No saved addresses.</p>}
                {currentUser.shippingDetails.map((d) => (
                  <Card key={d.type} className="p-4 hover:bg-accent">
                    <div className="flex justify-between">
                      <div>
                        <p><strong>Type:</strong> {d.type}</p>
                        <p><strong>Phone:</strong> {d.phoneNumber}</p>
                        <p><strong>Address:</strong> {d.address}</p>
                        <p><strong>City:</strong> {d.city}</p>
                        <p><strong>Country:</strong> {d.country}</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" onClick={() => onEdit(d)}>
                          <Pencil size={16} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(d.type)}>
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <ShippingFormDialog
          open={shippingDialogOpen}
          existingTypes={currentUser.shippingDetails.map((d) => d.type)}
          initialData={editingShipping}
          onClose={() => {
            setShippingDialogOpen(false);
            setEditingShipping(null);
          }}
          onSave={handleShippingSave}
        />
      </main>
    </div>
  );
}
