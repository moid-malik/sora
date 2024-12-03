"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  const checkLoginStatus = () => {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    const localStorageUser = localStorage.getItem('user');
    setIsLoggedIn(!!userCookie || !!localStorageUser);
  };

  useEffect(() => {
    checkLoginStatus();

    const intervalId = setInterval(checkLoginStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET'
      });
  
      if (response.ok) {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-lg font-bold">Sora</div>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Portfolio
          </Link>
          <Link href="/blog" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Blog
          </Link>
          <Link href="/profile" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Profile
          </Link>
          <Link href="/contact" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Contact
          </Link>
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
              <Link href="/profile/create-blog">
                <Button className="mx-1" variant="outline">
                  Upload a Blog
                </Button>
              </Link>
                <Button onClick={handleLogout} className="mx-1" variant="destructive">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="mx-1" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="mx-1" variant="outline">
                    Signup
                  </Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>

        <div className="md:hidden">
          <span className="mx-2">
            <ModeToggle />
          </span>
          <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger onClick={() => setOpen(true)}>
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className="font-bold my-4">Sora</SheetTitle>
      <SheetDescription>
        <div className="flex flex-col gap-6">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>Portfolio</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <div>
            {isLoggedIn ? (
              <div className="flex flex-col gap-3 max-w-36 mx-auto">
                <Link href="/profile/create-blog" onClick={() => setOpen(false)}>
                  <Button className="mx-1" variant="outline">
                    Upload a Blog
                  </Button>
                </Link>
                <Button 
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }} 
                  className="mx-1" 
                  variant="destructive"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="mx-1" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="mx-1" variant="outline">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
