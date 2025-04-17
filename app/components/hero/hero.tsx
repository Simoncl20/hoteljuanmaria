"use client";

import { useState } from "react";

const Hero = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  return (
    <div 
      className="relative"
      style={{ 
        // Let's try multiple approaches to load the background image:
        backgroundImage: `url('/HotelBackground.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: "calc(100vh - 80px)",
        marginTop: "80px" // Add top margin for navbar height
      }}
    >
      {/* Overlay with darker opacity */}
      <div 
        className="absolute inset-0 bg-black opacity-50"
      ></div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 py-16">
        {/* Hero text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 font-serif">
            Bienvenido al Hotel Juan María
          </h1>
          <p className="text-lg mt-4">
            Descubre el confort y el lujo en el mejor hotel de Tuluá
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-4xl bg-black/80 rounded-md">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col">
                <label className="text-base mb-2">Fecha de llegada</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="bg-transparent text-white border-b border-white w-full pb-2 focus:outline-none"
                  />
                  <svg 
                    className="absolute right-2 top-1" 
                    width="16" height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-base mb-2">Fecha de salida</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="bg-transparent text-white border-b border-white w-full pb-2 focus:outline-none"
                  />
                  <svg 
                    className="absolute right-2 top-1" 
                    width="16" height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-base mb-2">Habitaciones</label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  className="bg-transparent text-white border-b border-white w-full pb-2 focus:outline-none appearance-none"
                >
                  <option value={1} className="bg-gray-800">1</option>
                  <option value={2} className="bg-gray-800">2</option>
                  <option value={3} className="bg-gray-800">3</option>
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-base mb-2">Huéspedes</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="bg-transparent text-white border-b border-white w-full pb-2 focus:outline-none appearance-none"
                >
                  <option value={1} className="bg-gray-800">1</option>
                  <option value={2} className="bg-gray-800">2</option>
                  <option value={3} className="bg-gray-800">3</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="border border-white text-white px-8 py-3 rounded hover:bg-white hover:text-black transition-all duration-300">
                Ver Disponibilidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;