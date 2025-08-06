'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, ArrowRight, Shirt, Sparkles, Undo2, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, Product, Category } from '@/lib/shop_data';

const BRAND_NAME = "E-Commerce Store";
const heroProducts = [products[0], products[1], products[2]];
const featuredProducts = products.slice(3, 7);

export default function HomePage() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -80]);
  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white font-sans antialiased">
      <Header />
      <main>
        <HeroSection products={heroProducts} parallaxY={parallaxY} />
        <FeaturesSection />
        <FeaturedProductsSection products={featuredProducts} />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-indigo-500/20 bg-gray-900/95 backdrop-blur-xl">
    <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
      <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white transition-colors hover:text-indigo-400">
        <span className="text-indigo-400">{BRAND_NAME.slice(0, 5)}</span>
        <span>{BRAND_NAME.slice(5)}</span>
      </Link>
      <div className="hidden items-center gap-10 text-sm font-medium md:flex">
        <Link href="/shop" className="relative text-gray-300 transition-colors hover:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full">Shop</Link>
        <Link href="/categories" className="relative text-gray-300 transition-colors hover:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full">Categories</Link>
        <Link href="/about" className="relative text-gray-300 transition-colors hover:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full">About Us</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" passHref><Button variant="ghost" className="text-gray-300 hover:text-indigo-400">Log In</Button></Link>
        <Link href="/register" passHref><Button className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:shadow-indigo-400/50">Register</Button></Link>
        <Link href="/cart" passHref><Button variant="outline" size="icon" className="border-indigo-500/50 text-gray-300 hover:bg-indigo-900/50"><ShoppingCart className="h-5 w-5" /></Button></Link>
      </div>
    </nav>
  </header>
);

