"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Definimos el tipo de los datos de las diapositivas
interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkRates: string;
  linkDetails: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Habitación Grand Premier",
    description:
      "La luz natural inunda estas elegantes habitaciones con vista a la calle, que ofrecen un amplio espacio para trabajar o descansar.",
    imageUrl:
      "https://www.fourseasons.com/alt/img-opt/~75.701/publish/content/dam/fourseasons/images/web/BHA/BHA_034_aspect16x9.jpg",
    linkRates:
      "https://reservations.fourseasons.com/es?hotelCode=BOG923&roomOwsCodes=P1K,P1Q,P2Q",
    linkDetails: "/es/bogota/accommodations/guest_rooms/premier_room/",
  },
  {
    id: 2,
    title: "Suite Premier de una habitación",
    description:
      "Con dos salas de estar, estas elegantes y cómodas suites son perfectas para recibir invitados.",
    imageUrl:
      "https://www.fourseasons.com/alt/img-opt/~75.701/publish/content/dam/fourseasons/images/web/BHA/BHA_040_aspect16x9.jpg",
    linkRates:
      "https://reservations.fourseasons.com/es?hotelCode=BOG923&roomOwsCodes=T1K",
    linkDetails:
      "/es/bogota/accommodations/suites/one_bedroom_premier_suite/",
  },
  {
    id: 3,
    title: "Suite Ejecutiva Four Seasons",
    description:
      "Resulta fácil acomodarse en estas modernas suites gracias a su decoración ultra elegante, sus amplias salas de estar y su abundante luz natural.",
    imageUrl:
      "https://www.fourseasons.com/alt/img-opt/~75.701/publish/content/dam/fourseasons/images/web/BHA/BHA_096_aspect16x9.jpg",
    linkRates:
      "https://reservations.fourseasons.com/es?hotelCode=BOG923&roomOwsCodes=F1Q",
    linkDetails:
      "/es/bogota/accommodations/suites/four_seasons_executive_suite/",
  },
  {
    id: 4,
    title: "Suite del Penthouse",
    description:
      "Una estadía en esta aislada suite estilo apartamento le permite disfrutar de una terraza privada, una chimenea de leña, sábanas de algodón egipcio y flores frescas, solo para usted.",
    imageUrl:
      "https://www.fourseasons.com/alt/img-opt/~75.701.0,0000-0,0000-1600,0000-900,0000/publish/content/dam/fourseasons/images/web/BHA/BHA_257_aspect16x9.jpg",
    linkRates:
      "https://reservations.fourseasons.com/es?hotelCode=BOG923&roomOwsCodes=Z1K",
    linkDetails:
      "/es/bogota/accommodations/specialty_suites/penthouse_suite/",
  },
  {
    id: 5,
    title: "Habitación Deluxe",
    description:
      "Esta cómoda y amplia habitación cuenta con elegantes pisos de madera y ventanales que ofrecen vistas del colorido barrio circundante.",
    imageUrl:
      "https://www.fourseasons.com/alt/img-opt/~75.701/publish/content/dam/fourseasons/images/web/BHA/BHA_097_aspect16x9.jpg",
    linkRates:
      "https://reservations.fourseasons.com/es?hotelCode=BOG923&roomOwsCodes=A1Q",
    linkDetails: "/es/bogota/accommodations/guest_rooms/deluxe_room/",
  },
];

const RoomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(2); // Índice inicial centrado
  const cardWidth = 340; // Ancho de cada tarjeta incluyendo márgenes
  const centerPosition = 2; // Posición central en el carrusel (0-indexed)

  // Mover una tarjeta al centro al hacer clic
  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Función para mover a la izquierda con scroll infinito
  const handlePrevClick = () => {
    // Si estamos en la primera slide, vamos a la última
    if (currentIndex <= 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para mover a la derecha con scroll infinito
  const handleNextClick = () => {
    // Si estamos en la última slide, volvemos a la primera
    if (currentIndex >= slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Calcular la transformación para centrar la tarjeta actual
  const calculateTransform = () => {
    return -(currentIndex - centerPosition) * cardWidth;
  };

  // Añadir control de teclado para navegación (opcional)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevClick();
      } else if (e.key === "ArrowRight") {
        handleNextClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center uppercase">
        Alojamiento
      </h1>

      {/* Contenedor del carrusel */}
      <div className="relative overflow-hidden">
        {/* Botón Izquierda */}
        <button
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label="Anterior habitación"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Carrusel */}
        <div
          className="flex justify-center items-center gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${calculateTransform()}px)`,
          }}
        >
          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`flex-shrink-0 transition-all duration-500 cursor-pointer ${
                  isCenter
                    ? "scale-105 z-10 opacity-100"
                    : "scale-90 opacity-70"
                }`}
                style={{
                  width: "300px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                <div className="border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-gray-600 my-2">
                      {slide.description}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Link href={slide.linkRates} legacyBehavior>
                        <a className="text-sm font-bold text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition">
                          Verificar tarifas
                        </a>
                      </Link>
                      <Link href={slide.linkDetails} legacyBehavior>
                        <a className="text-sm font-bold text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition">
                          Detalles
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Derecha */}
        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label="Siguiente habitación"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Indicadores de posición */}
        <div className="flex justify-center mt-8 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-black w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir a habitación ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCarousel;