"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Square, Bed, Check, MapPin, Wifi, Car, Coffee, Shield, Tv, Waves, Phone, Plane, X } from 'lucide-react';
import { getRoomById, formatPrice, type Room } from '../../lib/data';

const RoomDetail = ({ roomId = 1 }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        const room = await getRoomById(roomId);
        
        if (!room) {
          setError('Habitación no encontrada');
          return;
        }
        
        setSelectedRoom(room);
      } catch (err) {
        console.error('Error loading room:', err);
        setError('Error al cargar la habitación');
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [roomId]);

  const nextImage = () => {
    if (selectedRoom) {
      setSelectedImageIndex((prev) => 
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      );
    }
  };

  const nextPreviewImage = () => {
    if (selectedRoom) {
      setPreviewImageIndex((prev) => 
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPreviewImage = () => {
    if (selectedRoom) {
      setPreviewImageIndex((prev) => 
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      );
    }
  };

  const openPreview = (index: number) => {
    setPreviewImageIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  // Cerrar con Escape y navegación con flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreviewOpen) {
        if (e.key === 'Escape') {
          closePreview();
        } else if (e.key === 'ArrowLeft') {
          prevPreviewImage();
        } else if (e.key === 'ArrowRight') {
          nextPreviewImage();
        }
      } else {
        // Navegación en hero con flechas
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isPreviewOpen, selectedRoom]);

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi className="w-5 h-5" />;
    if (amenityLower.includes('tv')) return <Tv className="w-5 h-5" />;
    if (amenityLower.includes('aire') || amenityLower.includes('acondicionado')) return <Waves className="w-5 h-5" />;
    if (amenityLower.includes('seguridad') || amenityLower.includes('caja')) return <Shield className="w-5 h-5" />;
    if (amenityLower.includes('parqueadero') || amenityLower.includes('parking')) return <Car className="w-5 h-5" />;
    if (amenityLower.includes('minibar') || amenityLower.includes('bar')) return <Coffee className="w-5 h-5" />;
    if (amenityLower.includes('servicio') && amenityLower.includes('habitación')) return <Phone className="w-5 h-5" />;
    if (amenityLower.includes('transporte') || amenityLower.includes('aeropuerto')) return <Plane className="w-5 h-5" />;
    return <Check className="w-5 h-5" />;
  };

  const getImagePath = (imagePath: string) => {
    return imagePath.replace('/', '/').replace('.jpeg', '.jpeg');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center pt-20">
        <div className="animate-pulse font-sans text-2xl text-gray-600">Cargando habitación...</div>
      </div>
    );
  }

  if (error || !selectedRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-600 font-sans text-2xl mb-4">{error || 'Habitación no encontrada'}</div>
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
      {/* Modal de Preview */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-2xl"
            onClick={closePreview}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-700 max-w-6xl max-h-[90vh] w-full mx-4">
            {/* Floating highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-100"/>
            
            {/* Shimmer effects */}
            <div className="absolute inset-0">
              <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
              <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
            </div>

            <div className="relative z-10 p-6">
              {/* Header con botón cerrar */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Galería - {selectedRoom.title}
                </h3>
                <button
                  onClick={closePreview}
                  className="relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group p-3"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <X className="w-5 h-5 text-gray-700" />
                  </span>
                  <div className="absolute inset-0 bg-gray-100/70"/>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                </button>
              </div>

              {/* Imagen principal del preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={getImagePath(selectedRoom.images[previewImageIndex])} 
                  alt={`${selectedRoom.title} ${previewImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

                {/* Botón izquierda del preview */}
                <button
                  onClick={prevPreviewImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group p-4"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80"/>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                    <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                  </div>
                </button>

                {/* Botón derecha del preview */}
                <button
                  onClick={nextPreviewImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group p-4"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80"/>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                    <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                  </div>
                </button>

                {/* Contador de imágenes con tip de navegación */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2">
                    <span className="font-sans text-sm text-white">
                      {previewImageIndex + 1} de {selectedRoom.images.length}
                    </span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-1">
                    <span className="font-sans text-xs text-white/70">
                      Usa ← → para navegar
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnails del preview */}
              <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-32 overflow-y-auto">
                {selectedRoom.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setPreviewImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 ${
                      index === previewImageIndex ? 'ring-2 ring-gray-600' : ''
                    }`}
                  >
                    <img 
                      src={getImagePath(image)} 
                      alt={`${selectedRoom.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"/>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section con layout FIJO */}
      <div className="relative h-[85vh] overflow-hidden mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Imagen Principal - 2/3 del ancho - ALTURA FIJA */}
          <div className="lg:col-span-2 relative h-full">
            <div className="absolute inset-0">
              <img 
                src={getImagePath(selectedRoom.images[selectedImageIndex])} 
                alt={selectedRoom.title}
                className="w-full h-full object-cover transition-all duration-1000"
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

            {/* Botón navegación IZQUIERDA */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 relative font-semibold rounded-xl overflow-hidden transition-all duration-700 group p-5 hover:scale-110"
            >
              <span className="relative z-10 flex items-center justify-center">
                <ChevronLeft className="w-7 h-7 text-gray-800" />
              </span>
              <div className="absolute inset-0 bg-white/90"/>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-gray-400/30 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
              </div>
            </button>

            {/* Botón navegación DERECHA */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 relative font-semibold rounded-xl overflow-hidden transition-all duration-700 group p-5 hover:scale-110"
            >
              <span className="relative z-10 flex items-center justify-center">
                <ChevronRight className="w-7 h-7 text-gray-800" />
              </span>
              <div className="absolute inset-0 bg-white/90"/>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-gray-400/30 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
              </div>
            </button>

            {/* Indicadores de imagen - Mejorados con navegación */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-4 z-10">
              {selectedRoom.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-500 group ${
                    index === selectedImageIndex 
                      ? 'w-12 h-4 bg-white scale-125' 
                      : 'w-4 h-4 bg-white/40 hover:bg-white/70 hover:scale-110'
                  }`}
                >
                  {/* Shimmer effect en el indicador activo */}
                  {index === selectedImageIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"/>
                  )}
                  
                  {/* Tooltip con número */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>

            {/* Contador de imagen - Sin botones duplicados */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl px-6 py-2">
                <span className="font-sans text-sm text-white/90">
                  {selectedImageIndex + 1} de {selectedRoom.images.length}
                </span>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-1">
                <span className="font-sans text-xs text-white/60">
                  ← → o click para navegar
                </span>
              </div>
            </div>

            {/* Título flotante FIJO - no afecta layout */}
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
                    {selectedRoom.title}
                  </h1>
                  <p className="font-sans text-sm md:text-base lg:text-lg font-light text-white/90 mb-4 leading-relaxed">
                    {selectedRoom.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="font-sans text-sm md:text-base">{selectedRoom.capacity} huésped{selectedRoom.capacity > 1 ? 'es' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4" />
                      <span className="font-sans text-sm md:text-base">{selectedRoom.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span className="font-sans text-sm md:text-base">{selectedRoom.bedType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Información - ALTURA FIJA INDEPENDIENTE */}
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
                  {/* Precio destacado */}
                  <div className="text-center mb-8">
                    <div className="font-sans text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(selectedRoom.price)}
                    </div>
                    <div className="font-sans text-base text-gray-600">por noche</div>
                  </div>

                  {/* Información rápida */}
                  <div className="space-y-4 mb-8 flex-1">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200/60">
                      <span className="font-sans text-base text-gray-600">Capacidad</span>
                      <span className="font-sans text-base font-semibold text-gray-900">{selectedRoom.capacity} persona{selectedRoom.capacity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200/60">
                      <span className="font-sans text-base text-gray-600">Tamaño</span>
                      <span className="font-sans text-base font-semibold text-gray-900">{selectedRoom.size}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200/60">
                      <span className="font-sans text-base text-gray-600">Tipo de cama</span>
                      <span className="font-sans text-base font-semibold text-gray-900">{selectedRoom.bedType}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-sans text-base text-gray-600">Disponibilidad</span>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-sans text-base font-semibold text-green-600">Disponible</span>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-4">
                    <button className="w-full relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group py-4 px-6">
                      <span className="relative z-10 flex items-center justify-center text-white">
                        Reservar Ahora
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
                      <span className="relative z-10">Consultar Disponibilidad</span>
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
          {/* Amenidades - 2/3 del ancho */}
          <div className="lg:col-span-2 space-y-8">
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
                  Amenidades y Servicios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/60 hover:bg-gray-100/60 transition-all duration-300"
                      style={{animationDelay: `${index * 50}ms`}}
                    >
                      <div className="text-gray-600">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="font-sans text-base text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Galería de imágenes adicionales */}
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
                  Galería de Imágenes
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedRoom.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openPreview(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                        index === selectedImageIndex ? 'ring-4 ring-gray-400' : ''
                      }`}
                    >
                      <img 
                        src={getImagePath(image)} 
                        alt={`${selectedRoom.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"/>
                      
                      {/* Indicador de que se puede abrir preview */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional - fixed sticky para compensar navbar */}
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
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Información Adicional</h3>
                <div className="space-y-4 font-sans text-base text-gray-600">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Check-in:</span>
                    <span className="font-semibold text-gray-900">3:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Check-out:</span>
                    <span className="font-semibold text-gray-900">12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Cancelación:</span>
                    <span className="font-semibold text-gray-900">Gratuita 24h</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/60">
                    <span>Mascotas:</span>
                    <span className="font-semibold text-gray-900">No permitidas</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>WiFi:</span>
                    <span className="font-semibold text-green-600">Gratuito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Espaciado adicional al final para asegurar que todo se vea completo */}
      <div className="h-32 lg:h-24"></div>
    </div>
  );
};

export default RoomDetail;