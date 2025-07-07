"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccountPage() {

    const router = useRouter();
  return(
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <Button onClick={() => router.push("/shop")}>Shop</Button>
    </div>
  );

}