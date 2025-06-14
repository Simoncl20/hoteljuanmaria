'use client'

import { useState, useEffect, useRef } from 'react'
import { getTimeline, getMajorMilestones, getHistoryStats } from '../../lib/data'

interface TimelineEvent {
  id: number;
  year: number;
  date?: string;
  yearRange?: string;
  title: string;
  description: string;
  type: 'legal' | 'hito' | 'crecimiento' | 'modernizacion' | 'cultural' | 'aniversario' | 'actual';
  importance: 'alto' | 'medio' | 'bajo';
  icon: string;
}

interface HistoryStats {
  foundedYear: number;
  openedYear: number;
  yearsInService: number;
  legalAnniversary: number;
  operationalAnniversary: number;
}

const typeColors = {
  legal: 'from-indigo-500/20 to-purple-500/20',
  hito: 'from-emerald-500/20 to-teal-500/20', 
  crecimiento: 'from-blue-500/20 to-cyan-500/20',
  modernizacion: 'from-orange-500/20 to-red-500/20',
  cultural: 'from-pink-500/20 to-rose-500/20',
  aniversario: 'from-amber-500/20 to-yellow-500/20',
  actual: 'from-gray-500/20 to-slate-500/20'
}

const typeIcons = {
  legal: '⚖️',
  hito: '🏆',
  crecimiento: '📈',
  modernizacion: '🔧',
  cultural: '🎨',
  aniversario: '🎉',
  actual: '⭐'
}

const typeLabels = {
  legal: 'Legal',
  hito: 'Hito',
  crecimiento: 'Crecimiento',
  modernizacion: 'Modernización',
  cultural: 'Cultural',
  aniversario: 'Aniversario',
  actual: 'Actual'
}

