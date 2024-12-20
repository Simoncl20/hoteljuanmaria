"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Datos del carrusel
const slides = [
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center uppercase">
        Alojamiento
      </h1>

      <div className="relative">
        {/* Contenedor del carrusel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-shrink-0 w-full p-4 flex justify-center"
              >
                <div className="max-w-sm bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-2 text-gray-800">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {slide.description}
                    </p>
                    <div className="flex justify-between">
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
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          &#8594;
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default RoomCarousel;