const HeroSection = ({
  products,
  parallaxY,
}: {
  products: Product[];
  parallaxY: any;
}) => (
  <section className="relative bg-gradient-to-r from-indigo-900/50 to-purple-900/50 overflow-hidden py-32">
    <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[url('https://grainy-texture.png')] bg-cover opacity-10 mix-blend-overlay" />
    </motion.div>
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Unleash Your{" "}
            <span className="text-indigo-400">Signature Style</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-lg">
            Redefine fashion with our bold, avant-garde collections designed for
            the fearless.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/shop" passHref>
              <Button
                size="lg"
                className="bg-indigo-500 hover:bg-indigo-600 text-white group shadow-2xl hover:shadow-indigo-400/50 transform hover:-translate-y-2 transition-all duration-500"
              >
                Shop Now{" "}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link href="/categories" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-400 text-indigo-400 hover:bg-indigo-900/50"
              >
                Explore Categories
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="lg:col-span-3 relative h-[600px]"
        >
          <div className="absolute inset-0 grid grid-cols-3 gap-4 transform rotate-3">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                className="relative rounded-3xl overflow-hidden shadow-none group"
                whileHover={{ rotate: -3, scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover transition-all duration-500 group-hover:filter group-hover:brightness-105 group-hover:contrast-110"
                  style={{
                    clipPath:
                      index === 0
                        ? "polygon(0 0, 100% 0, 85% 100%, 0 100%)"
                        : index === 1
                        ? "circle(50%)"
                        : "polygon(20% 0, 100% 0, 80% 100%, 0 100%)",
                  }}
                />
                <div className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const features = [
  { icon: Shirt, title: 'Premium Fabrics', description: 'Crafted with eco-friendly, high-quality materials for unmatched comfort.' },
  { icon: Sparkles, title: 'Trendsetting Designs', description: 'Curated collections that blend classic and contemporary styles.' },
  { icon: Undo2, title: 'Hassle-Free Returns', description: 'Shop confidently with our flexible, customer-first return policy.' },
];

const FeaturesSection = () => (
  <section className="py-24 sm:py-32 bg-gray-900">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Why Choose {BRAND_NAME}?</h2>
        <p className="mt-4 text-lg text-gray-300">Experience the difference with our commitment to quality and style.</p>
      </motion.div>
      <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-white shadow-2xl transform transition-transform hover:scale-110">
              <feature.icon className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-base text-gray-300 px-6">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedProductsSection = ({ products }: { products: Product[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section className="py-24 sm:py-32 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Collections</h2>
          <p className="mt-4 text-lg text-gray-300">Explore our latest arrivals and bestsellers.</p>
        </motion.div>
        <div className="mt-16 relative h-[600px] perspective-1000">
          {products.map((product, index) => {
            const offset = index - currentIndex;
            const isActive = offset === 0;
            return (
              <motion.div
                key={product.id}
                className="absolute inset-0 flex justify-center items-center"
                initial={{ opacity: 0, x: 200, rotateY: 45 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  x: (offset % 4) * 300,
                  rotateY: isActive ? 0 : (offset % 4) * 45,
                  z: isActive ? 100 : -100,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ display: Math.abs(offset) < 4 ? 'block' : 'none' }}
              >
                <Link href={`/shop/${product.id}`} className="flex flex-col items-center">
                  <div className="relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-96 object-cover rounded-3xl shadow-2xl transition-all duration-700"
                      style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 90%, 0 100%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                      <p className="text-indigo-300">₹{product.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          <Button variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800/80 text-white border-indigo-500/50 shadow-md" onClick={prevSlide}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800/80 text-white border-indigo-500/50 shadow-md" onClick={nextSlide}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-12 text-center">
          <Link href="/shop" passHref>
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white group shadow-lg hover:shadow-indigo-400/50">
              Explore Products <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="bg-gradient-to-b from-gray-900 to-indigo-950 py-24 sm:py-32">
    <div className="container mx-auto px-4 md:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What Our Customers Say</h2>
        <p className="mt-4 text-lg text-gray-300">Hear from those who love {BRAND_NAME}.</p>
      </motion.div>
      <motion.figure
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 max-w-3xl mx-auto"
      >
        <blockquote className="text-xl font-semibold leading-9 text-white sm:text-2xl sm:leading-10">
          <p className="before:content-['“'] before:text-3xl before:text-indigo-400 before:mr-2 after:content-['”'] after:text-3xl after:text-indigo-400 after:ml-2">
            {BRAND_NAME} has transformed my wardrobe. The quality is exceptional, and their designs are always on point. I'm a customer for life!
          </p>
        </blockquote>
        <figcaption className="mt-10">
          <div className="relative mx-auto h-14 w-14 rounded-full ring-2 ring-indigo-400 ring-offset-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Customer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="mt-4 flex flex-col items-center justify-center text-base">
            <div className="font-semibold text-white">Priya Sharma</div>
            <div className="text-gray-300">Loyal Customer</div>
          </div>
        </figcaption>
      </motion.figure>
    </div>
  </section>
);

const CtaSection = () => {
  const [email, setEmail] = useState('');
  return (
    <section className="bg-gray-900 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-20 shadow-2xl rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-32">
          <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
            <circle cx={512} cy={512} r={512} fill="url(#gradient-cta)" fillOpacity="0.7" />
            <defs><radialGradient id="gradient-cta"><stop stopColor="#ffffff" /><stop offset={1} stopColor="#A855F7" /></radialGradient></defs>
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Exclusive Offer: <br /> 15% Off Your First Order</h2>
            <p className="mt-6 text-lg leading-8 text-gray-100">Join our newsletter for exclusive deals, early access to collections, and style tips.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-800 text-white"
              />
              <Button size="lg" className="bg-white hover:bg-gray-100 text-indigo-600 shadow-md">Sign Up</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400">
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-2">{BRAND_NAME}</h3>
          <p className="text-sm">Discover Your Style. Redefine Your Wardrobe.</p>
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-white mb-4">Shop By Category</h4>
          <ul className="space-y-2 text-sm">
            {Category.map((cat: string) => (
              <li key={cat}>
                <a href={`/shop/${cat.toLowerCase()}`} className="hover:text-indigo-400 transition-colors">{cat}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-indigo-400 transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
        <p>&copy; 2025 {BRAND_NAME}. All Rights Reserved. Made with <span className="text-indigo-400">♥</span> in Surat, India.</p>
      </div>
    </div>
  </footer>
);