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
    <div className="py-10 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-5">
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="hidden lg:flex justify-between w-full">
          <div className="flex flex-col">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-2">
              <Link href="" className="hover:scale-105 duration-200 transition-all">About Us</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Careers</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Affiliates</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Blog</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-2">
              <Link href="" className="hover:scale-105 duration-200 transition-all">New Arrivals</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Accessories</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Men</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Women</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-2">
              <Link href="" className="hover:scale-105 duration-200 transition-all">Customer Service</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">My Account</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Find a Store</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Legal & Privacy</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all">Gift Card</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-medium text-lg">SOCIAL</h1>
            <div className="flex flex-col gap-2">
              <Link href="" className="hover:scale-105 duration-200 transition-all flex items-center gap-1"><FaGithub />GitHub</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all flex items-center gap-1"><SiGmail />Email</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all flex items-center gap-1"><FaLinkedin />Linkedin</Link>
              <Link href="" className="hover:scale-105 duration-200 transition-all flex items-center gap-1"><FaXTwitter />Twitter</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-2">
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
          <span className="font-semibold">Secure Payments</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 mt-16 text-center text-sm text-muted-foreground *:[a]:hover:text-primary text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:text-blue-500">
        &copy; {`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}. All rights reserved. You agree to our <a href="#">Terms of Service</a>{" "} and <a href="#">Privacy Policy</a>.
      </div>
      </div>
  );
};

export default Footer;