export default function HistoryTimeline() {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [stats, setStats] = useState<HistoryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [timelineData, statsData] = await Promise.all([
          getTimeline(),
          getHistoryStats()
        ])
        
        if (!timelineData || !Array.isArray(timelineData) || !statsData) {
          setError('Error al cargar los datos')
          return
        }
        
        setTimeline(timelineData)
        setStats(statsData)
        
      } catch (error) {
        console.error('Error loading data:', error)
        setError('Error al cargar la información')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || timeline.length === 0) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Solo calcular progreso cuando el sticky está activo
      if (rect.top <= 0 && rect.bottom > windowHeight) {
        // Progreso basado en cuánto hemos scrolleado dentro del contenedor
        const scrolledIntoView = Math.abs(rect.top)
        const totalScrollableHeight = container.offsetHeight - windowHeight
        const progress = Math.min(1, Math.max(0, scrolledIntoView / totalScrollableHeight))
        
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Llamada inicial

    return () => window.removeEventListener('scroll', handleScroll)
  }, [timeline.length])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl p-8">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin"/>
            <span className="font-sans font-light text-gray-700">Cargando historia...</span>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse opacity-50 rounded-xl"/>
        </div>
      </div>
    )
  }

  if (error || !timeline || !stats) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl p-8 text-center max-w-md">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 rounded-xl"/>
          
          <div className="relative z-10">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-light">!</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Error al cargar</h3>
            <p className="font-sans font-light text-gray-600 mb-6">{error}</p>
            
            <button 
              onClick={() => window.location.reload()} 
              className="relative font-sans font-medium rounded-lg overflow-hidden transition-all duration-700 px-6 py-3 text-white group"
            >
              <span className="relative z-10">Reintentar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black"/>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Calcular el índice activo y la interpolación entre eventos
  const totalEvents = timeline.length
  const exactProgress = scrollProgress * totalEvents // Cambié aquí para incluir el último evento
  const activeIndex = Math.min(Math.floor(exactProgress), totalEvents - 1)
  const nextIndex = Math.min(activeIndex + 1, totalEvents - 1)
  const interpolation = exactProgress - activeIndex
  
  const activeEvent = timeline[activeIndex] || timeline[0]
  const nextEvent = timeline[nextIndex] || timeline[0]

  return (
    <div ref={containerRef} className="relative" style={{ height: `${Math.max(timeline.length * 120, 500)}vh` }}>
      {/* Sticky Container */}
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        
        {/* Debug info - quitar después */}
        <div className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded text-xs z-50">
          Progress: {(scrollProgress * 100).toFixed(1)}% | Active: {activeIndex} | Total: {timeline.length}
        </div>
        
        {/* Liquid background with floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl transition-all duration-[3s] ease-out"
            style={{
              left: `${10 + scrollProgress * 40}%`,
              top: `${20 + scrollProgress * 30}%`,
              opacity: 0.6 - scrollProgress * 0.2
            }}
          />
          <div 
            className="absolute w-64 h-64 bg-gray-100/10 rounded-full blur-3xl transition-all duration-[4s] ease-out"
            style={{
              right: `${15 + scrollProgress * 35}%`,
              bottom: `${25 + scrollProgress * 20}%`,
              opacity: 0.4 - scrollProgress * 0.1
            }}
          />
          <div 
            className="absolute w-32 h-32 bg-white/5 rounded-full blur-3xl transition-all duration-[5s] ease-out"
            style={{
              left: `${60 + scrollProgress * 20}%`,
              top: `${10 + scrollProgress * 50}%`,
              opacity: 0.3
            }}
          />
          
          {/* Liquid waves */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent transition-all duration-1000"
              style={{ opacity: 0.3 + scrollProgress * 0.4 }}
            />
            <div 
              className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent transition-all duration-1000"
              style={{ opacity: 0.3 + scrollProgress * 0.4 }}
            />
          </div>
        </div>

        {/* Header con efecto de parallax - más abajo por navbar */}
        <div 
          className={`relative text-center pt-32 pb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translateY(${scrollProgress * -30}px)`,
            opacity: 1 - scrollProgress * 0.3
          }}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Nuestra Historia
          </h2>
          
          <div className="relative inline-block">
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-xl px-8 py-4 overflow-hidden">
              <span className="relative z-10 font-sans font-light text-lg md:text-xl text-gray-800">
                {stats.yearsInService} años de excelencia
              </span>
              
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-xl"/>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"/>
            </div>
          </div>
        </div>

        {/* Timeline horizontal */}
        <div className="relative px-8 flex-1 flex flex-col justify-center">
          
          {/* Timeline line con progreso */}
          <div className="relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent transform -translate-y-1/2"/>
            
            {/* Progress line animada */}
            <div 
              className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 transform -translate-y-1/2 transition-all duration-100 ease-out"
              style={{
                width: `${(scrollProgress * 100)}%`
              }}
            />
            
            {/* Timeline dots con transiciones suaves */}
            <div className="flex justify-between items-center relative">
              {timeline.map((event, index) => {
                const dotProgress = exactProgress
                const isActive = Math.abs(dotProgress - index) < 0.5
                const isPassed = dotProgress > index + 0.5
                const isTransitioning = Math.abs(dotProgress - index) < 1
                
                // Calcular el tamaño basado en la proximidad al punto activo
                let scale = 1
                if (isActive) {
                  scale = 1.4
                } else if (isPassed) {
                  scale = 1.2
                } else if (isTransitioning) {
                  const distance = Math.abs(dotProgress - index)
                  scale = 1 + (1 - distance) * 0.2
                }
                
                return (
                  <div
                    key={event.id}
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg' 
                        : isPassed
                        ? 'bg-gray-600'
                        : 'bg-gray-300'
                    }`}
                    style={{
                      transform: `scale(${scale}) translateY(${Math.sin(dotProgress * 0.5 + index) * 2}px)`,
                      zIndex: isActive ? 10 : isPassed ? 5 : 1
                    }}
                  >
                    {/* Ripple effect para el punto activo */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-gray-400/50 animate-ping"/>
                    )}
                    
                    {/* Progress ring para transiciones */}
                    {isTransitioning && !isPassed && (
                      <div 
                        className="absolute inset-0 rounded-full border-2 border-gray-600"
                        style={{
                          opacity: 1 - Math.abs(dotProgress - index),
                          transform: `scale(${1.2 + Math.abs(dotProgress - index) * 0.3})`
                        }}
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-full"/>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Event Card */}
          <div className="relative h-96 flex items-center justify-center">
            <div 
              className="relative bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden w-full max-w-5xl h-full transition-all duration-700"
              style={{
                transform: `translateX(${(scrollProgress - 0.5) * 50}px) scale(${0.95 + scrollProgress * 0.1})`
              }}
            >
              
              {/* Liquid glass layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl"/>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"/>
              
              {/* Content con transición entre eventos */}
              <div className="relative z-10 p-12 h-full flex flex-col justify-center">
                
                {/* Category and Year con transición suave */}
                <div className="flex items-center gap-4 mb-8 transition-all duration-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full"/>
                    <span className="font-sans font-light text-sm text-gray-600 uppercase tracking-wider">
                      {typeLabels[activeEvent.type]}
                    </span>
                  </div>
                  
                  <div className="h-4 w-px bg-gray-300/50"/>
                  
                  <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-4 py-2 rounded-lg font-sans font-light text-sm">
                    {activeEvent.yearRange || activeEvent.year}
                  </div>
                </div>

                {/* Title simplificado */}
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-700">
                  {activeEvent.title}
                </h3>

                {/* Description simplificada */}
                <p className="font-sans font-light text-xl text-gray-700 leading-relaxed max-w-4xl mb-8 transition-all duration-700">
                  {activeEvent.description}
                </p>

                {/* Importance Indicator */}
                {activeEvent.importance === 'alto' && (
                  <div className="mt-4 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-2 animate-pulse"/>
                    <span className="text-xs font-medium text-gray-700">Hito Importante</span>
                  </div>
                )}

                {/* Type Label */}
                <div className="mt-2">
                  <span className="text-xs font-medium text-gray-600">
                    {typeLabels[activeEvent.type]}
                  </span>
                </div>
              </div>

              {/* Shimmer effects */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div 
                  className="absolute top-12 right-12 w-1 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-45 transition-opacity duration-1000"
                  style={{ opacity: scrollProgress }}
                />
                <div 
                  className="absolute bottom-12 left-12 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-1000"
                  style={{ opacity: scrollProgress, animationDelay: '0.5s' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botón de skip - solo visible durante esta sección */}
        <button 
          onClick={() => {
            const endElement = containerRef.current
            if (endElement) {
              window.scrollTo({
                top: endElement.offsetTop + endElement.offsetHeight - window.innerHeight,
                behavior: 'smooth'
              })
            }
          }}
          className="fixed bottom-8 left-8 z-50 group transition-all duration-700"
          style={{
            opacity: isVisible && scrollProgress < 0.95 ? 1 : 0,
            transform: `translateY(${isVisible && scrollProgress < 0.95 ? 0 : 50}px)`
          }}
        >
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-lg px-4 py-3 shadow-lg transition-all duration-500 hover:bg-white/20 hover:scale-110">
            <span className="relative z-10 font-sans font-light text-sm text-gray-700 flex items-center gap-2">
              Saltar historia
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Efectos del design system */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-lg"/>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"/>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-45 animate-pulse"/>
            </div>
          </div>
        </button>

        {/* Progress hint mejorado */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{
            opacity: isVisible ? (0.5 - scrollProgress * 0.5) : 0
          }}
        >
          <div className="text-center">
            <div className="font-sans font-light text-sm text-gray-500 mb-2">
              Continúa scrolleando para explorar
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-gray-400 to-transparent mx-auto animate-pulse"/>
          </div>
        </div>
      </div>
    </div>
  )
}