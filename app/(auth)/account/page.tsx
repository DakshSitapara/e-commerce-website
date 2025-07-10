"use client";

import React , { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/auth";

export default function AccountPage() {
 
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [address, setAddress] = useState<string>()
    const [password, setPassword] = useState<string>()
    const router = useRouter();
  return (
    <div className="flex flex-col items-center mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <Button onClick={() => router.push("/shop")}>Shop</Button>
      <Button variant={"destructive"} onClick={handleLogout}>
        <LogOut /> Logout
      </Button>
    </div>
  );
}
