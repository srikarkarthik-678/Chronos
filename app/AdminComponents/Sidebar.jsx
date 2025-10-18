"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="hidden md:flex w-64 h-[100vh] border border-[#9b6b35]/70 rounded-xl shadow-md p-3 ">
        <div className="text-white flex flex-col gap-4 w-full items-center h-[100px]">
          <Link href="/">
            <div className="font-Pop bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-3xl mt-4">
              Chronos
            </div>
          </Link>
          <div className="line h-[2px] border border-gray-700 w-full mt-3"></div>
          <div className="text-lg hover:text-[#ffdf9e] cursor-pointer mt-4 font-Ciz" onClick={handleRefresh}>
            New Chat
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center p-3">
        <Menu size={28} className="text-white cursor-pointer" onClick={() => setIsOpen(true)}/>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a1a]/95 border-r border-[#9b6b35]/70 shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        <div className="flex justify-end p-4">
          <X size={28} className="text-white cursor-pointer" onClick={() => setIsOpen(false)}/>
        </div>
        <div className="flex flex-col gap-6 px-6 text-white mt-4">
          <Link href="/">
            <div className="font-Pop bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-2xl">
              Chronos
            </div>
          </Link>
          <div className="text-lg hover:text-[#ffdf9e] cursor-pointer" onClick={handleRefresh}>
            New Chat
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
