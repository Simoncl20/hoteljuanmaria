"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import icon from "./GrayIcon.svg";


export default function Navbar() {
  // Estado para manejar scroll
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo a la izquierda */}
      <div className="flex items-center">
        <Link href="#">
          <Image src={icon} alt="Home" width={64} height={64} />
        </Link>
      </div>

        {/* Links de navegación */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/sobre-nosotros" className="text-gray-700 hover:text-gray-900">
            Sobre Nosotros
          </Link>
          <Link href="/habitaciones" className="text-gray-700 hover:text-gray-900">
            Habitaciones
          </Link>
          <Link href="/pagina" className="text-gray-700 hover:text-gray-900">
            Página
          </Link>
          <Link href="/reservas" className="text-gray-700 hover:text-gray-900">
            Reservas
          </Link>
        </div>

        {/* Botón de contacto */}
        <div>
          <button className="border border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 px-6 py-2 rounded transition-colors duration-300">
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}