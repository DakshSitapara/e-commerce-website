"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub,FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleJoin = () => {
    if (email.trim() === "") {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };
  
  return (
    <footer className="py-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-5">
      <div className="flex flex-col lg:flex-row gap-24 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-32 2xl:gap-48">
        <div className="hidden lg:flex justify-between w-full gap-8 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <Link href="" className="hover:scale-105 duration-200 transition-all">About Us</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Careers</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Affiliates</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Blog</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-lg">SHOP</h1>
            <Link href="" className="hover:scale-105 duration-200 transition-all">New Arrivals</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Men</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Women</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Kid</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">All Products</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-lg">HELP</h1>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Customer Service</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">My Account</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Find a Store</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Legal & Privacy</Link>
            <Link href="" className="hover:scale-105 duration-200 transition-all">Gift Card</Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-24 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-32 2xl:gap-48">
          <div className="flex flex-col gap-2 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-5/6">
            <h1 className="font-medium text-lg">SUBSCRIBE</h1>
            <p>
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex">
              <Input
                type="text"
                placeholder="Email address"
                className="p-0 border-none shadow-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="bg-transparent text-black shadow-none hover:bg-[#131921] hover:text-white"
                onClick={handleJoin}
              >
                JOIN
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold">Secure Payments</span>
            <div className="flex items-center gap-1 mt-2 text-center text-sm text-muted-foreground">
              &copy; 2025. All rights reserved. By continuing to use this website, you agree to our
              <a href="#" className="hover:text-primary underline underline-offset-4 text-blue-500">Terms of Service</a>
              and
              <a href="#" className="hover:text-primary underline underline-offset-4 text-blue-500">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
