"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserStore } from "@/lib/userStore";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import { ShoppingBagIcon, ShoppingCart, Heart, ShoppingBag } from "lucide-react";
import { CategoryColor, TypeColor } from "@/lib/shop_data";

type BillingFormData = {
  shippingAddressType: string;
  paymentMethod: string;
};

export default function BillingPage() {
  const router = useRouter();
  const { currentUser, clearCart } = useUserStore();
  const cart = currentUser?.cart || [];
  const shippingDetails = currentUser?.shippingDetails || [];
  const wishlistCount = currentUser?.wishlist?.length || 0;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BillingFormData>({
    defaultValues: {
      shippingAddressType: shippingDetails[0]?.type || "",
      paymentMethod: "card",
    },
  });

  const handlePlaceOrder = async (data: BillingFormData) => {
    if (!currentUser) {
      toast.error("Please log in to place an order.");
      router.push("/login");
      return;
    }

    try {
      localStorage.setItem("lastCart", JSON.stringify(cart));
      await clearCart();
      toast.success("Order placed!");
      router.push("/checkout");
    } catch (error) {
      toast.error("Error placing order.");
      console.error(error);
    }
  };

  const renderEmptyCart = () => (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <Link href="/shop">
            <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 px-4">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Checkout</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push("/shop")}>
              <ShoppingBagIcon className="mr-1 h-4 w-4" /> Shop
            </Button>
            <Button variant="outline" onClick={() => router.push("/cart")}>
              <ShoppingCart className="mr-1 h-4 w-4" /> Cart ({cart.length})
            </Button>
            <Button variant="outline" onClick={() => router.push("/wishlist")}>
              <Heart className="mr-1 h-4 w-4" /> Wishlist ({wishlistCount})
            </Button>
            <Button
                onClick={handleSubmit(handlePlaceOrder)}
                disabled={isSubmitting || !shippingDetails.length}
                className="text-white py-3"
              >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="mt-10 max-w-4xl mx-auto">
        {cart.length === 0 ? renderEmptyCart() : (
          <form onSubmit={handleSubmit(handlePlaceOrder)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cart.map((product) => (
                  <div key={product.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover shadow"
                      loader={() => product.image}
                    />
                    <div className="flex-1">
                      <h2 className="font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
                      <div className="mt-2 flex gap-2">
                        <Badge className={CategoryColor(product.category)}>{product.category}</Badge>
                        <Badge className={TypeColor(product.type)}>{product.type}</Badge>
                      </div>
                    </div>
                    <Button type="button" variant="outline" onClick={() => router.push('/cart')}>Edit</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Label className="whitespace-nowrap">Shipping Address :</Label>

                  {shippingDetails.length > 0 ? (
                    <>
                      <Select
                          onValueChange={(value) => {
                            setValue("shippingAddressType", value);
                          }}
                          defaultValue={shippingDetails[0]?.type}
                        >
                          <SelectTrigger className="min-w-[300px] text-left">
                            <SelectValue placeholder="Select an address" />
                          </SelectTrigger>

                          <SelectContent>
                            {shippingDetails.map((detail) => (
                              <SelectItem key={detail.type} value={detail.type}>
                                {detail.type}: {detail.address}, {detail.city}, {detail.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                      <Button
                        type="button"
                        variant="outline"
                        className="shrink-0"
                        onClick={() => router.push("/account")}
                      >
                        Edit/Add Address
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-red-500">No shipping address available.</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="shrink-0"
                        onClick={() => router.push("/account")}
                      >
                        Add Address
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap space-x-3">
                    <Label className="mb-2 block">Payment Method :</Label>
                  <RadioGroup
                    defaultValue="card"
                    onValueChange={(value) => setValue("paymentMethod", value)}
                    className="flex flex-row gap-6"
                  >
                    {["card", "cash", "upi"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <RadioGroupItem value={method} id={method} />
                        <Label htmlFor={method} className="capitalize">
                          {method === "card"
                            ? "Credit/Debit Card"
                            : method === "cash"
                            ? "Cash on Delivery"
                            : "UPI"}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <input
                    type="hidden"
                    {...register("paymentMethod", { required: true })}
                  />
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-500">Please select a payment method.</p>
                  )}
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{cart.reduce((acc, item) => acc + item.price, 0).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
