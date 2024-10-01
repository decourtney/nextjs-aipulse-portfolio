"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      height="5rem"
      shouldHideOnScroll
    >
      {/* Center the Brand */}
      <NavbarContent justify="center" className="md:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="font-bold text-3xl tracking-widest text-indigo-400 hover:text-white transition-all">
            PulseArt
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar Links */}
      <NavbarContent justify="end" className="hidden md:flex space-x-8">
        <Link
          href="/"
          className="hover:text-indigo-400 transition duration-200"
        >
          <p>Home</p>
        </Link>
        <Link
          href="/gallery"
          className="hover:text-indigo-400 transition duration-200"
        >
          <p>Gallery</p>
        </Link>
        <Link
          href="/contact"
          className="hover:text-indigo-400 transition duration-200"
        >
          <p>Contact</p>
        </Link>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/" onPress={handleClose}>
            <p className="text-white hover:text-indigo-400 transition">Home</p>
          </Link>
          <Link href="/gallery" onPress={handleClose}>
            <p className="text-white hover:text-indigo-400 transition">
              Gallery
            </p>
          </Link>
          <Link href="/about" onPress={handleClose}>
            <p className="text-white hover:text-indigo-400 transition">About</p>
          </Link>
          <Link href="/contact" onPress={handleClose}>
            <p className="text-white hover:text-indigo-400 transition">
              Contact
            </p>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
