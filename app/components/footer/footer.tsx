"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Youtube, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Phone, href: "tel:+573246669900", label: "Teléfono" }
  ];

  const companyLinks = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Habitaciones", href: "/habitaciones" },
    { name: "Experiencias", href: "/experiencias" },
    { name: "Blog", href: "/blog" }
  ];

  const usefulLinks = [
    { name: "Reservas", href: "/reservas" },
    { name: "Eventos", href: "/eventos" },
    { name: "FAQ", href: "/faq" },
    { name: "Testimonios", href: "/testimonios" },
    { name: "Galería", href: "/galeria" }
  ];

  return (
    <div>
      <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Subtle floating background orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gray-200/20 via-gray-300/10 to-transparent rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none opacity-60" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-gray-400/15 via-gray-200/10 to-transparent rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none opacity-40" />

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand section - more uniform */}
            <div className="lg:col-span-2">
              <div className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-md h-full">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                  Hotel Juan María
                </h2>
                <p className="text-lg text-gray-700 font-medium mb-4">Donde el lujo se encuentra con la comodidad</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Creamos experiencias memorables que superan las expectativas, combinando hospitalidad auténtica 
                  con instalaciones de clase mundial en el corazón de Tuluá.
                </p>
                
                {/* Social media */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="p-2.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:scale-105"
                    >
                      <social.icon className="w-4 h-4 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <div className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-md h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Navegación</h3>
                <ul className="space-y-2">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Services and Contact combined */}
            <div className="space-y-6">
              {/* Services */}
              <div className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Servicios</h3>
                <ul className="space-y-2">
                  {usefulLinks.slice(0, 4).map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="break-all">info@hoteljuanmaria.com</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>+57 2 555-0123</span>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Carrera 15 #85-32<br />
                      Zona Rosa, Tuluá<br />
                      Valle del Cauca
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="mt-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl p-8 relative overflow-hidden">
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Mantente Informado
              </h3>
              <p className="text-gray-300 mb-6">
                Recibe ofertas exclusivas y noticias sobre nuestros servicios
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300"
                />
                <button className="px-6 py-3 bg-white/20 text-white border border-white/30 hover:bg-white/30 rounded-lg transition-all duration-300">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025 Hotel Juan María. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="hover:text-gray-900 transition-colors duration-300">Privacidad</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors duration-300">Términos</Link>
              <Link href="/cookies" className="hover:text-gray-900 transition-colors duration-300">Cookies</Link>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-500 z-50 group"
          >
            <ArrowUp className="w-5 h-5" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
          </button>
        )}
      </footer>
    </div>
  );
};

export default Footer;