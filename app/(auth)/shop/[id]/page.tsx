"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/shop_data";
import { Button } from "@/components/ui/button";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const id = params.id;

  if (!product) return <div>Product not found  <Button onClick={() => router.push(`/shop`)}>Go back</Button></div>;

  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
        
    </div>
  );
}
