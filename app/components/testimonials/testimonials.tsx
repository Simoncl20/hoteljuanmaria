'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, MapPin, Calendar, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials, getTestimonialStats, getTestimonialHighlights, getTestimonialsBackgroundImage } from '../../lib/data';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  featured: boolean;
  platform?: string;
  scores?: {
    habitaciones: number;
    servicio: number;
    ubicacion: number;
  };
  travelType?: string;
  highlights?: string[];
}

interface TestimonialStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    [key: string]: number;
  };
  platforms?: {
    [key: string]: number;
  };
  averageScores?: {
    habitaciones: number;
    servicio: number;
    ubicacion: number;
  };
}

export default function TestimonialsShowcase() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<TestimonialStats | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [testimonialsData, statsData, highlightsData, backgroundImageData] = await Promise.all([
          getTestimonials(),
          getTestimonialStats(),
          getTestimonialHighlights(),
          getTestimonialsBackgroundImage()
        ]);
        
        setTestimonials(testimonialsData);
        setStats(statsData);
        setHighlights(highlightsData);
        setBackgroundImage(backgroundImageData);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredTestimonials = testimonials.filter(t => t.featured);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-white/70 backdrop-blur-xl rounded-xl mx-auto mb-4"></div>
          <div className="text-gray-600 font-serif">Cargando testimonios...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="Hotel Juan María"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-black/50"/>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10"/>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16" style={{animationDelay: '0ms'}}>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Experiencias
            <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Inolvidables
            </span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-lg">
            Descubre lo que nuestros huéspedes dicen sobre su estadía en Hotel Juan María
          </p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16" style={{animationDelay: '200ms'}}>
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-6 text-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
              </div>
              <TrendingUp className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">{stats.averageRating}</div>
              <div className="font-sans text-sm text-gray-600">Rating Promedio</div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>

            <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-6 text-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
              </div>
              <Users className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">{stats.totalReviews}</div>
              <div className="font-sans text-sm text-gray-600">Reseñas Totales</div>
            </div>

            {stats.averageScores && (
              <>
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-6 text-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                  <Award className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                  <div className="font-serif text-3xl font-bold text-gray-900 mb-1">{stats.averageScores.servicio}</div>
                  <div className="font-sans text-sm text-gray-600">Servicio</div>
                </div>

                <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-6 text-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                  <MapPin className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                  <div className="font-serif text-3xl font-bold text-gray-900 mb-1">{stats.averageScores.ubicacion}</div>
                  <div className="font-sans text-sm text-gray-600">Ubicación</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Featured Testimonials Carousel */}
        <div className="mb-16" style={{animationDelay: '400ms'}}>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Testimonios Destacados
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {featuredTestimonials.length > 0 && (
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"/>
                
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-white/40 mb-6" />
                
                {/* Testimonial Content */}
                <div className="relative z-10 flex-grow flex flex-col justify-center">
                  <blockquote className="font-sans text-lg md:text-xl text-white/95 leading-relaxed mb-8 line-clamp-6">
                    "{featuredTestimonials[currentSlide]?.comment}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                        <span className="text-white font-semibold text-lg">
                          {featuredTestimonials[currentSlide]?.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-white">
                          {featuredTestimonials[currentSlide]?.name}
                        </div>
                        <div className="text-white/80 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {featuredTestimonials[currentSlide]?.location}
                        </div>
                        <div className="text-white/70 text-sm flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featuredTestimonials[currentSlide]?.date)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        {renderStars(featuredTestimonials[currentSlide]?.rating)}
                      </div>
                      {featuredTestimonials[currentSlide]?.platform && (
                        <div className="text-sm text-white/70 bg-white/10 backdrop-blur-xl px-2 py-1 rounded-lg border border-white/20">
                          {featuredTestimonials[currentSlide]?.platform}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-lg p-2 hover:bg-white/30 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:text-white" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-lg p-2 hover:bg-white/30 transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:text-white" />
                </button>
                
                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-6">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white w-8' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Highlights Section */}
        {highlights.length > 0 && (
          <div className="mb-16" style={{animationDelay: '600ms'}}>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
              Lo Que Nos Destaca
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 p-6 group"
                  style={{animationDelay: `${800 + index * 100}ms`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                    <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
                  </div>
                  
                  <div className="relative z-10 flex items-center h-16">
                    <div className="w-3 h-3 bg-gradient-to-br from-white/70 via-white/50 to-white/30 rounded-full mr-3 flex-shrink-0"/>
                    <span className="font-sans text-white/95 font-medium">{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Testimonials Grid */}
        <div style={{animationDelay: '1000ms'}}>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Todas las Reseñas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="relative bg-white/10 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl p-6 group h-80 flex flex-col"
                style={{animationDelay: `${1200 + index * 100}ms`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                  <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {renderStars(testimonial.rating)}
                    </div>
                    {testimonial.platform && (
                      <span className="text-xs text-white/80 bg-white/10 backdrop-blur-xl px-2 py-1 rounded-lg border border-white/20">
                        {testimonial.platform}
                      </span>
                    )}
                  </div>
                  
                  <blockquote className="font-sans text-white/90 mb-4 flex-grow line-clamp-4 text-sm leading-relaxed">
                    "{testimonial.comment}"
                  </blockquote>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-white/70 text-xs flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                      
                      <div className="text-xs text-white/60">
                        {formatDate(testimonial.date)}
                      </div>
                    </div>
                    
                    {testimonial.travelType && (
                      <div className="text-xs text-white/70 bg-white/10 backdrop-blur-xl px-2 py-1 rounded-lg border border-white/20">
                        {testimonial.travelType}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}