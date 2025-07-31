"use client";

import { useState } from "react";
import { Star, User,  } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/shop_data";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterest } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const tabs = ["Product Info", "Reviews", "Share"];

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("Product Info");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex justify-center">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 text-base font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "Product Info" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <p className="px-2 py-1 bg-primary text-white rounded-full">
                {product.category}
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-full">
                {product.type}
              </p>
            </div>
            <p className="text-lg text-gray-600">{product.description}</p>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({product.rating} based on 102 reviews)
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 flex justify-between">
                <div className="flex items-center space-x-4">
                  <User className="w-12 h-12" />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      "Amazing product quality and fast delivery. Highly
                      recommend!"
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-x-2">
                  <span className="text-xs text-gray-500">01/01/2023</span>
                  <div className="flex">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between">
                <div className="flex items-center space-x-4">
                  <User className="w-12 h-12" />
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">
                      "Perfect fit and beautiful design. Will buy again."
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-x-2">
                  <span className="text-xs text-gray-500">02/02/2023</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Share your thoughts about the product..."
                    className="w-full min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-gray-300 cursor-default"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button type="button" className="items-center">
                    Submit Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "Share" && (
          <div className="flex items-center justify-center space-x-4 mt-2">
            <Button
              type="button"
              variant="ghost"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-600 p-2 transition duration-150 ease-in-out"
            >
              <FaFacebook className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center space-x-2 text-black p-2 transition duration-150 ease-in-out"
            >
              <BsTwitterX className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center space-x-2 p-2 transition duration-150 ease-in-out"
            >
              <FcGoogle className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center space-x-2 text-green-500  hover:text-green-500 p-2 transition duration-150 ease-in-out"
            >
              <IoLogoWhatsapp className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center space-x-2 text-red-600 hover:text-red-600 p-2 transition duration-150 ease-in-out"
            >
              <FaPinterest className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
