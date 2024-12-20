"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  // Mover una tarjeta al centro al hacer clic
  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center uppercase">
        Alojamiento
      </h1>

      {/* Contenedor del carrusel */}
      <div className="relative overflow-hidden">
        <div
          className="flex justify-center items-center gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex - 2) * 340
            }px)`, // Mueve el carrusel para centrar
          }}
        >
          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`flex-shrink-0 transition-transform duration-500 cursor-pointer ${
                  isCenter
                    ? "scale-105 z-10 opacity-100"
                    : "scale-90 opacity-70"
                }`}
                style={{
                  width: "300px",
                  marginLeft: isCenter ? "0" : "5px",
                  marginRight: isCenter ? "0" : "5px",
                }}
              >
                <div className="border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48"
                  />
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
      </div>
    </div>
  );
};

export default RoomCarousel;
