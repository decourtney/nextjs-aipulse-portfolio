"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { use, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const containerVariants = {
    variants: {
      enter: {
        transformOrigin: "top",
        // scaleY: 1,
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
      exit: {
        transformOrigin: "top",
        // scaleY: 0,
        opacity: 0,
        transition: { delay: 0.3, staggerChildren: 0.1 },
      },
    },
  };

  const itemVariants = {
    enter: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.1 } },
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      height="5rem"
      shouldHideOnScroll
      isBlurred={false}
      className="text-foreground bg-opacity-80"
    >
      {/* Center the Brand */}
      <NavbarContent justify="center" className="md:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="font-bold text-3xl tracking-widest transition-all">
            PulseArt
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar Links */}
      <NavbarContent justify="end" className="hidden md:flex space-x-8 ">
        <NavbarItem>
          <Link href="/" className="transition duration-200">
            <p className="font-bold">Home</p>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/gallery" className="transition duration-200">
            <p className="font-bold">Gallery</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu
        className="flex-col justify-center items-center pb-[8rem] gap-y-12"
        motionProps={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <NavbarMenuItem>
            <Link href="/" onPress={handleClose}>
              <p className="font-bold text-5xl transition duration-200">Home</p>
            </Link>
          </NavbarMenuItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <NavbarMenuItem as={motion.div}>
            <Link href="/gallery" onPress={handleClose}>
              <p className="font-bold text-5xl transition duration-200">
                Gallery
              </p>
            </Link>
          </NavbarMenuItem>
        </motion.div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
