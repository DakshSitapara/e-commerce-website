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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(order.date).toLocaleTimeString()}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <div className="grid grid-cols-1 gap-1 text-sm">
              <p><span className="font-medium">Type:</span> {order.shippingAddress?.type}</p>
              <p><span className="font-medium">Address:</span> {order.shippingAddress?.address}</p>
              <p><span className="font-medium">City:</span> {order.shippingAddress?.city}</p>
              <p><span className="font-medium">Country:</span> {order.shippingAddress?.country}</p>
              <p><span className="font-medium">Phone:</span> {order.shippingAddress?.phoneNumber}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mt-4 mb-2">Items</h3>
            <ul className="space-y-2">
              {order.items.map((item: any) => (
                <li key={item.id} className="flex items-center gap-4 border rounded p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                    loader={() => item.image}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right text-lg font-bold">
            Total: ₹{order.total.toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
