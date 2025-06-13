"use client"

import React, { useState, useEffect, useRef, JSX } from 'react';
import { Shield, Heart, Users, TrendingUp, MapPin, Phone, Mail, Star, Calendar, Award } from 'lucide-react';
import { getAboutInfo } from '../../lib/data';

// Tipos para TypeScript
interface Value {
  title: string;
  description: string;
  icon: string;
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Stats {
  yearsOfExperience: number;
  satisfiedGuests: number;
  teamMembers: number;
  foundedYear: number;
}

interface AboutData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  story: {
    title: string;
    content: string;
    highlights: string[];
  };
  heritage: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
  values: Value[];
  qualityPolicy: {
    title: string;
    content: string;
  };
  team: TeamMember[];
  stats: Stats;
  panoramic: string;
  images: string[];
}

// Hook avanzado para animaciones de scroll
const useAdvancedScrollReveal = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      
      setScrollDirection(scrollTop > lastScrollY ? 'down' : 'up');
      setLastScrollY(scrollTop);
      setScrollProgress(progress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
            
            // Trigger staggered animations for children
            const children = entry.target.querySelectorAll('[data-stagger]');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-in');
              }, index * 100);
            });
          }
        });
      },
      { 
        threshold: [0.1, 0.3, 0.7], 
        rootMargin: '50px' 
      }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return { visibleElements, scrollProgress, scrollDirection };
};

// Hook para animaciones de contador
const useCounterAnimation = (endValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * endValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);
  
  return { count, setIsVisible };
};

{/* CSS siguiendo design system "Liquid Luxury" */}
<style jsx>{`
  @keyframes slideIn {
    from {
      transform: translateY(32px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slideIn {
    animation: slideIn 1000ms ease-out forwards;
  }
  
  /* Staggered animations */
  [data-stagger] > * {
    transform: translateY(32px);
    opacity: 0;
    animation: slideIn 1000ms ease-out forwards;
  }
  
  [data-stagger] > *:nth-child(1) { animation-delay: 100ms; }
  [data-stagger] > *:nth-child(2) { animation-delay: 200ms; }
  [data-stagger] > *:nth-child(3) { animation-delay: 300ms; }
  [data-stagger] > *:nth-child(4) { animation-delay: 400ms; }
`}</style>

