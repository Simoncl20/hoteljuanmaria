"use client";

import RoomCarousel from './components/roomCarousel/roomCarousel';
import Hero from './components/hero/hero';
import TestimonialsShowcase from './components/testimonials/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-16 bg-gray-50">
        <RoomCarousel />
      </div>
      <TestimonialsShowcase />
    </>
  );
}