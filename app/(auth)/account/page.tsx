"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogOut, ShoppingBagIcon, Heart, ShoppingCart, Pencil, User,Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/lib/userStore";
import toast from "react-hot-toast";
import { ShippingFormDialog, ShippingFormData } from "@/components/ShippingFormDialog";
import { OrderDetailDialog } from "@/components/OrderDetailDialog";

type UserInfoFormData = {
  name: string;
  email: string;
};

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, updateUser, logout, users, deleteShippingDetails, addShippingDetails, updateShippingDetails, deleteOrder, clearOrders, } = useUserStore();

  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [editingShipping, setEditingShipping] = useState<ShippingFormData | null>(null);
  const [confirmAction, setConfirmAction] = useState<"logout" | "delete" | "clearOrders" | "deleteOrder" | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  type Tab = "user" | "address" | "orders";
  const [activeTab, setActiveTab] = useState<Tab>("user");

  const tabs: { id: Tab; label: string }[] = [
    { id: "user", label: "User Info" },
    { id: "address", label: "Addresses" },
    { id: "orders", label: "Order History" },
  ];

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

  const handleDeleteAccount = () => {
    if (!currentUser) return;
    useUserStore.getState().deleteUser(currentUser.email);
    logout();
    toast.success("Account deleted!");
    router.push("/login");
  };

  const handleDeleteOrder = () => {
    if (!currentUser) return;
    deleteOrder(selectedOrderId!);
    toast.success("Order deleted!");
    setConfirmAction(null);
  };

  const handleClearOrders = () => {
    if (!currentUser) return;
    clearOrders();
    toast.success("Order history cleared!");
    setConfirmAction(null);
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
      (d) => d.type.toLowerCase() === data.type.toLowerCase()
    );
    if (typeExists && (!editingShipping || editingShipping.type !== data.type)) {
      toast.error("Address type already exists.");
      return;
    }

    try {
      if (editingShipping) {
        updateShippingDetails({ ...data, type: editingShipping.type });
        toast.success("Address updated!");
      } else {
        addShippingDetails(data);
        toast.success("Address added!");
      }
    } catch {
      toast.error("Failed to update address.");
    }

    setEditingShipping(null);
    setShippingDialogOpen(false);
  };

  const onEdit = (detail: ShippingFormData) => {
    setEditingShipping(detail);
    setShippingDialogOpen(true);
  };

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-8xl mx-auto px-4 flex h-16 items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Account</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" onClick={() => router.push("/shop")}>
            <ShoppingBagIcon size={18} />
            <span className="ml-1 hidden sm:inline">Shop</span>
          </Button>
          <Button variant="outline" onClick={() => router.push("/wishlist")}>
            <Heart size={18} />
            <span className="ml-1 hidden sm:inline">Wishlist ({currentUser.wishlist.length})</span>
          </Button>
          <Button variant="outline" onClick={() => router.push("/cart")}>
            <ShoppingCart size={18} />
            <span className="ml-1 hidden sm:inline">Cart ({currentUser.cart.length})</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2" title="User Menu">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600" onClick={() => setConfirmAction("logout")}>
                <LogOut size={16} className="mr-2" /> Logout
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => setConfirmAction("delete")}>
                <Trash2 size={16} className="mr-2" /> Delete Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Confirmation Dialog */}
          <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {confirmAction === "logout"
                    ? "Confirm Logout"
                    : confirmAction === "delete"
                    ? "Confirm Delete Account"
                    : confirmAction === "clearOrders"
                    ? "Clear Order History"
                    : confirmAction === "deleteOrder"
                    ? "Delete Order"
                    : ""}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {confirmAction === "logout"
                    ? "Are you sure you want to log out?"
                    : confirmAction === "delete"
                    ? "This will permanently delete your account. Proceed?"
                    : confirmAction === "clearOrders"
                    ? "This will clear your entire order history. This action cannot be undone."
                    : confirmAction === "deleteOrder"
                    ? "This will permanently delete this order. Continue?"
                    : ""}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (confirmAction === "logout") handleLogout();
                    else if (confirmAction === "delete") handleDeleteAccount();
                    else if (confirmAction === "clearOrders") handleClearOrders();
                    else if (confirmAction === "deleteOrder") handleDeleteOrder();
                  }}
                >
                  {confirmAction === "logout"
                    ? "Logout"
                    : confirmAction === "delete"
                    ? "Delete"
                    : confirmAction === "clearOrders"
                    ? "Clear History"
                    : confirmAction === "deleteOrder"
                    ? "Delete"
                    : ""}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>

    <div className="mt-20 mb-6 border-b border-gray-200 flex justify-center">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 transition-all text-base font-medium border-b-2 ${
              activeTab === tab.id
                ? "text-primary border-primary"
                : "text-gray-500 border-transparent hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>

    <main className="space-y-10">
      {activeTab === "user" && (
        <Card className="shadow-sm border max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            {showUserInfoForm ? (
              <form onSubmit={subUser(onSubmitUser)} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input {...regUser("name", { required: "Name is required" })} />
                  {errUser.name && <p className="text-sm text-red-600">{errUser.name.message}</p>}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    {...regUser("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errUser.email && <p className="text-sm text-red-600">{errUser.email.message}</p>}
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowUserInfoForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submittingUser}>
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {currentUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <Button onClick={() => setShowUserInfoForm(true)} className="mt-4">
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "address" && (
        <Card className="shadow-sm border max-w-3xl mx-auto">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Shipping Addresses</CardTitle>
            <Button onClick={() => { setEditingShipping(null); setShippingDialogOpen(true); }}>
              Add Address
            </Button>
          </CardHeader>
          <CardContent>
            {currentUser.shippingDetails.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">No shipping addresses added yet.</p>
            ) : (
              <div className="space-y-4">
                {currentUser.shippingDetails.map((detail) => (
                  <div
                    key={detail.type}
                    className="p-4 border rounded-md flex justify-between items-start bg-white shadow-sm"
                  >
                    <div className="text-sm space-y-1 text-gray-700">
                      <p><strong>Type:</strong> {detail.type}</p>
                      <p><strong>Address:</strong> {detail.address}</p>
                      <p><strong>City:</strong> {detail.city}</p>
                      <p><strong>Phone Number:</strong> {detail.phoneNumber}</p>
                      <p><strong>Country:</strong> {detail.country}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(detail)}>
                        <Pencil size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(detail.type)}>
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <ShippingFormDialog
              open={shippingDialogOpen}
              onClose={() => setShippingDialogOpen(false)}
              existingTypes={currentUser.shippingDetails.map((d) => d.type)}
              onSave={handleShippingSave}
              initialData={editingShipping || undefined}
            />
          </CardContent>
        </Card>
      )}

      {activeTab === "orders" && (
        <Card className="shadow-sm border max-w-3xl mx-auto">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Order History</CardTitle>
            <Button
              variant="destructive"
              disabled={currentUser.orders.length === 0}
              onClick={() => setConfirmAction("clearOrders")}
            >
              Clear History
            </Button>
          </CardHeader>
          <CardContent>
            {currentUser.orders.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">You have no past orders.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm border rounded overflow-hidden">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      <th className="px-4 py-2 text-left">#</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Time</th>
                      <th className="px-4 py-2 text-left">Items</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...currentUser.orders].reverse().map((order, index) => (
                      <tr key={order.id} className="hover:bg-gray-50 border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{new Date(order.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="px-4 py-2">{order.items.length}</td>
                        <td className="px-4 py-2 font-semibold">₹{order.total.toFixed(2)}</td>
                        <td className="px-4 py-2 space-x-2">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedOrderId(order.id); setViewDialogOpen(true); }}>
                            View
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => { setSelectedOrderId(order.id); setConfirmAction("deleteOrder"); }}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <OrderDetailDialog
              open={viewDialogOpen}
              onClose={() => setViewDialogOpen(false)}
              orderId={selectedOrderId}
            />
          </CardContent>
        </Card>
      )}
    </main>
  </div>
);
}