// Estilos CSS mejorados con animaciones avanzadas
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(80px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-60px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-80px) rotate(-5deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(80px) rotate(5deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.5) rotate(10deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
  
  @keyframes slideUpStagger {
    from {
      opacity: 0;
      transform: translateY(100px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes morphFloat {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1); 
      border-radius: 20px;
      filter: blur(0px);
    }
    25% { 
      transform: translateY(-15px) rotate(1deg) scale(1.02); 
      border-radius: 30px;
      filter: blur(0.5px);
    }
    50% { 
      transform: translateY(-25px) rotate(-1deg) scale(1.05); 
      border-radius: 40px;
      filter: blur(1px);
    }
    75% { 
      transform: translateY(-15px) rotate(1deg) scale(1.02); 
      border-radius: 30px;
      filter: blur(0.5px);
    }
  }
  
  @keyframes liquidWave {
    0% { 
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 90%);
      transform: translateY(0px);
    }
    50% { 
      clip-path: polygon(0 0, 100% 0, 100% 90%, 0 85%);
      transform: translateY(-5px);
    }
    100% { 
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 90%);
      transform: translateY(0px);
    }
  }
  
  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
                  0 0 40px rgba(255, 255, 255, 0.2),
                  0 0 60px rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.5),
                  0 0 60px rgba(255, 255, 255, 0.3),
                  0 0 90px rgba(255, 255, 255, 0.2);
    }
  }
  
  @keyframes textReveal {
    from {
      opacity: 0;
      transform: rotateX(90deg) translateY(20px);
    }
    to {
      opacity: 1;
      transform: rotateX(0deg) translateY(0px);
    }
  }
  
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
    33% { transform: translate(30px, -30px) rotate(120deg); opacity: 0.8; }
    66% { transform: translate(-20px, -60px) rotate(240deg); opacity: 0.6; }
  }

  .animate-fadeInUp {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-fadeInDown {
    animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-fadeInLeft {
    animation: fadeInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-fadeInRight {
    animation: fadeInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-morphFloat {
    animation: morphFloat 6s ease-in-out infinite;
  }
  
  .animate-liquidWave {
    animation: liquidWave 4s ease-in-out infinite;
  }
  
  .animate-glowPulse {
    animation: glowPulse 3s ease-in-out infinite;
  }
  
  .animate-textReveal {
    animation: textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-particleFloat {
    animation: particleFloat 8s ease-in-out infinite;
  }

  /* Reveal animations */
  .reveal-element {
    opacity: 0;
    transform: translateY(80px) scale(0.9);
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .reveal-element.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* Staggered animations */
  [data-stagger] {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  [data-stagger].animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* Enhanced liquid cards */
  .liquid-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .liquid-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.8s;
  }

  .liquid-card:hover::before {
    left: 100%;
  }

  .liquid-card:hover {
    transform: translateY(-12px) scale(1.03);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.12),
                0 20px 40px rgba(0, 0, 0, 0.08),
                0 0 0 1px rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 255, 255, 0.5);
  }

  /* Enhanced image story cards */
  .image-story-card {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.7));
    backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .image-story-card:hover {
    transform: translateY(-15px) rotateX(2deg);
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.15),
                0 25px 50px rgba(0, 0, 0, 0.1);
  }

  /* Parallax containers */
  .parallax-slow {
    transform: translateY(calc(var(--scroll-y) * 0.3px));
  }
  
  .parallax-medium {
    transform: translateY(calc(var(--scroll-y) * 0.5px));
  }
  
  .parallax-fast {
    transform: translateY(calc(var(--scroll-y) * 0.8px));
  }

  /* Counter animation */
  .counter {
    font-variant-numeric: tabular-nums;
    transition: all 0.3s ease;
  }

  /* Text reveal effect */
  .text-reveal {
    perspective: 1000px;
  }
  
  .text-reveal .char {
    display: inline-block;
    opacity: 0;
    transform: rotateX(90deg) translateY(20px);
    animation: textReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Floating particles */
  .floating-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
    border-radius: 50%;
    pointer-events: none;
  }

  /* Section transitions */
  .section-transition {
    position: relative;
  }
  
  .section-transition::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 1s ease;
  }
  
  .section-transition.visible::before {
    opacity: 1;
  }

  /* Enhanced hero effects */
  .hero-title {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .scroll-progress {
    height: 100%;
    background: linear-gradient(90deg, #1f2937, #374151, #4b5563);
    transition: width 0.1s ease;
  }
`;

// Componente de icono dinámico
const IconComponent: React.FC<{ iconName: string; className?: string }> = ({ iconName, className = "w-6 h-6" }) => {
  const icons: Record<string, React.ComponentType<any>> = {
    'shield-check': Shield,
    'handshake': Users,
    'heart': Heart,
    'trending-up': TrendingUp,
    'calendar': Calendar,
    'award': Award
  };
  
  const Icon = icons[iconName] || Shield;
  return <Icon className={className} />;
};

// Componente de contador animado
const AnimatedCounter: React.FC<{ 
  endValue: number; 
  suffix?: string; 
  prefix?: string;
  className?: string; 
}> = ({ endValue, suffix = '', prefix = '', className = '' }) => {
  const { count, setIsVisible } = useCounterAnimation(endValue);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [setIsVisible]);
  
  return (
    <div ref={elementRef} className={`counter ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

// Componente de botón premium con efectos mejorados
const LiquidButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group px-8 py-4";
  
  const variants = {
    primary: "text-white",
    secondary: "border border-gray-300/60 text-gray-700 hover:border-gray-400",
    glass: "bg-white/20 backdrop-blur-lg border border-white/30 text-gray-800 hover:bg-white/30"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center justify-center font-medium">
        {children}
      </span>
      
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black"/>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
        </>
      )}
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-2 right-3 w-1 h-4 bg-white/40 rotate-45 animate-pulse"/>
        <div className="absolute bottom-2 left-4 w-3 h-0.5 bg-white/30 animate-pulse" style={{animationDelay: '0.5s'}}/>
      </div>
    </button>
  );
};

