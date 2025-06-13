"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';
import CustomCalendar from '../ui/customCalendar';
import { RoomsDropdown, GuestsDropdown } from '../ui/elegantDropdown';
import { Button } from '../ui/button';

interface DateRange {
  from?: Date;
  to?: Date;
}

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [formData, setFormData] = useState({
    rooms: 1,
    guests: 2
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDateSelect = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
    if (newDateRange.from && newDateRange.to) {
      setShowCalendar(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    console.log('Searching...', { dateRange, ...formData });
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[10000ms] ease-out"
        style={{
          backgroundImage: "url('/HotelBackground.jpeg')",
        }}
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 transition-opacity duration-1000" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        
        {/* Hero Title with Staggered Animation */}
        <div className="mb-8">
          <h1 
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4 transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Bienvenido al{' '}
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Hotel Juan María
            </span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl lg:text-2xl text-gray-200 font-light max-w-2xl mx-auto transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ animationDelay: '0.6s' }}
          >
            Descubre el confort y el lujo en el mejor hotel de Tuluá
          </p>
        </div>

        {/* Booking Form with Glassmorphism */}
        <div 
          className={`bg-white/10 backdrop-blur-2xl rounded-xl p-8 border border-white/20 shadow-2xl max-w-5xl mx-auto transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'
          }`}
          style={{ animationDelay: '1s' }}
        >
          
          {/* Form Grid - Modified for better spacing */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            
            {/* Date Selector - Takes 4 columns on large screens */}
            <div className="md:col-span-2 lg:col-span-4 group">
              <label className="block text-sm font-medium text-white mb-2 transition-colors duration-300">
                Fechas de estadía
              </label>
              <button
                type="button"
                onClick={() => setShowCalendar(true)}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border-2 border-white/40 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 hover:bg-white/40 relative group/date"
              >
                <div className="flex items-center justify-between">
                  <span className={dateRange.from ? 'text-white font-medium' : 'text-gray-200'}>
                    {dateRange.from && dateRange.to 
                      ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
                      : 'Seleccionar fechas'
                    }
                  </span>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                
                {/* Efecto hover más visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover/date:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                
                {/* Indicador de que es interactivo */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/50 rounded-full opacity-0 group-hover/date:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Rooms Dropdown - Takes 2 columns on large screens */}
            <div className="md:col-span-1 lg:col-span-2">
              <RoomsDropdown
                label="Habitaciones"
                value={formData.rooms}
                onChange={(value) => handleInputChange('rooms', value)}
                placeholder="Seleccionar habitaciones"
              />
            </div>

            {/* Guests Dropdown - Takes 2 columns on large screens */}
            <div className="md:col-span-1 lg:col-span-2">
              <GuestsDropdown
                label="Huéspedes"
                value={formData.guests}
                onChange={(value) => handleInputChange('guests', value)}
                placeholder="Seleccionar huéspedes"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full md:w-auto mx-auto block shadow-2xl"
          >
            <Search className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Ver Disponibilidad
          </Button>

          {/* Floating form highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-xl pointer-events-none"></div>
          
          {/* Shimmer effects */}
          <div className="absolute top-4 right-8 w-1 h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse opacity-60"></div>
          <div className="absolute bottom-6 left-12 w-6 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`mt-12 transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-60' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '1.8s' }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Custom Calendar Modal */}
      <CustomCalendar
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
        initialRange={dateRange}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
      </div>
    </div>
  );
};

export default HeroSection;