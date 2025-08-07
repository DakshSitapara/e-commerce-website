'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { products, Product, Category } from '@/lib/shop_data';
import { useUserStore } from '@/lib/userStore';
import EmblaAutoScroll from "@/components/EmblaAutoScroll";
import Footer from '@/components/footer';

const BRAND_NAME = "E-COMMERCE STORE";
const featuredProducts = products.slice(0, 12);

interface FeaturedProductsSectionProps {
  products: Product[];
}

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
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-sm border-b border-amber-200/50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-3xl font-bold tracking-tight text-amber-600 hover:text-amber-700 transition-colors">
          {BRAND_NAME}
        </Link>
        <div className="flex items-center gap-6">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-md">
            <Link href="/shop">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <AnimatePresence>
            {currentUser ? (
              <Button
                variant="ghost"
                asChild
                className="text-gray-700 hover:text-amber-600 transition-colors flex items-center gap-2"
              >
                <Link href="/account" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hover:underline">{currentUser.name}</span>
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" asChild className="text-gray-700 hover:text-amber-600 transition-colors">
                <Link href="/login" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Login/Register</span>
                </Link>
              </Button>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

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
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-none">
            Elevate Your Wardrobe
            <br className="hidden md:block" />
            <span className="text-amber-600 block md:inline-block">with Style</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-md">
            Experience the latest fashion trends, carefully curated to bring you the best of the best.
          </p>
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white group">
            <Link href="/shop">
              Explore Our Collections
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
          <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={products[0].image || "/fallback.jpg"}
              alt="Hero Product"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ products }) => {

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
        <EmblaAutoScroll products={products} />
         </div>
    </section>
  );
};


const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialItems = [
    {
      image: 'https://picsum.photos/160/160?random=1',
      text: '"We are extremely satisfied with the service and the quality of the products we have received from this store."',
      name: 'John Doe',
    },
    {
      image: 'https://picsum.photos/160/160?random=2',
      text: '"I have been shopping with this store for a while and I have never been disappointed with the quality of the products and the service."',
      name: 'Jane Doe',
    },
    {
      image: 'https://picsum.photos/160/160?random=3',
      text: '"I would highly recommend this store to anyone looking for high quality products and excellent customer service."',
      name: 'Bob Smith',
    },
    {
      image: 'https://picsum.photos/160/160?random=4',
      text: '"I was blown away by the quality of the products and the service. I will definitely be back!"',
      name: 'Alice Johnson',
    },
    {
      image: 'https://picsum.photos/160/160?random=5',
      text: '"I have been shopping online for a while and I have never had a better experience than with this store."',
      name: 'Robert Brown',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % testimonialItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonialItems.length]);

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
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our Clients Speak
          </h2>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Hear directly from our satisfied clients.
          </p>
          <div className="mt-8 relative">
            <div className="flex flex-col items-center gap-4">
              <div className="h-40 w-40 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={testimonialItems[currentIndex].image}
                  alt={`Image of ${testimonialItems[currentIndex].name}`}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <blockquote className="mt-4 text-md text-gray-700 italic leading-relaxed">
                <span className="before:content-['\201C'] after:content-['\201D']">
                  {testimonialItems[currentIndex].text}
                </span>
              </blockquote>
              <p className="mt-2 font-semibold text-lg text-gray-900">
                {testimonialItems[currentIndex].name}
              </p>
            </div>
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
    }, 2000);
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Stay updated with our latest deals and promotions
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Subscribe to our newsletter and get access to exclusive discounts, new products, and more.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-amber-600 outline-none"
              required
            />
            <Button type="submit" size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
          {isSubscribed && (
            <p className="mt-4 text-sm text-gray-600">
              You have successfully subscribed to our newsletter.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;