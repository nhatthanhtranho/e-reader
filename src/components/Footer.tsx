"use client";

import React from "react";
import Image from "next/image";
import { formatLink } from "../../utils/formatLink";

interface PropTypes {
  className?: string;
}

const Footer: React.FC<PropTypes> = () => {
  return (
    <footer className="bg-[#303030] h-64 relative flex items-center justify-center overflow-hidden">
      {/* Trống đồng xoay */}
      <div className="absolute left-1/2 top-1/2 w-[1800px] h-[1800px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <Image
          src={formatLink("/trongdong.png")}
          alt="Trống đồng quay"
          fill
          className="rotate opacity-15"
          style={{ objectFit: "contain" }}
          priority={false}
        />
      </div>
    </footer>
  );
};

export default Footer;
