'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { products, Product, Category } from '@/lib/shop_data';

const BRAND_NAME = "E-COMMERCE STORE";
const featuredProducts = products.slice(0, 6);

interface FeaturedProductsSectionProps {
  products: Product[];
}

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900 font-sans">
    <Header />
    <main>
      <HeroSection />
      <FeaturedProductsSection products={featuredProducts} />
      <NewsletterSection />
    </main>
    <Footer />
  </div>
);

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200/50">
    <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
      <Link href="/" className="text-3xl font-bold tracking-tight text-amber-600 hover:text-amber-700 transition-colors">
        {BRAND_NAME}
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="text-gray-700 hover:text-amber-600">
          <Link href="/shop">Shop</Link>
        </Button>
        <Button variant="ghost" asChild className="text-gray-700 hover:text-amber-600">
          <Link href="/categories">Categories</Link>
        </Button>
        <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
          <Link href="/cart"><ShoppingBag className="h-5 w-5" /></Link>
        </Button>
      </div>
    </nav>
  </header>
);

const HeroSection: React.FC = () => (
  <section className="relative py-24 md:py-32 bg-gradient-to-r from-amber-100 to-pink-100 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-[url('https://subtle-pattern.png')] bg-cover opacity-10" />
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Elevate Your Wardrobe with
            <br className="hidden md:block" />
            <span className="text-amber-600 block md:inline-block">E-COMMERCE </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Discover curated collections that blend elegance and modernity, crafted for the trendsetters.
          </p>
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white group">
            <Link href="/shop">
              Start Shopping
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={products[0]?.image || "https://placeholder.co/600x600"}
              alt="Hero Product"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">{products[0]?.name || "Featured Item"}</h3>
              <p className="text-amber-400">₹{products[0]?.price || "999"}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Bestsellers</h2>
          <p className="mt-4 text-lg text-gray-600">Explore our most loved collections.</p>
        </motion.div>
        <div className="relative overflow-hidden">
          <div className="relative h-[450px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex justify-center items-center"
              >
                <Link href={`/shop/${products[currentIndex].id}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-sm w-full">
                    <Image
                      src={products[currentIndex].image}
                      alt={products[currentIndex].name}
                      width={300}
                      height={300}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">{products[currentIndex].name}</h3>
                      <p className="text-amber-400">₹{products[currentIndex].price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5 text-amber-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5 text-amber-600" />
          </Button>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Join the E-COMMERCE Community</h2>
          <p className="mt-4 text-lg text-gray-600">
            Subscribe for exclusive offers, new arrivals, and style tips.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-amber-600 outline-none"
            />
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white">{BRAND_NAME}</h3>
          <p className="mt-2 text-sm">Crafting elegance for the modern trendsetter.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            {Category.map((cat: string) => (
              <li key={cat}>
                <Link href={`/shop/${cat.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm">
        <p>&copy; 2025 {BRAND_NAME}. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default HomePage;