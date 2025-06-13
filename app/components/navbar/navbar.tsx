"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { gradientClasses } from '../ui/gradientBackgrounds';
import icon from "./GrayIcon.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navigationItems = [
    {
      name: "Sobre Nosotros",
      href: "/sobre-nosotros",
      hasDropdown: false
    },
    {
      name: "Habitaciones",
      href: "/habitaciones",
      hasDropdown: true,
      dropdownItems: [
        { name: "Suite Presidencial", href: "/habitaciones/suite-presidencial" },
        { name: "Habitación Ejecutiva", href: "/habitaciones/ejecutiva" },
        { name: "Habitación Familiar", href: "/habitaciones/familiar" },
        { name: "Habitación Standard", href: "/habitaciones/standard" }
      ]
    },
    {
      name: "Experiencias",
      href: "/experiencias",
      hasDropdown: true,
      dropdownItems: [
        { name: "Restaurante", href: "/experiencias/restaurante" },
        { name: "Spa & Bienestar", href: "/experiencias/spa" },
        { name: "Eventos", href: "/experiencias/eventos" },
        { name: "Galería", href: "/experiencias/galeria" }
      ]
    },
    {
      name: "Blog",
      href: "/blog",
      hasDropdown: false
    }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
          scrolled 
            ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-gray-100/50" 
            : "bg-white/95 backdrop-blur-xl"
        }`}
        style={{
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.98) 100%)'
        }}
      >
        {/* Floating orb effect */}
        <div 
          className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-200/30 to-gray-400/20 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.01}px)`,
            opacity: scrolled ? 0.6 : 0.4
          }}
        />
        
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo with floating effect */}
            <div className="flex items-center group relative">
              <Link href="/" className="relative">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-black rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110"></div>
                  <Image 
                    src={icon} 
                    alt="Hotel Elegance" 
                    width={56} 
                    height={56}
                    className="relative z-10 transition-all duration-500 group-hover:rotate-3 group-hover:scale-105 filter drop-shadow-lg"
                  />
                  <div className="absolute inset-0 border border-gray-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation with magical effects */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{ 
                    animationDelay: `${index * 100}ms` 
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-500 relative overflow-hidden group hover:text-gray-900"
                  >
                    <span className="relative z-20 flex items-center">
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown 
                          className={`ml-2 h-4 w-4 transition-all duration-500 ${
                            activeDropdown === item.name ? "rotate-180 text-gray-900" : ""
                          }`}
                        />
                      )}
                    </span>
                    
                    {/* Morphing background effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-100/40 rounded-2xl transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/30 to-transparent rounded-2xl transform rotate-45 scale-0 group-hover:scale-150 transition-all duration-1000 ease-out"></div>
                    </div>
                    
                    {/* Flowing underline */}
                    <div className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-800 to-transparent transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-out w-3/4"></div>
                    
                    {/* Clean hover - no effects */}
                  </Link>

                  {/* Soft Elegant Dropdown with smooth transitions */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div 
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 w-64 transition-all duration-500 ease-out ${
                        activeDropdown === item.name 
                          ? "opacity-100 translate-y-2 visible blur-0" 
                          : "opacity-0 -translate-y-4 invisible blur-sm"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setTimeout(() => setActiveDropdown(null), 100)}
                    >
                      <div className="mt-4 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/30 overflow-hidden transform transition-all duration-300">
                        {/* Soft floating header orb */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-lg border border-gray-200/50 transition-all duration-300"></div>
                        
                        <div className="p-2">
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 rounded-2xl transition-all duration-400 group/item relative overflow-hidden"
                              style={{ animationDelay: `${idx * 50}ms` }}
                            >
                              <span className="relative z-10">{dropdownItem.name}</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/60 to-gray-50/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-center"></div>
                              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-gray-400 to-gray-600 group-hover/item:h-full transition-all duration-400"></div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Revolutionary CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/reservas"
                className="group relative px-8 py-3 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 ${gradientClasses.premium}`}></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className={`absolute inset-0 ${gradientClasses.premiumDiagonal} transform scale-0 group-hover:scale-100 transition-transform duration-700 rounded-lg`}></div>
                <span className="relative z-10 flex items-center">
                  Reservar Ahora
                  <div className="ml-2 w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                </span>
                {/* Floating edge highlight */}
                <div className="absolute inset-0 border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              
              <Link
                href="/contacto"
                className="group relative px-8 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg border border-gray-200/60 hover:border-gray-300 transition-all duration-500 hover:scale-105 overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10">Contacto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/40 to-gray-50/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </div>

            {/* Mobile menu button with morphing animation */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100/60 transition-all duration-500 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/0 to-gray-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 transform rotate-0 transition-transform duration-500" />
                  ) : (
                    <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-500" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Revolutionary Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${
        mobileMenuOpen ? "visible" : "invisible"
      }`}>
        {/* Animated Backdrop */}
        <div 
          className={`absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-black/40 via-gray-900/30 to-black/50 transition-all duration-700 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Floating Menu Panel */}
        <div className={`absolute top-4 right-4 w-80 h-[calc(100vh-2rem)] bg-white/90 backdrop-blur-2xl shadow-2xl transform transition-all duration-700 rounded-xl border border-white/20 ${
          mobileMenuOpen ? "translate-x-0 rotate-0" : "translate-x-full rotate-12"
        }`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mr-3 animate-pulse"></div>
              Menú
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100/60 transition-all duration-300 group"
            >
              <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="p-6 space-y-2">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-4 py-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50/60 rounded-lg transition-all duration-500 group relative overflow-hidden"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 font-medium">{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4 relative z-10" />}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-gray-400 to-gray-600 group-hover:h-full transition-all duration-400 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>
                
                {item.hasDropdown && item.dropdownItems && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50/40 rounded-lg transition-all duration-400 relative group"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: `${(index * 100) + (idx * 50)}ms` }}
                      >
                        <span className="relative z-10">{dropdownItem.name}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-200/30 to-gray-100/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 space-y-4">
            <Link
              href="/reservas"
              className={`block w-full px-6 py-4 ${gradientClasses.premium} text-white text-center font-semibold rounded-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="relative z-10">Reservar Ahora</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              href="/contacto"
              className="block w-full px-6 py-4 border border-gray-200 text-gray-700 hover:text-gray-900 text-center font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50/40 transition-all duration-500 relative overflow-hidden group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="relative z-10">Contacto</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-50/60 to-gray-100/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}