// Componente de botón siguiendo el design system original
const PremiumButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  showIndicator?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', showIndicator = false, className = '', ...props }) => {
  const baseClasses = "relative font-semibold rounded-lg overflow-hidden transition-all duration-700 group px-6 py-3";
  
  const variants = {
    primary: "text-white",
    secondary: "border border-gray-200/60 text-gray-700 hover:border-gray-300",
    ghost: "text-gray-600 hover:bg-gray-50/60"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {showIndicator && (
          <div className="ml-2 w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"/>
        )}
      </span>
      
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"/>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
        </>
      )}
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-1 right-2 w-1 h-3 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"/>
        <div className="absolute bottom-1 left-3 w-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
      </div>
    </button>
  );
};

// Componente de imagen como historia con efectos mejorados
const ImageStoryCard: React.FC<{
    src: string;
    title: string;
    description: string;
    stats?: { label: string; value: string }[];
    children?: React.ReactNode;
    className?: string;
    imagePosition?: 'left' | 'right' | 'top';
  }> = ({ src, title, description, stats, children, className = "", imagePosition = 'left' }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.3 }
      );
      
      if (cardRef.current) {
        observer.observe(cardRef.current);
      }
      
      return () => observer.disconnect();
    }, []);

    return (
      <div 
        ref={cardRef}
        className={`image-story-card rounded-2xl p-8 ${className} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
        data-reveal
      >
        <div className={`grid gap-16 ${
          imagePosition === 'top' ? 'grid-rows-2' : 
          imagePosition === 'right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
        }`}>
          
          {/* Imagen */}
          <div className={`relative ${imagePosition === 'right' ? 'order-2' : 'order-1'}`} data-stagger>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-200/50 via-white/50 to-gray-200/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"/>
              <img 
                src={src} 
                alt={title}
                className="relative w-full h-96 lg:h-[600px] object-cover rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"/>
              
              {/* Stats overlay si se proporcionan */}
              {stats && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-lg rounded-lg p-3 border border-white/30 animate-slideUpStagger">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      {stats.map((stat, index) => (
                        <div key={index} data-stagger>
                          <div className="font-bold text-gray-900 text-lg">{stat.value}</div>
                          <div className="font-medium text-gray-600 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  
          {/* Contenido */}
          <div className={`flex flex-col justify-center ${imagePosition === 'right' ? 'order-1' : 'order-2'}`} data-stagger>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-6 animate-textReveal">
              {title}
            </h3>
            <p className="font-sans text-base lg:text-lg text-gray-700 leading-relaxed mb-8 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              {description}
            </p>
            <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              {children}
            </div>
          </div>
        </div>
        
        {/* Efectos decorativos mejorados */}
        <div className="absolute top-6 right-8 w-2 h-12 bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-particleFloat"/>
        <div className="absolute bottom-6 left-8 w-8 h-1 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
        
        {/* Partículas flotantes */}
        <div className="floating-particle top-12 right-12 animate-particleFloat"/>
        <div className="floating-particle bottom-16 left-16 animate-particleFloat" style={{animationDelay: '2s'}}/>
        <div className="floating-particle top-1/3 left-1/4 animate-particleFloat" style={{animationDelay: '4s'}}/>
      </div>
    );
  };

export default function AboutPage(): JSX.Element {
  const [activeTeamMember, setActiveTeamMember] = useState<number>(0);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState(0);
  const { visibleElements, scrollProgress, scrollDirection } = useAdvancedScrollReveal();

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await getAboutInfo();
        setAboutData(data);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  // Efecto parallax mejorado
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      
      // Update CSS custom property for parallax
      document.documentElement.style.setProperty('--scroll-y', newScrollY.toString());
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Crear partículas flotantes dinámicas
  useEffect(() => {
    const createFloatingParticles = () => {
      const container = document.body;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle animate-particleFloat';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        container.appendChild(particle);
      }
    };
    
    if (!loading) {
      createFloatingParticles();
    }
    
    return () => {
      // Cleanup particles
      document.querySelectorAll('.floating-particle').forEach(p => p.remove());
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-full animate-morphFloat"/>
          <div className="absolute inset-0 bg-white/30 rounded-full animate-glowPulse"/>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <p className="font-sans text-lg text-gray-600">Error cargando la información</p>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      
      {/* Indicador de progreso de scroll */}
      <div className="scroll-indicator">
        <div 
          className="scroll-progress" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        
        {/* Hero Section con efectos mejorados */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Múltiples capas de parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-slow"
            style={{ 
              backgroundImage: `url(${aboutData.panoramic})`,
            }}
          />
          
          {/* Overlay con gradiente dinámico */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/80 parallax-medium"/>
          
          {/* Orbes flotantes mejorados */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-morphFloat"/>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/3 rounded-full blur-3xl animate-morphFloat" style={{animationDelay: '2s'}}/>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/8 rounded-full blur-2xl animate-morphFloat" style={{animationDelay: '4s'}}/>
          
          {/* Contenido principal con animaciones staggered */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="hero-title font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transform transition-all duration-1000 translate-y-8 opacity-0 animate-fadeInUp">
              {aboutData.hero.title}
            </h1>
            <p className="font-sans text-lg md:text-xl font-light text-white/90 mb-8 transform transition-all duration-1000 translate-y-8 opacity-0 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              {aboutData.hero.subtitle}
            </p>
            
            <div className="transform transition-all duration-1000 translate-y-8 opacity-0 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <PremiumButton showIndicator>
                Conoce Nuestra Historia
              </PremiumButton>
            </div>
          </div>

          {/* Indicador de scroll mejorado */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-glowPulse">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"/>
            </div>
          </div>
        </section>

        {/* Historia con transiciones mejoradas */}
        <section className="py-24 px-6 section-transition" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <ImageStoryCard
                src={aboutData.images[0]}
                title={aboutData.story.title}
                description={aboutData.story.content}
                stats={[
                  { label: "Años de Historia", value: "47+" },
                  { label: "Huéspedes Felices", value: "75K+" }
                ]}
                imagePosition="left"
              >
                <div className="space-y-4 mb-8">
                  {aboutData.story.highlights.slice(0, 3).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3" data-stagger>
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full mt-2 animate-scaleIn" style={{animationDelay: `${index * 0.2}s`}}/>
                      <p className="font-sans text-sm text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
                <LiquidButton variant="secondary">
                  Ver Línea de Tiempo
                </LiquidButton>
              </ImageStoryCard>
            </div>
          </div>
        </section>
 {/* Nuestro Nombre section - Liquid Luxury Design - Estructura corregida */}
<section className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100" data-reveal>
  {/* Background elements siguiendo design system */}
  <div className="absolute inset-0">
    {/* Floating orbs con glassmorphism */}
    <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
    
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
  </div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      
      {/* Left side - Content con glassmorphism */}
      <div className="space-y-8" data-stagger>
        <div className="space-y-6">
          {/* Badge con design system */}
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-xl border border-white/20 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-2xl">
            <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full animate-pulse"></div>
            <span className="font-sans">Nuestro Legado</span>
          </div>
          
          {/* Título siguiendo tipografía del design system */}
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            {aboutData.heritage.title}
          </h2>
          
          {/* Línea decorativa con degradado signature */}
          <div className="w-24 h-1 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg"></div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="font-sans text-xl text-gray-700 leading-relaxed font-light">
            {aboutData.heritage.content}
          </p>
        </div>
        
        {/* Quote con glassmorphism */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-2xl">
          <div className="absolute -left-2 -top-2 text-4xl text-gray-300 font-serif">"</div>
          <blockquote className="font-sans italic text-lg text-gray-600 pl-6">
            Un homenaje vivo a su legado científico y amor por la naturaleza
          </blockquote>
          
          {/* Shimmer effect */}
          <div className="absolute top-2 right-4 w-1 h-4 bg-gradient-to-b from-transparent via-gray-300/30 to-transparent rotate-45 animate-pulse"></div>
        </div>
      </div>
      
      {/* Right side - Visual element con glassmorphism */}
      <div className="relative" data-stagger>
        <div className="relative">
          {/* Main card con design system */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 group">
            <div 
              className="aspect-[4/5] bg-cover bg-center"
              style={{
                backgroundImage: `url(${aboutData.images[3]})`,
              }}
            />
            
            {/* Overlay con degradado signature */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
            
            {/* Floating highlight del design system */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Shimmer effects obligatorios */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-6 w-1 h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45 animate-pulse"></div>
              <div className="absolute bottom-4 left-6 w-4 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Info card con glassmorphism */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-2xl rounded-xl p-6 shadow-2xl border border-white/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/70 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/20 shadow-2xl">
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-900">Juan María Céspedes</h3>
                  <p className="font-sans text-sm text-gray-600">Sacerdote, Científico y Patriota</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Orbes decorativos con design system */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
      
    </div>
  </div>
</section>



        {/* Misión y Visión con efectos staggered */}
        <section className="py-24 px-6 section-transition" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div>
              <div className="grid lg:grid-cols-2 gap-12 mb-20">
                <div className="liquid-card rounded-2xl p-10 animate-fadeInLeft" data-stagger>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl flex items-center justify-center animate-scaleIn">
                      <Heart className="w-6 h-6 text-white"/>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      {aboutData.mission.title}
                    </h3>
                  </div>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    {aboutData.mission.content}
                  </p>
                </div>
                
                <div className="liquid-card rounded-2xl p-10 animate-fadeInRight" data-stagger>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl flex items-center justify-center animate-scaleIn" style={{animationDelay: '0.2s'}}>
                      <TrendingUp className="w-6 h-6 text-white"/>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      {aboutData.vision.title}
                    </h3>
                  </div>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    {aboutData.vision.content}
                  </p>
                </div>
              </div>

              {/* Imagen nocturna mejorada */}
              <div className="text-center" data-stagger>
                <div className="inline-block relative group cursor-pointer">
                  <div className="absolute -inset-8 bg-gradient-to-r from-gray-200/30 via-white/40 to-gray-200/30 rounded-3xl blur-lg group-hover:blur-2xl group-hover:bg-gradient-to-r group-hover:from-gray-200/50 group-hover:via-white/70 group-hover:to-gray-200/50 transition-all duration-700 animate-glowPulse"/>
                  
                  <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-700"/>
                  
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 group-hover:bg-white/90 group-hover:border-white/50 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 overflow-hidden">
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-8 right-12 w-1 h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent rotate-45 animate-pulse"/>
                      <div className="absolute top-12 left-16 w-0.5 h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent rotate-[-45deg] animate-pulse" style={{animationDelay: '0.2s'}}/>
                      <div className="absolute bottom-16 left-20 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{animationDelay: '0.4s'}}/>
                      <div className="absolute top-20 right-24 w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}/>
                      <div className="absolute bottom-24 left-32 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}/>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"/>
                      <div className="absolute bottom-0 right-1/4 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}/>
                    </div>

                    <div className="relative">
                      <img 
                        src={aboutData.images[2]} 
                        alt="Hotel de noche"
                        className="w-[80vw] max-w-8xl h-[22vw] max-h-[28rem] object-cover object-[center_40%] rounded-xl shadow-2xl group-hover:shadow-3xl group-hover:brightness-110 transition-all duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                    </div>

                    <div className="mt-6 text-center relative">
                      <h4 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-500">
                        Iluminando Sueños desde 1977
                      </h4>
                      <p className="font-sans text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-500">
                        Cada noche, nuestro hotel se convierte en un faro de hospitalidad en Tuluá
                      </p>
                      
                      <div className="mt-4 flex justify-center">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-400/60 to-transparent group-hover:via-gray-600 group-hover:w-12 transition-all duration-500"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores con animaciones staggered */}
        <section className="py-24 px-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 section-transition" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-stagger>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 animate-textReveal">
                Nuestros Valores
              </h2>
              <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                Los principios que guían cada decisión y cada servicio que brindamos
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.values.map((value, index) => (
                <div 
                  key={index}
                  className="liquid-card rounded-2xl p-8 text-center group animate-fadeInUp"
                  style={{animationDelay: `${index * 0.2}s`}}
                  data-stagger
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-scaleIn" style={{animationDelay: `${index * 0.1}s`}}>
                      <IconComponent iconName={value.icon} className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 animate-textReveal" style={{animationDelay: `${index * 0.15}s`}}>
                    {value.title}
                  </h3>
                  
                  <p className="font-sans text-sm text-gray-600 leading-relaxed animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Política de Calidad */}
        <section className="py-24 px-6 section-transition" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div>
              <ImageStoryCard
                src={aboutData.images[1]}
                title={aboutData.qualityPolicy.title}
                description={aboutData.qualityPolicy.content}
                imagePosition="right"
                className="lg:min-h-96"
              >
                <LiquidButton variant="primary">
                  Ver Certificaciones
                </LiquidButton>
              </ImageStoryCard>
            </div>
          </div>
        </section>

        {/* Equipo con efectos mejorados */}
        <section className="py-24 px-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 section-transition" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-stagger>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 animate-textReveal">
                Nuestro Equipo
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.team.map((member, index) => (
                <div 
                  key={index}
                  className="liquid-card rounded-2xl p-6 text-center cursor-pointer group animate-fadeInUp"
                  style={{animationDelay: `${index * 0.15}s`}}
                  onClick={() => setActiveTeamMember(index)}
                  data-stagger
                >
                  <div className="mb-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg animate-scaleIn" style={{animationDelay: `${index * 0.1}s`}}>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 animate-textReveal" style={{animationDelay: `${index * 0.12}s`}}>
                    {member.name}
                  </h3>
                  
                  <p className="font-sans text-sm font-medium text-gray-600 mb-4 animate-fadeInUp" style={{animationDelay: `${index * 0.14}s`}}>
                    {member.position}
                  </p>
                  
                  <p className="font-sans text-xs text-gray-500 leading-relaxed animate-fadeInUp" style={{animationDelay: `${index * 0.16}s`}}>
                    {member.bio.slice(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* Estadísticas con contadores animados */}
       <section className="py-24 px-6 section-transition" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="liquid-card rounded-2xl p-8 text-center group animate-fadeInUp" data-stagger>
                <AnimatedCounter
                  endValue={aboutData.stats.yearsOfExperience}
                  suffix="+"
                  className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-5xl transition-all duration-700 ease-out transform group-hover:scale-105"
                />
                <p className="font-sans text-sm font-medium text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                  Años de Experiencia
                </p>
              </div>
              
              <div className="liquid-card rounded-2xl p-8 text-center group animate-fadeInUp" style={{animationDelay: '0.2s'}} data-stagger>
                <AnimatedCounter
                  endValue={aboutData.stats.satisfiedGuests}
                  suffix="+"
                  className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-5xl transition-all duration-700 ease-out transform group-hover:scale-105"
                />
                <p className="font-sans text-sm font-medium text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                  Huéspedes Satisfechos
                </p>
              </div>
              
              <div className="liquid-card rounded-2xl p-8 text-center group animate-fadeInUp" style={{animationDelay: '0.4s'}} data-stagger>
                <AnimatedCounter
                  endValue={aboutData.stats.teamMembers}
                  suffix="+"
                  className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-5xl transition-all duration-700 ease-out transform group-hover:scale-105"
                />
                <p className="font-sans text-sm font-medium text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                  Miembros del Equipo
                </p>
              </div>
              
              <div className="liquid-card rounded-2xl p-8 text-center group animate-fadeInUp" style={{animationDelay: '0.6s'}} data-stagger>
                <AnimatedCounter
                  endValue={aboutData.stats.foundedYear}
                  className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-5xl transition-all duration-700 ease-out transform group-hover:scale-105"
                />
                <p className="font-sans text-sm font-medium text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                  Año de Fundación
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}