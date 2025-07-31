"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RotateCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, Type } from "@/lib/shop_data";

type ShopFiltersProps = {
  category: string[];
  setCategory: (value: string[]) => void;
  type: string[];
  setType: (value: string[]) => void;
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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-900 flex items-center justify-between">
        Filters
        <Button
          variant="ghost"
          title="Reset Filters"
          onClick={onReset}
          className="mt-2 transition-all duration-200"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="search" className="text-sm font-medium text-gray-700">
          Search :
        </label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border-gray-200 bg-white/50 pl-3 pr-10 py-2 focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category :
          </label>
          <div className="grid grid-cols gap-2">
            {Category.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${cat}`}
                  checked={category.includes(cat)}
                  onCheckedChange={(checked) =>
                    setCategory(
                      checked
                        ? [...category, cat]
                        : category.filter((c: string) => c !== cat)
                    )
                  }
                  className="border border-gray-300 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
                />
                <label htmlFor={`category-${cat}`} className="text-sm text-gray-700">
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-sm font-medium text-gray-700">
            Type :
          </label>
          <div className="grid grid-cols gap-2">
            {Type.map((ty) => (
              <div key={ty} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${ty}`}
                  checked={type.includes(ty)}
                  onCheckedChange={(checked) =>
                    setType(
                      checked
                        ? [...type, ty]
                        : type.filter((t: string) => t !== ty)
                    )
                  }
                  className="border border-gray-300 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
                />
                <label htmlFor={`type-${ty}`} className="text-sm text-gray-700">
                  {ty}
                </label>
              </div>
            ))}
          </div>
        </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price-range" className="text-sm font-medium text-gray-700">
          Price Range :
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <Slider
            title={`Price Range: ₹${priceRange[0]} - ₹${priceRange[1]}`}
            min={0}
            max={1500}
            step={10}
            value={priceRange}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
            className="w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
