"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { products} from "@/lib/shop_data";
import ShopNav from "@/components/ShopNav";
import Footer from "@/components/footer";
import EmblaAutoScroll from "@/components/EmblaAutoScroll";
import ProductCarousel from "@/components/SlidingProduct";
import ShopFilters from "@/components/filtere";

export default function ShopPage() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category.length === 0 || category.includes(product.category);
    const matchesType = type.length === 0 || type.includes(product.type);
    const matchesMinPrice = product.price >= priceRange[0];
    const matchesMaxPrice = product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesType && matchesMinPrice && matchesMaxPrice;
  });

  const handleResetFilters = () => {
    setCategory([]);
    setType([]);
    setPriceRange([0, 1500]);
    setSearch("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')] bg-cover bg-center">
      <nav className="fixed top-0 z-20 w-full bg-[#131921] shadow-md">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <ShopNav />
        </div>
      </nav>

      <main className="mx-auto max-w-8xl px-4 pt-20 pb-8 flex flex-row">
        <div
          className={`w-auto p-6 bg-transparent border-none shadow-none transition-transform duration-300 sticky top-20 self-start sm:translate-x-0 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
          }`}
        >
          <ShopFilters
            category={category}
            setCategory={setCategory}
            type={type}
            setType={setType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            search={search}
            setSearch={setSearch}
            onReset={handleResetFilters}
          />
        </div>

        <div className="flex-1 px-4 sm:pl-8 lg:pl-12">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="sm:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="mb-12">
            <ProductCarousel />
          </div>

          <div className="flex flex-row flex-wrap overflow-auto w-[1100px] gap-4">
            {filteredProducts.length > 0 ? (
              <EmblaAutoScroll products={filteredProducts} />
            ) : (
              <div className="w-full font-black text-xl sm:text-2xl text-center">
                No products found.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
