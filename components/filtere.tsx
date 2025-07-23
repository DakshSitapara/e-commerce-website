"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RotateCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, Type } from "@/lib/shop_data";

type ShopFiltersProps = {
  category: string;
  setCategory: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  search: string;
  setSearch: (value: string) => void;
  onReset: () => void;
};

const ShopFilters: React.FC<ShopFiltersProps> = ({
  category,
  setCategory,
  type,
  setType,
  priceRange,
  setPriceRange,
  search,
  setSearch,
  onReset,
}) => {
  return (
    <div className="flex flex-row gap-6 mb-4 flex-wrap">
      <h2 className="text-xl font-bold text-gray-900 col-span-full">Filters :</h2>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category:
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="shadow-none border-none">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.values(Category).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="type" className="text-sm font-medium text-gray-700">
          Type:
        </label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="type" className="shadow-none border-none">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.values(Type).map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="price-range" className="text-sm font-medium text-gray-700">
          Price Range:
        </label>
        <div className="flex items-center gap-2">
          ₹
          <Input
            type="price"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            className="w-[30px] border-none shadow-none pr-4 py-2 px-0"
          />
          <Slider
            title={`Price Range: ₹${priceRange[0]} - ₹${priceRange[1]}`}
            min={0}
            max={1500}
            step={10}
            value={priceRange}
                onValueChange={(value: [number, number]) => setPriceRange(value)}
            className="w-[250px] cursor-pointer"
          />
          ₹
          <Input
            type="price"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
            className="w-[30px] border-none shadow-none pr-4 py-2 px-0"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="search" className="text-sm font-medium text-gray-700">
          Search:
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pr-4 py-2"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="flex justify-end col-span-full">
        <Button
          variant="ghost"
          title="Reset Filters"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ShopFilters;
