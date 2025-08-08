"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { IoLogoWhatsapp } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaPinterest } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <>
    <Image
      src="https://crafthica-nextjs.vercel.app/_next/image?url=%2Fimages%2Ffooter-shape.png&w=3840&q=75"
      alt="Image of footer shape"
      width={3840}
      height={2160}
      className="w-auto h-auto"
    />
    <footer className="bg-[#FBF0DF] text-gray-700 py-16 px-4 sm:px-6 lg:px-16 relative">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-1 flex flex-col gap-5">
          <Link href="#">
            <h1 className="text-3xl font-bold text-gray-800">Fashionista</h1>
          </Link>
          <p className="text-sm">
            Discover the latest trends in fashion with our exclusive clothing
            collections.
          </p>
          <div className="flex items-center justify-start">
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
              className="flex items-center space-x-2 text-green-500 hover:text-green-500 p-2 transition duration-150 ease-in-out"
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
          <p className="text-xs  text-gray-500">
            © 2025 Fashionista, Inc. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg text-gray-800">Shop</h3>
          <Link href="/shop" className="hover:underline">
            <span className="text-gray-600">New Arrivals</span>
          </Link>
          <Link href="/shop" className="hover:underline">
            <span className="text-gray-600">Best Sellers</span>
          </Link>
          <Link href="/shop" className="hover:underline">
            <span className="text-gray-600">Men</span>
          </Link>
          <Link href="/shop" className="hover:underline">
            <span className="text-gray-600">Women</span>
          </Link>
          <Link href="/shop" className="hover:underline">
            <span className="text-gray-600">Kids</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-gray-800">Customer Care</h3>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Help & Support</span>
          </Link>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Returns & Exchanges</span>
          </Link>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Shipping Information</span>
          </Link>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Track Order</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-gray-800">Company</h3>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">About Us</span>
          </Link>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Careers</span>
          </Link>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Press</span>
          </Link>
          <Link href="#" className="hover:underline">
            <span className="text-gray-600">Sustainability</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-gray-800">Contact</h3>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-gray-600" />
            <span>+1234 567 890</span>
          </div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-gray-600" />
            <span>support@fashionista.com</span>
          </div>
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-gray-600 mt-1 flex-shrink-0" />
            <span>456 Fashion Avenue, Style City, Country</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;