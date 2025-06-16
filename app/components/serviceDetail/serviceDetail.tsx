"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, MapPin, Phone, X, Star, Calendar, CheckCircle } from 'lucide-react';
import { getServiceById, type Service } from '../../lib/data';
import Loading from '../ui/loading';

const ServiceDetail = ({ serviceId = 1 }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        setError(null);
        const service = await getServiceById(serviceId);
        
        if (!service) {
          setError('Servicio no encontrado');
          return;
        }
        
        setSelectedService(service);
      } catch (err) {
        console.error('Error loading service:', err);
        setError('Error al cargar el servicio');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [serviceId]);

  const getServiceIcon = (icon: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'restaurant': <span className="text-2xl">🍽️</span>,
      'spa': <span className="text-2xl">🧘</span>,
      'gym': <span className="text-2xl">💪</span>,
      'wifi': <span className="text-2xl">📶</span>,
      'parking': <span className="text-2xl">🚗</span>,
      'business': <span className="text-2xl">💼</span>,
      'pool': <span className="text-2xl">🏊</span>,
      'laundry': <span className="text-2xl">👔</span>,
      'events': <span className="text-2xl">🎉</span>,
      'concierge': <span className="text-2xl">🛎️</span>,
      'transport': <span className="text-2xl">🚐</span>,
      'tours': <span className="text-2xl">🗺️</span>
    };
    return iconMap[icon] || <Star className="w-6 h-6" />;
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !selectedService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-600 font-sans text-2xl mb-4">{error || 'Servicio no encontrado'}</div>
          <button 
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors font-sans"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[85vh] overflow-hidden mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Imagen Principal - 2/3 del ancho */}
          <div className="lg:col-span-2 relative h-full">
            <div className="absolute inset-0">
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </div>
            
            {/* Botón de cerrar/volver */}
            <button
              onClick={() => window.history.back()}
              className="absolute top-6 right-6 z-30 bg-black/60 hover:bg-black/80 text-white rounded-lg p-3 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge de destacado */}
            {selectedService.featured && (
              <div className="absolute top-6 left-6 z-20">
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-4 py-2 rounded-lg font-semibold overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Servicio Destacado
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                </div>
              </div>
            )}

            {/* Icono del servicio flotante */}
            <div className="absolute bottom-32 left-6 z-10">
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all duration-700 hover:bg-white/20">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-lg border border-white/30">
                  {getServiceIcon(selectedService.icon)}
                </div>
              </div>
            </div>

            {/* Título flotante */}
            <div className="absolute bottom-6 left-6 right-6 lg:right-1/3 z-10">
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl py-6 px-8 transition-all duration-700 hover:bg-white/20">
                {/* Floating highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-xl"/>
                
                {/* Shimmer effects */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-2 right-4 w-1 h-4 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                  <div className="absolute bottom-2 left-4 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                </div>
                
                <div className="relative z-10">
                  <h1 className="font-serif text-xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    {selectedService.title}
                  </h1>
                  <p className="font-sans text-sm md:text-base lg:text-lg font-light text-white/90 mb-4 leading-relaxed">
                    {selectedService.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-sans text-sm md:text-base">{selectedService.hours}</span>
                    </div>
                    {selectedService.featured && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-sans text-sm md:text-base">Servicio Premium</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Información */}
          <div className="lg:col-span-1 relative h-full">
            <div className="absolute inset-6 flex flex-col">
              <div className="relative bg-white/70 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl overflow-hidden transition-all duration-700 hover:bg-white/80 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-8 h-full flex flex-col justify-between">
                {/* Floating highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700"/>
                
                {/* Shimmer effects */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                  <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Estado del servicio */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-sans text-lg font-semibold text-green-600">Disponible</span>
                    </div>
                    <div className="font-sans text-sm text-gray-600">Horario: {selectedService.hours}</div>
                  </div>

                  {/* Información rápida */}
                  <div className="space-y-4 mb-8 flex-1">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200/60">
                      <span className="font-sans text-base text-gray-600">Tipo</span>
                      <span className="font-sans text-base font-semibold text-gray-900">
                        {selectedService.featured ? 'Premium' : 'Estándar'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200/60">
                      <span className="font-sans text-base text-gray-600">Horario</span>
                      <span className="font-sans text-base font-semibold text-gray-900">{selectedService.hours}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200/60">
                      <span className="font-sans text-base text-gray-600">Reserva</span>
                      <span className="font-sans text-base font-semibold text-gray-900">Requerida</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-sans text-base text-gray-600">Estado</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="font-sans text-base font-semibold text-green-600">Activo</span>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-4">
                    <button className="w-full relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group py-4 px-6">
                      <span className="relative z-10 flex items-center justify-center text-white">
                        Reservar Servicio
                        <div className="ml-2 w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"/>
                      </span>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"/>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                        <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                      </div>
                    </button>

                    <button className="w-full border border-gray-200/60 text-gray-700 hover:border-gray-300 py-4 px-6 rounded-lg font-semibold transition-all duration-500 hover:bg-gray-50/60 relative overflow-hidden group">
                      <span className="relative z-10">Más Información</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/40 to-gray-50/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                    </button>
                  </div>

                  {/* Contacto */}
                  <div className="mt-8 pt-6 border-t border-gray-200/60">
                    <div className="flex items-center gap-3 text-gray-600 mb-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-sans text-sm">Hotel Juan María, Cali</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5" />
                      <span className="font-sans text-sm">+57 (2) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido detallado debajo */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información detallada - 2/3 del ancho */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción expandida */}
            <div 
              className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-8"
              style={{animationDelay: '0ms'}}
            >
              {/* Floating highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700"/>
              
              {/* Shimmer effects */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
              </div>

              <div className="relative z-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Sobre Este Servicio
                </h2>
                <div className="font-sans text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    {selectedService.description} Nuestro equipo profesional está dedicado a brindar 
                    una experiencia excepcional que supere sus expectativas.
                  </p>
                  <p>
                    Este servicio forma parte de nuestra oferta integral de hospitalidad, diseñada 
                    para hacer de su estadía una experiencia memorable e inolvidable.
                  </p>
                  <p>
                    Disponible {selectedService.hours} para su comodidad y disfrute durante su 
                    estadía en Hotel Juan María.
                  </p>
                </div>
              </div>
            </div>

            {/* Características del servicio */}
            <div 
              className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-8"
              style={{animationDelay: '200ms'}}
            >
              {/* Floating highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700"/>
              
              {/* Shimmer effects */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
              </div>

              <div className="relative z-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Características Principales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Atención personalizada',
                    'Equipos de alta calidad',
                    'Personal especializado',
                    'Horarios flexibles',
                    'Ambiente exclusivo',
                    'Estándares premium'
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/60 hover:bg-gray-100/60 transition-all duration-300"
                      style={{animationDelay: `${index * 50}ms`}}
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-sans text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="lg:col-span-1">
            <div 
              className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-8 sticky top-28"
              style={{animationDelay: '400ms'}}
            >
              {/* Floating highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700"/>
              
              {/* Shimmer effects */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
              </div>

              <div className="relative z-10">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Información del Servicio</h3>
                <div className="space-y-4 font-sans text-base text-gray-600">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Disponible:</span>
                    <span className="font-semibold text-gray-900">{selectedService.hours}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Tipo:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedService.featured ? 'Premium' : 'Estándar'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Reserva previa:</span>
                    <span className="font-semibold text-gray-900">Recomendada</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Incluido:</span>
                    <span className="font-semibold text-gray-900">Para huéspedes</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Soporte:</span>
                    <span className="font-semibold text-green-600">24/7</span>
                  </div>
                </div>

                {/* CTA adicional */}
                <div className="mt-8 pt-6 border-t border-gray-200/60">
                  <button className="w-full relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group py-3 px-4 mb-4">
                    <span className="relative z-10 flex items-center justify-center text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Cita
                    </span>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"/>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                  </button>
                  
                  <p className="font-sans text-sm text-gray-500 text-center">
                    ¿Necesita ayuda? Contacte a recepción
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Espaciado adicional */}
      <div className="h-32 lg:h-24"></div>
    </div>
  );
};

export default ServiceDetail;