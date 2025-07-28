"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LogOut, ShoppingBagIcon, Heart, ShoppingCart, User,Trash2 } from "lucide-react";
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
import { FcAddColumn, FcViewDetails } from "react-icons/fc";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import ShopNav from "@/components/ShopNav";

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

  useEffect(() => {
    const cookie = document.cookie.split(";").find((c) => c.trim().startsWith("activeTab"));
    if (cookie) {
      const storedTab = cookie.split("=")[1];
      if (storedTab) {
        setActiveTab(storedTab as Tab);
      }
    }
  }, []);

  useEffect(() => {
    document.cookie = `activeTab=${activeTab}; Path=/;`;
  }, [activeTab]);

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
  <div className="bg-[url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')] bg-cover bg-center">
    <div className="min-h-screen max-w-4xl mx-auto py-8 px-4">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#131921] shadow-sm border-b">
        <div className="max-w-8xl mx-auto px-4 flex h-16 items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-white">My Account</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={() => router.push("/shop")}
              className="bg-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white">
              <ShoppingBagIcon size={18} />
              <span className="ml-1 hidden sm:inline">Shop</span>
            </Button>
            <Button 
            onClick={() => router.push("/cart")}
            className ="bg-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white">
              <ShoppingCart size={18} />
              <span className="ml-1 hidden sm:inline">Cart ({currentUser.cart.length})</span>
            </Button>
            <Button  
            onClick={() => router.push("/wishlist")}
            className="bg-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white">
              <Heart size={18} />
              <span className="ml-1 hidden sm:inline">Wishlist ({currentUser.wishlist.length})</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="p-2 bg-transparent text-white hover:bg-transparent hover:text-white hover:border hover:border-white"
                title="User Menu">
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

      <div className="mt-20 mb-6  flex justify-center">
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
          <Card className="max-w-2xl mx-auto bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex justify-between items-center border-b border-gray-300 pb-1">
                User Information
                {showUserInfoForm ? (
                        <></>
                ) : ( 
                  <Button 
                  title="Edit User Information"
                  onClick={() => setShowUserInfoForm(true)}
                  className="bg-transparent text-primary shadow-none hover:bg-gray-100 hover:text-primary">
                    <FaEdit size={16} />
                  </Button>
                )}
              </CardTitle>
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
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "address" && (
          <Card className="max-w-2xl mx-auto bg-transparent border-none shadow-none">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Shipping Addresses</CardTitle>
              <Button 
              title="Add Shipping Address"
              onClick={() => { setEditingShipping(null); setShippingDialogOpen(true); }}
              className="bg-transparent text-primary shadow-none hover:bg-gray-100 hover:text-primary"
              >
                <MdAddHomeWork />
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
                      className="relative p-4 border rounded-md flex justify-between items-start shadow-sm hover:bg-accent transition-all duration-300"
                    >
                      <div className="text-sm space-y-1 text-gray-700">
                        <p><strong>Type:</strong> {detail.type}</p>
                        <p><strong>Address:</strong> {detail.address}</p>
                        <p><strong>City:</strong> {detail.city}</p>
                        <p><strong>Phone Number:</strong> {detail.phoneNumber}</p>
                        <p><strong>Country:</strong> {detail.country}</p>
                      </div>
                      <div className="flex flex-row gap-2 absolute bottom-2 right-2">
                        <Button 
                          title="Edit" 
                          size="sm"
                          onClick={() => onEdit(detail)}
                          className="bg-transparent text-primary shadow-none hover:bg-gray-200 hover:text-primary"
                        >
                          <FaEdit size={14} /> 
                        </Button>
                        <Button 
                          title="Delete" 
                          size="sm" 
                          onClick={() => onDelete(detail.type)}
                          className="bg-transparent text-primary shadow-none hover:bg-gray-200 hover:text-primary"
                        >
                          <AiFillDelete size={14} />
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
          <Card className="max-w-3xl mx-auto bg-transparent border-none shadow-none">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Order History</CardTitle>
              {/* <Button
                variant="destructive"
                disabled={currentUser.orders.length === 0}
                onClick={() => setConfirmAction("clearOrders")}
              >
                Clear History
              </Button> */}
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-auto">
              {currentUser.orders.length === 0 ? (
                <p className="text-gray-500 italic text-center py-4">You have no past orders.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-sm border rounded overflow-hidden">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left"></th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Items</th>
                        <th className="px-4 py-2 text-left">Total</th>
                        {/* <th className="px-4 py-2 text-left">Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {[...currentUser.orders].reverse().map((order, index) => (
                        <tr 
                          key={order.id} 
                          className="cursor-pointer transition-all duration-200 hover:text-gray-900 hover:bg-gray-100 ease-in-out"
                          onClick={() => { setSelectedOrderId(order.id); setViewDialogOpen(true); }}
                        >
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-4 py-2">{new Date(order.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                          <td className="px-4 py-2">{order.items.length}</td>
                          <td className="px-4 py-2 font-semibold">₹{order.total.toFixed(0)}</td>
                          {/* <td className="px-4 py-2 space-x-2">
                            <Button title="View Details" size="sm" variant="outline" onClick={() => { setSelectedOrderId(order.id); setViewDialogOpen(true); }}>
                              <FcViewDetails size={14} /> 
                            </Button>
                            <Button title="Delete" size="sm" variant="outline" onClick={() => { setSelectedOrderId(order.id); setConfirmAction("deleteOrder"); }}>
                              <AiFillDelete size={14} />
                            </Button>
                          </td> */}
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
  </div>
);
}
