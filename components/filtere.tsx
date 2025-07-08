"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, RotateCw } from "lucide-react";
import { products, Category, Type } from "@/lib/shop_data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Filter() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || product.category === category) &&
    (type === "all" || product.type === type)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                className="rounded-md border border-gray-300 pr-4 py-2"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="flex items-center space-x-2">
                <span className="text-sm font-medium">Category:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {Object.values(Category).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={type}
              onValueChange={setType}
            >
              <SelectTrigger className="flex items-center space-x-2">
                <span className="text-sm font-medium">Type:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {Object.values(Type).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              className="flex items-center"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setType("all");
              }}
            >
              <RotateCw className="h-5 w-5"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
