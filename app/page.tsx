'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, User } from 'lucide-react';
import { products, Product } from '@/lib/shop_data';
import { useUserStore } from '@/lib/userStore';
import EmblaAutoScroll from '@/components/EmblaAutoScroll';
import Footer from '@/components/footer';

const BRAND_NAME = 'E-COMMERCE STORE';
const featuredProducts = products.slice(0, 12);

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900 font-sans">
    <Header />
    <main>
      <HeroSection />
      <FeaturedProductsSection products={featuredProducts} />
      <Testimonials />
      <NewsletterSection />
    </main>
    <Footer />
  </div>
);

const Header: React.FC = () => {
  const { currentUser } = useUserStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-amber-200/50 shadow-sm">
      <nav className="container flex items-center justify-between px-4 py-3 md:py-4 lg:px-8">
        <Link href="/" className="text-2xl lg:text-3xl font-extrabold text-amber-600 hover:text-amber-700 transition-colors">
          {BRAND_NAME}
        </Link>
        <div className="flex items-center gap-3 md:gap-5">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-md">
            <Link href="/shop">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <AnimatePresence>
            <Button
              variant="ghost"
              asChild
              className="text-gray-700 hover:text-amber-600 flex items-center gap-2 font-medium transition"
            >
              <Link href={currentUser ? "/account" : "/login"}>
                <User className="h-5 w-5" />
                <span>{currentUser ? currentUser.name : 'Login / Register'}</span>
              </Link>
            </Button>
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

const HeroSection: React.FC = () => (
  <section className="relative py-24 md:py-28 bg-gradient-to-r from-amber-100 to-pink-100 overflow-hidden">
    <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Elevate Your Wardrobe <br />
          <span className="text-amber-600">with Style</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-md">
          Experience the latest fashion trends, curated for your lifestyle.
        </p>
        <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 group">
          <Link href="/shop">
            Explore Collections
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="rounded-3xl overflow-hidden shadow-xl relative h-[450px] md:h-[550px]"
      >
        <Image
          src={products[0].image || '/fallback.jpg'}
          alt="Hero Product"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>
    </div>
  </section>
);

const FeaturedProductsSection: React.FC<{ products: Product[] }> = ({ products }) => (
  <section className="py-20 bg-transparent">
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
      <EmblaAutoScroll products={products} />
    </div>
  </section>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialItems = [
    {
      image: 'https://picsum.photos/160/160?random=1',
      text: '"We are extremely satisfied with the service and the quality of the products."',
      name: 'John Doe',
    },
    {
      image: 'https://picsum.photos/160/160?random=2',
      text: '"Never disappointed with the quality of the products and the service."',
      name: 'Jane Doe',
    },
    {
      image: 'https://picsum.photos/160/160?random=3',
      text: '"Highly recommend this store for quality and service."',
      name: 'Bob Smith',
    },
    {
      image: 'https://picsum.photos/160/160?random=4',
      text: '"Blown away by the service. I will definitely be back!"',
      name: 'Alice Johnson',
    },
    {
      image: 'https://picsum.photos/160/160?random=5',
      text: '"Best online experience I have had so far!"',
      name: 'Robert Brown',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonialItems.length]);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Our Clients Speak</h2>
          <p className="mt-2 text-lg text-gray-600">What our customers are saying about us</p>
          <div className="mt-10 flex flex-col items-center">
            <Image
              src={testimonialItems[currentIndex].image}
              alt={testimonialItems[currentIndex].name}
              width={160}
              height={160}
              className="rounded-full shadow-md"
            />
            <blockquote className="mt-4 text-md italic text-gray-700">
              {testimonialItems[currentIndex].text}
            </blockquote>
            <p className="mt-2 font-semibold text-lg text-gray-900">
              {testimonialItems[currentIndex].name}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-transparent py-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Subscribe to our newsletter</h2>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Get exclusive offers, updates, and more.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
            <Button
              type="submit"
              size="lg"
              className={`transition-all ${isSubscribed ? 'bg-green-600' : 'bg-amber-600 hover:bg-amber-700'} text-white`}
            >
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
          {isSubscribed && (
            <p className="mt-4 text-sm text-gray-600">
              You've successfully subscribed!
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;
