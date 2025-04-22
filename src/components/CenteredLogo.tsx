import { useEffect, useState } from "react";
import { motion } from "@/lib/framer";
import { Link } from "react-router-dom";

interface CenteredLogoProps {
  scrollY: number;
}

const CenteredLogo = ({ scrollY }: CenteredLogoProps) => {
  // Calculate opacity based on scroll position
  // Logo should fade out as user scrolls down
  const opacity = Math.max(0, 1 - scrollY / 200);
  
  // Calculate scale based on scroll position
  // Logo should shrink as user scrolls down
  const scale = Math.max(0.5, 1 - scrollY / 400);
  
  // Don't render if completely faded out
  if (opacity === 0) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-40 pointer-events-none"
      style={{ opacity }}
    >
      <motion.div
        style={{ scale }}
        className="text-center"
      >
        <h1 
          className="text-7xl md:text-9xl font-logo font-medium text-omnis-white"
          style={{ letterSpacing: "-1px" }}
        >
          OMNIS
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default CenteredLogo;
