'use client';

import React, { useState, useEffect } from 'react';
import { getServices, getFeaturedServices, getHalls, getCapacityTypes, getServicesCoverImage, type Hall, type CapacityType } from '../../lib/data';
import { Button } from '../ui/button';

// CSS animations
const animations = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleX {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;

// Interface extendida que incluye todas las propiedades posibles
interface ExtendedService {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  hours: string;
  featured: boolean;
  capacity?: string;
  halls?: string[];
  services_included?: string[];
}

// Iconos personalizados según el design system
const ServiceIcon = ({ icon, className = "" }: { icon: string; className?: string }) => {
  const iconMap = {
    restaurant: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    events: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    celebration: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    business: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    romantic_dinner: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    romantic_night: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  };

  return iconMap[icon as keyof typeof iconMap] || iconMap.business;
};

// Componente de tabla comparativa de salones
const HallsComparisonTable = () => {
  const [hallsData, setHallsData] = useState<Hall[]>([]);
  const [capacityOptions, setCapacityOptions] = useState<CapacityType[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<string>('size');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHallsData = async () => {
      try {
        const [halls, capacityTypes] = await Promise.all([
          getHalls(),
          getCapacityTypes()
        ]);
        
        setHallsData(halls);
        setCapacityOptions(capacityTypes);
      } catch (error) {
        console.error('Error loading halls data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHallsData();
  }, []);

  if (loading) {
    return (
      <div className="mt-16">
        <div className="text-center mb-8">
          <div className="w-48 h-8 bg-gray-200/60 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="w-96 h-6 bg-gray-200/60 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="h-64 bg-gray-200/60 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-16 relative">
      {/* Header de la tabla */}
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Encuentra tu Espacio Ideal
        </h3>
        <p className="font-sans text-lg font-light text-gray-600">
          Compara nuestros salones para eventos y elige el perfecto para tu ocasión
        </p>
      </div>

      {/* Selector de tipo de capacidad */}
      <div className="mb-6 flex justify-center">
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-lg">
          <div className="flex gap-1">
            {capacityOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedCapacity(option.key)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 ${
                  selectedCapacity === option.key
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{option.icon}</span>
                  {option.label}
                </span>
                
                {/* Fondo activo */}
                {selectedCapacity === option.key && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-100" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla principal */}
      <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header de la tabla */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
          <div className="grid grid-cols-5 gap-4 p-6">
            <div className="font-serif text-lg font-semibold">Salón</div>
            {capacityOptions.map((option) => (
              <div key={option.key} className="text-center font-sans text-sm font-medium flex items-center justify-center gap-2">
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cuerpo de la tabla */}
        <div className="divide-y divide-gray-200/30">
          {hallsData.map((hall, index) => (
            <div 
              key={hall.id}
              className="grid grid-cols-5 gap-4 p-6 hover:bg-white/50 transition-all duration-300 group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Nombre del salón */}
              <div className="font-sans font-light text-gray-900 font-semibold group-hover:text-gray-700 transition-colors duration-300">
                {hall.name}
              </div>

              {/* Capacidades dinámicas */}
              <div className="text-center">
                <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  selectedCapacity === 'size' 
                    ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white scale-110 shadow-lg' 
                    : 'bg-gray-100/60 text-gray-700 group-hover:bg-gray-200/60'
                }`}>
                  {hall.size}
                </span>
              </div>

              <div className="text-center">
                {hall.banquet ? (
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    selectedCapacity === 'banquet' 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white scale-110 shadow-lg' 
                      : 'bg-gray-100/60 text-gray-700 group-hover:bg-gray-200/60'
                  }`}>
                    {hall.banquet}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </div>

              <div className="text-center">
                {hall.classroom ? (
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    selectedCapacity === 'classroom' 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white scale-110 shadow-lg' 
                      : 'bg-gray-100/60 text-gray-700 group-hover:bg-gray-200/60'
                  }`}>
                    {hall.classroom}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </div>

              <div className="text-center">
                {hall.conference ? (
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    selectedCapacity === 'conference' 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white scale-110 shadow-lg' 
                      : 'bg-gray-100/60 text-gray-700 group-hover:bg-gray-200/60'
                  }`}>
                    {hall.conference}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </div>

              {/* Efecto liquid glass mejorado en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
              
              {/* Shimmer effects más sutiles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute top-2 right-4 w-0.5 h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
                <div className="absolute bottom-2 left-4 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse" style={{ animationDelay: '0.7s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer con información adicional */}
        <div className="bg-gray-50/60 backdrop-blur-sm p-4 border-t border-gray-200/30">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded"></div>
              <span>Capacidad destacada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100/60 rounded border border-gray-200"></div>
              <span>Capacidad estándar</span>
            </div>
            <div className="text-gray-400">
              <span>- = No disponible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 text-center">
        <p className="font-sans font-light text-sm text-gray-600">
          Todos los salones incluyen: Aire acondicionado, Wi-Fi, equipos audiovisuales y estación de café
        </p>
      </div>
    </div>
  );
};

// Componente ServiceCard actualizado con navegación
const ServiceCard = ({ service, index }: { service: ExtendedService; index: number }) => {
    // Función para navegar al detalle del servicio
    const handleViewDetails = () => {

      window.location.href = `/experiencias/${service.id}`;
    
    };
  
    return (
      <div 
        className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl group flex flex-col h-full"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {/* Imagen de fondo */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/60" />
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badge de destacado */}
          {service.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-3 py-1 rounded-lg text-sm font-semibold">
              <span className="relative z-10">Destacado</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          )}
  
          {/* Icono flotante */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/30">
            <ServiceIcon icon={service.icon} className="w-6 h-6 text-white" />
          </div>
        </div>
  
        {/* Contenido - usa flex-grow para ocupar el espacio disponible */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Título */}
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
            {service.title}
          </h3>
  
          {/* Descripción */}
          <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
            {service.description}
          </p>
  
          {/* Información adicional - usa flex-grow para ocupar el espacio disponible */}
          <div className="space-y-3 flex-grow">
            {/* Horarios */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-sans font-light text-sm text-gray-600">{service.hours}</span>
            </div>
  
            {/* Capacidad */}
            {service.capacity && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-sans text-sm text-gray-600">Capacidad: {service.capacity}</span>
              </div>
            )}
  
            {/* Salones (para eventos) */}
            {service.halls && (
              <div className="mt-4">
                <h4 className="font-sans text-sm font-semibold text-gray-700 mb-2">Salones disponibles:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.halls.map((hall, hallIndex) => (
                    <span 
                      key={hallIndex}
                      className="px-2 py-1 bg-gray-100/60 backdrop-blur-sm rounded-lg text-xs text-gray-600 border border-gray-200/40"
                    >
                      {hall}
                    </span>
                  ))}
                </div>
              </div>
            )}
  
            {/* Servicios incluidos */}
            {service.services_included && (
              <div className="mt-4">
                <h4 className="font-sans text-sm font-semibold text-gray-700 mb-2">Servicios incluidos:</h4>
                <ul className="space-y-1">
                  {service.services_included.slice(0, 3).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="font-sans text-xs text-gray-600">{item}</span>
                    </li>
                  ))}
                  {service.services_included.length > 3 && (
                    <li className="font-sans text-xs text-gray-500 italic">
                      +{service.services_included.length - 3} servicios más
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
  
         {/* Botón de acción ACTUALIZADO - ahora navega al detalle */}
        <Button
          onClick={handleViewDetails}
          variant="primary"
          size="md"
          showIndicator={false}
          className="w-full mt-6 flex-shrink-0 py-4 px-6"
        >
          Ver Detalles
        </Button>

        </div>
      </div>
    );
  };

// Componente principal de servicios
const ServicesSection = () => {
  const [services, setServices] = useState<ExtendedService[]>([]);
  const [featuredServices, setFeaturedServices] = useState<ExtendedService[]>([]);
  const [coverImage, setCoverImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showAllServices, setShowAllServices] = useState(false);
  const [hasEventServices, setHasEventServices] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const [allServices, featured, coverImg] = await Promise.all([
          getServices(),
          getFeaturedServices(),
          getServicesCoverImage()
        ]);
        
        setServices(allServices as ExtendedService[]);
        setFeaturedServices(allServices as ExtendedService[]); // Mostrar todos por defecto
        setCoverImage(coverImg);
        
        // Verificar si hay servicios de eventos (que tendrían salones)
        const eventServices = allServices.filter(service => 
          service.title.toLowerCase().includes('evento') || 
          service.title.toLowerCase().includes('salón') ||
          (service as any).halls
        );
        setHasEventServices(eventServices.length > 0);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const displayServices = showAllServices ? services : services; // Mostrar todos por defecto

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 p-8 animate-pulse">
          <div className="w-64 h-8 bg-gray-200/60 rounded-lg mx-auto mb-4" />
          <div className="w-96 h-6 bg-gray-200/60 rounded-lg mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Inject CSS animations */}
      <style>{animations}</style>
      
      <section className="relative overflow-hidden">
        {/* Hero Section Fullscreen */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Cover Image Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={coverImage} 
              alt="Servicios Hotel Juan María"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradients para el efecto liquid luxury */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </div>

          {/* Orbes flotantes más sutiles para no competir con la imagen */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />

          {/* Espacio para navbar */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10" />

          <div className="max-w-7xl mx-auto px-4 relative z-20 pt-20">
            {/* Glassmorphism container principal - más transparente para la imagen */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden p-8 md:p-12">
              {/* Floating highlight más sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-60" />
              
              {/* Shimmer effects ajustados para fondo oscuro */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-8 right-12 w-1 h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse" />
                <div className="absolute bottom-8 left-12 w-6 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 right-8 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative z-10 text-center">
                {/* Subtitle con entrada animada - texto blanco para contraste */}
                <div 
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-lg text-sm font-medium mb-6 transform transition-all duration-1000 translate-y-8 opacity-0"
                  style={{ animationDelay: '200ms', animation: 'fadeInUp 1000ms ease-out 200ms forwards' }}
                >
                  <div className="w-2 h-2 bg-white/70 rounded-full mr-3 animate-pulse" />
                  Experiencias Premium
                </div>

                {/* Título principal - blanco para contraste */}
                <h1 
                  className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 transform transition-all duration-1000 translate-y-8 opacity-0"
                  style={{ animationDelay: '400ms', animation: 'fadeInUp 1000ms ease-out 400ms forwards' }}
                >
                  Nuestros{' '}
                  <span className="relative">
                    Servicios
                    {/* Underline effect - blanco */}
                    <div className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-white via-white/80 to-white transform scale-x-0 origin-left transition-transform duration-1000" style={{ animationDelay: '1.2s', animation: 'scaleX 800ms ease-out 1.2s forwards' }} />
                  </span>
                </h1>

                {/* Descripción - texto blanco */}
                <p 
                  className="font-sans text-lg md:text-xl font-light text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed transform transition-all duration-1000 translate-y-8 opacity-0"
                  style={{ animationDelay: '600ms', animation: 'fadeInUp 1000ms ease-out 600ms forwards' }}
                >
                  Descubre la excelencia en cada detalle de nuestros servicios premium. 
                  Desde experiencias gastronómicas hasta eventos inolvidables, 
                  cada momento está diseñado para superar tus expectativas.
                </p>

                {/* Stats con glassmorphism ajustado */}
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 translate-y-8 opacity-0"
                  style={{ animationDelay: '800ms', animation: 'fadeInUp 1000ms ease-out 800ms forwards' }}
                >
                  {[
                    { number: '6', label: 'Servicios Premium', delay: '0ms' },
                    { number: '4', label: 'Salones para Eventos', delay: '100ms' },
                    { number: '120', label: 'Capacidad Máxima', delay: '200ms' }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="relative bg-white/15 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-6 transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:bg-white/25 group"
                      style={{ animationDelay: stat.delay }}
                    >
                      {/* Floating highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Content - texto blanco */}
                      <div className="relative z-10 text-center">
                        <div className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                          {stat.number}
                        </div>
                        <div className="font-sans text-sm font-medium text-white/80">
                          {stat.label}
                        </div>
                      </div>

                      {/* Shimmer effects */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-2 right-3 w-0.5 h-4 bg-gradient-to-b from-transparent via-white/50 to-transparent rotate-45 animate-pulse" />
                        <div className="absolute bottom-2 left-3 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to action button - ajustado para fondo oscuro */}
                <div 
                  className="mt-12 transform transition-all duration-1000 translate-y-8 opacity-0"
                  style={{ animationDelay: '1000ms', animation: 'fadeInUp 1000ms ease-out 1000ms forwards' }}
                >
                  <button 
                    onClick={() => {
                      const element = document.getElementById('servicios-content');
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    className="relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group px-8 py-4"
                  >
                    <span className="relative z-10 flex items-center justify-center text-white">
                      Explorar Servicios
                      <div className="ml-3 w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300" />
                    </span>
                    
                    {/* Efectos de fondo - blanco para contraste */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border border-white/30" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Shimmer effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-1 right-2 w-1 h-4 bg-gradient-to-b from-transparent via-white/50 to-transparent rotate-45 animate-pulse" />
                      <div className="absolute bottom-1 left-3 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator ajustado para fondo oscuro */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 z-20"
            style={{ animation: 'fadeIn 1000ms ease-out 1.5s forwards' }}
          >
            <div className="w-6 h-10 border-2 border-white/40 rounded-full mb-2 relative">
              <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
            </div>
            <span className="font-sans text-xs text-white/70 font-medium">Descubre más</span>
          </div>
        </div>

        {/* Contenido principal de servicios */}
        <div id="servicios-content" className="py-16 px-4 relative">
        {/* Orbes de fondo para el contenido */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="max-w-7xl mx-auto relative">
            {/* Grid de servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>

            {/* Tabla comparativa de salones - solo mostrar si hay servicios de eventos */}
            {hasEventServices && (
              <HallsComparisonTable />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;