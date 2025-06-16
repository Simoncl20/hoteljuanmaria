"use client";

import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Clock, Utensils, Car, Wifi, Shield, Heart, Plane, X, Leaf, CreditCard, Database } from 'lucide-react';
import { getFAQ } from '../lib/data';

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  questions: FAQQuestion[];
}

const FAQPage: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [faqData, setFaqData] = useState<FAQData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFAQData = async () => {
      try {
        const data = await getFAQ();
        setFaqData(data);
      } catch (error) {
        console.error('Error loading FAQ:', error);
      } finally {
        setLoading(false);
      }
    };

  console.log('FAQ Data loaded:', faqData); // Debug principal
  console.log('Open question state:', openQuestion); // Debug estado
  }, []);

  // Organizar preguntas por categorías usando una lógica más flexible
  const getQuestionCategory = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes("check-in") || q.includes("check-out") || q.includes("cancelar") || q.includes("pago") || q.includes("horarios")) {
      return "Reservas y Políticas";
    }
    if (q.includes("desayuno") || q.includes("spa") || q.includes("transporte") || q.includes("aeropuerto")) {
      return "Servicios del Hotel";
    }
    if (q.includes("estacionamiento") || q.includes("wifi") || q.includes("fumadores") || q.includes("habitaciones")) {
      return "Instalaciones";
    }
    if (q.includes("mascotas") || q.includes("datos") || q.includes("sostenibilidad")) {
      return "Políticas Especiales";
    }
    return "General";
  };

  // Crear categorías dinámicamente basadas en las preguntas
  const faqCategories = [
    {
      title: "Reservas y Políticas",
      icon: <Clock className="w-5 h-5" />,
      questions: faqData?.questions.filter(qa => getQuestionCategory(qa.question) === "Reservas y Políticas") || []
    },
    {
      title: "Servicios del Hotel",
      icon: <Utensils className="w-5 h-5" />,
      questions: faqData?.questions.filter(qa => getQuestionCategory(qa.question) === "Servicios del Hotel") || []
    },
    {
      title: "Instalaciones",
      icon: <Car className="w-5 h-5" />,
      questions: faqData?.questions.filter(qa => getQuestionCategory(qa.question) === "Instalaciones") || []
    },
    {
      title: "Políticas Especiales",
      icon: <Shield className="w-5 h-5" />,
      questions: faqData?.questions.filter(qa => getQuestionCategory(qa.question) === "Políticas Especiales") || []
    },
    {
      title: "General",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: faqData?.questions.filter(qa => getQuestionCategory(qa.question) === "General") || []
    }
  ];

  const getQuestionIcon = (question: string) => {
    if (question.includes("check-in") || question.includes("horarios")) return <Clock className="w-4 h-4" />;
    if (question.includes("desayuno")) return <Utensils className="w-4 h-4" />;
    if (question.includes("estacionamiento")) return <Car className="w-4 h-4" />;
    if (question.includes("WiFi")) return <Wifi className="w-4 h-4" />;
    if (question.includes("mascotas") || question.includes("fumadores")) return <Shield className="w-4 h-4" />;
    if (question.includes("spa")) return <Heart className="w-4 h-4" />;
    if (question.includes("aeropuerto")) return <Plane className="w-4 h-4" />;
    if (question.includes("cancelar")) return <X className="w-4 h-4" />;
    if (question.includes("sostenibilidad")) return <Leaf className="w-4 h-4" />;
    if (question.includes("pago")) return <CreditCard className="w-4 h-4" />;
    if (question.includes("datos")) return <Database className="w-4 h-4" />;
    return <HelpCircle className="w-4 h-4" />;
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const questionId = `${categoryIndex}-${questionIndex}`;
    console.log('Toggling question:', questionId, 'Current open:', openQuestion); // Debug
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl p-8">
          <div className="animate-pulse flex items-center gap-4">
            <HelpCircle className="w-8 h-8 text-white/70" />
            <span className="text-white/70 font-sans text-lg">Cargando preguntas frecuentes...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!faqData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <HelpCircle className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <p className="text-lg">Error al cargar las preguntas frecuentes</p>
        </div>
      </div>
    );
  }

  const totalQuestions = faqData.questions.length;
  const categoriesWithQuestions = faqCategories.filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/6 w-36 h-36 bg-white/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/5 right-1/6 w-44 h-44 bg-white/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/5 left-2/5 w-28 h-28 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16 transform transition-all duration-1000 translate-y-0 opacity-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl mb-8 relative group">
            <HelpCircle className="w-10 h-10 text-white" />
            {/* Shimmer effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-2 right-3 w-1 h-4 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
              <div className="absolute bottom-2 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
            </div>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {faqData.title}
          </h1>
          <p className="font-sans text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-8">
            Encuentre respuestas rápidas a las preguntas más comunes sobre nuestros servicios y políticas.
          </p>
        </div>

        {/* Quick Stats with improved hover */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:bg-white/15 hover:shadow-3xl group">
            <div className="p-6 text-center relative z-10">
              <div className="font-sans text-3xl font-bold text-white mb-1 transition-transform duration-300 group-hover:scale-110">{totalQuestions}</div>
              <p className="font-sans text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Preguntas Respondidas</p>
            </div>
            
            {/* Floating highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
            
            {/* Shimmer effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-3 right-4 w-1 h-4 bg-gradient-to-b from-transparent via-white/40 to-transparent rotate-45 animate-pulse"/>
              <div className="absolute bottom-3 left-4 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}/>
            </div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:bg-white/15 hover:shadow-3xl group" style={{animationDelay: '100ms'}}>
            <div className="p-6 text-center relative z-10">
              <div className="font-sans text-3xl font-bold text-white mb-1 transition-transform duration-300 group-hover:scale-110">{categoriesWithQuestions.length}</div>
              <p className="font-sans text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Categorías</p>
            </div>
            
            {/* Floating highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
            
            {/* Shimmer effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-3 right-4 w-1 h-4 bg-gradient-to-b from-transparent via-white/40 to-transparent rotate-45 animate-pulse"/>
              <div className="absolute bottom-3 left-4 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}/>
            </div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:bg-white/15 hover:shadow-3xl group" style={{animationDelay: '200ms'}}>
            <div className="p-6 text-center relative z-10">
              <div className="font-sans text-3xl font-bold text-white mb-1 transition-transform duration-300 group-hover:scale-110">24/7</div>
              <p className="font-sans text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Ayuda Disponible</p>
            </div>
            
            {/* Floating highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
            
            {/* Shimmer effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-3 right-4 w-1 h-4 bg-gradient-to-b from-transparent via-white/40 to-transparent rotate-45 animate-pulse"/>
              <div className="absolute bottom-3 left-4 w-3 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{animationDelay: '0.2s'}}/>
            </div>
          </div>
        </div>

        {/* FAQ Categories - Restored with working functionality */}
        <div className="space-y-8">
          {categoriesWithQuestions.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl"
              style={{animationDelay: `${categoryIndex * 100}ms`}}
            >
              {/* Category Header */}
              <div className="p-6 border-b border-gray-200/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg flex items-center justify-center text-white">
                    {category.icon}
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200/30">
                {category.questions.map((qa, questionIndex) => {
                  const questionId = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openQuestion === questionId;
                  
                  return (
                    <div key={questionIndex} className="relative group">
                      <button
                        onClick={() => {
                          console.log('Button clicked for question:', questionId);
                          setOpenQuestion(openQuestion === questionId ? null : questionId);
                        }}
                        className="w-full p-6 text-left transition-all duration-300 focus:outline-none relative overflow-hidden group hover:bg-gradient-to-r hover:from-gray-50/30 hover:to-white/20"
                      >
                        {/* Subtle hover background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 text-gray-600 group-hover:text-gray-800 transition-colors duration-300 group-hover:scale-110 transform">
                              {getQuestionIcon(qa.question)}
                            </div>
                            <h3 className="font-sans text-base md:text-lg font-medium text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                              {qa.question}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 text-gray-600 group-hover:text-gray-800 transition-all duration-300">
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            ) : (
                              <ChevronDown className="w-5 h-5 transform group-hover:scale-110 group-hover:translate-y-0.5 transition-transform duration-300" />
                            )}
                          </div>
                        </div>

                        {/* Shimmer effects on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute top-3 right-8 w-1 h-4 bg-gradient-to-b from-transparent via-gray-300/40 to-transparent rotate-45 animate-pulse"/>
                          <div className="absolute bottom-3 left-8 w-3 h-0.5 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                        </div>
                      </button>
                      
                      {/* Answer with smooth animation */}
                      {isOpen && (
                        <div className="px-6 pb-6 bg-gradient-to-r from-gray-50/40 via-white/30 to-gray-50/40 border-t border-gray-200/20 animate-in slide-in-from-top-2 duration-500">
                          <div className="pl-7 pr-4 pt-4">
                            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
                              {qa.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Card floating highlights */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"/>
              
              {/* Card shimmer effects */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent rotate-45 animate-pulse"/>
                <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl">
          <div className="p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              ¿No encontró su respuesta?
            </h3>
            <p className="font-sans text-base text-white/80 mb-6 max-w-md mx-auto">
              Nuestro equipo de atención al cliente está disponible para ayudarle con cualquier consulta adicional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30">
                <span className="relative z-10 flex items-center justify-center">
                  Contactar Soporte
                  <div className="ml-2 w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"/>
                </span>
                
                {/* Floating highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                
                {/* Shimmer effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                  <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                </div>
              </button>

              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group px-6 py-3 border border-white/30 text-white hover:border-white/50 hover:bg-white/10"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Volver al inicio
                  <div className="ml-2 w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"/>
                </span>
                
                {/* Shimmer effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
                  <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                </div>
              </button>
            </div>
          </div>
          
          {/* Floating highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"/>
          
          {/* Shimmer effects */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
            <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;