"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserStore } from "@/lib/userStore";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  orderId: string | null;
};

export function OrderDetailDialog({ open, onClose, orderId }: Props) {
  const { currentUser } = useUserStore();
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!orderId || !currentUser?.orders) {
      setOrder(null);
      return;
    }

    const foundOrder = currentUser.orders.find((o) => o.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId, currentUser]);

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <section className="bg-white rounded-lg p-4 space-y-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Billing Information</h3>
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
              <li>
                <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}
              </li>
              <li>
                <span className="font-medium">Time:</span> {new Date(order.date).toLocaleTimeString()}
              </li>
              <li>
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg p-4 space-y-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
              <li>
                <span className="font-medium">Type:</span> {order.shippingAddress?.type}
              </li>
              <li>
                <span className="font-medium">Address:</span> {order.shippingAddress?.address}
              </li>
              <li>
                <span className="font-medium">City:</span> {order.shippingAddress?.city}
              </li>
              <li>
                <span className="font-medium">Country:</span> {order.shippingAddress?.country}
              </li>
              <li>
                <span className="font-medium">Phone:</span> {order.shippingAddress?.phoneNumber}
              </li>
            </ul>
          </section>
        </div>

        <section className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Items</h3>
          <ul className="space-y-3">
            {order.items.map((item: any) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-3 border-b border-gray-200 last:border-b-0"
              >
                <div className="min-w-[60px] min-h-[60px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                    loader={() => item.image}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Type: {item.type}</p>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-gray-50 p-4 border-t border-gray-200 text-right text-xl font-bold text-gray-800">
          <div className="flex flex-col">
            {order.total / 0.9 > 1000 && (
              <>
                <span className=" text-sm text-gray-700">Subtotal :₹{(order.total / 0.9).toFixed(0)}</span>
                <span className="text-green-600 text-sm">
                  You got 10% discount
                </span>
              </>
            )}
            <span>Total: ₹{order.total.toFixed()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
