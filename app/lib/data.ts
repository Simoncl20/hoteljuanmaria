// backend"simulado

import roomsData from '../data/rooms.json';
import servicesData from '../data/services.json';
import galleryData from '../data/gallery.json';
import testimonialsData from '../data/testimonials.json';
import contactData from '../data/contact.json';
import settingsData from '../data/settings.json';
import aboutData from '../data/about.json';
import blogData from '../data/blog.json';
import pagesData from '../data/pages.json';

// Tipos 
export interface Room {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  featuredImage: string;
  amenities: string[];
  capacity: number;
  size: string;
  bedType: string;
  available: boolean;
  featured: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  hours: string;
  featured: boolean;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: string;
  title: string;
  featured: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  featured: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  featured: boolean;
  readTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

// Funciones para obtener habitaciones
export async function getRooms(): Promise<Room[]> {
  //  delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  return roomsData.rooms;
}

export async function getFeaturedRooms(): Promise<Room[]> {
  const rooms = await getRooms();
  return rooms.filter(room => room.featured);
}

export async function getRoomById(id: number): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find(room => room.id === id) || null;
}

export async function getAvailableRooms(): Promise<Room[]> {
  const rooms = await getRooms();
  return rooms.filter(room => room.available);
}

// Funciones para obtener servicios
export async function getServices(): Promise<Service[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData.services;
}

export async function getFeaturedServices(): Promise<Service[]> {
  const services = await getServices();
  return services.filter(service => service.featured);
}

export async function getServiceById(id: number): Promise<Service | null> {
  const services = await getServices();
  return services.find(service => service.id === id) || null;
}

// Funciones para obtener galería
export async function getGalleryImages(): Promise<GalleryImage[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return galleryData.gallery;
}

export async function getFeaturedGalleryImages(): Promise<GalleryImage[]> {
  const images = await getGalleryImages();
  return images.filter(image => image.featured);
}

export async function getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
  const images = await getGalleryImages();
  if (category === 'all') return images;
  return images.filter(image => image.category === category);
}

export async function getGalleryCategories() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return galleryData.categories;
}

// Funciones para obtener testimonios
export async function getTestimonials(): Promise<Testimonial[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return testimonialsData.testimonials;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials();
  return testimonials.filter(testimonial => testimonial.featured);
}

export async function getTestimonialStats() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return testimonialsData.stats;
}

// Funciones para obtener información de contacto
export async function getContactInfo() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return contactData.contact;
}

// Funciones para obtener configuraciones
export async function getSiteSettings() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return settingsData;
}

export async function getHeroSettings() {
  const settings = await getSiteSettings();
  return settings.hero;
}

export async function getSiteFeatures() {
  const settings = await getSiteSettings();
  return settings.features;
}

export async function getBookingSettings() {
  const settings = await getSiteSettings();
  return settings.booking;
}

// Funciones para obtener información About Us
export async function getAboutInfo() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return aboutData.about;
}

export async function getTeamMembers() {
  const about = await getAboutInfo();
  return about.team;
}

export async function getCompanyValues() {
  const about = await getAboutInfo();
  return about.values;
}

export async function getAwards() {
  const about = await getAboutInfo();
  return about.awards;
}

// Funciones para obtener posts del blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogData.blog.posts;
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.featured);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export async function getBlogCategories() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return blogData.blog.categories;
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Funciones para páginas estáticas
export async function getPrivacyPolicy() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return pagesData.pages.privacy;
}

export async function getTermsAndConditions() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return pagesData.pages.terms;
}

export async function getFAQ() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return pagesData.pages.faq;
}

// Función de búsqueda en el blog
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Función de búsqueda (simulada)
export async function searchRooms(filters: {
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  amenities?: string[];
}): Promise<Room[]> {
  const rooms = await getRooms();
  
  return rooms.filter(room => {
    if (filters.minPrice && room.price < filters.minPrice) return false;
    if (filters.maxPrice && room.price > filters.maxPrice) return false;
    if (filters.capacity && room.capacity < filters.capacity) return false;
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        room.amenities.some(roomAmenity => 
          roomAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasAllAmenities) return false;
    }
    return true;
  });
}

// Función para simular reserva (más adelante será una llamada a API)
export async function createReservation(reservationData: {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}) {
  // Simula procesamiento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simula respuesta exitosa
  return {
    success: true,
    reservationId: `RES-${Date.now()}`,
    message: 'Reserva creada exitosamente'
  };
}

// Función para formatear precios
export function formatPrice(price: number, currency: string = 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Función para calcular noches entre fechas
export function calculateNights(checkIn: string, checkOut: string): number {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const timeDifference = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

// Función para validar disponibilidad (simulada)
export async function checkAvailability(
  roomId: number, 
  checkIn: string, 
  checkOut: string
): Promise<{available: boolean, message?: string}> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simula lógica de disponibilidad
  const room = await getRoomById(roomId);
  if (!room) {
    return { available: false, message: 'Habitación no encontrada' };
  }
  
  if (!room.available) {
    return { available: false, message: 'Habitación no disponible' };
  }
  
  // Simula verificación de fechas (siempre disponible por ahora)
  return { available: true };
}

// Función para obtener habitaciones relacionadas
export async function getRelatedRooms(roomId: number, limit: number = 3): Promise<Room[]> {
  const rooms = await getRooms();
  const currentRoom = rooms.find(room => room.id === roomId);
  
  if (!currentRoom) return [];
  
  // Simula lógica de relacionados por precio similar
  const relatedRooms = rooms
    .filter(room => room.id !== roomId && room.available)
    .sort((a, b) => {
      const diffA = Math.abs(a.price - currentRoom.price);
      const diffB = Math.abs(b.price - currentRoom.price);
      return diffA - diffB;
    })
    .slice(0, limit);
    
  return relatedRooms;
}

// Función para obtener amenidades únicas
export async function getUniqueAmenities(): Promise<string[]> {
  const rooms = await getRooms();
  const allAmenities = rooms.flatMap(room => room.amenities);
  return [...new Set(allAmenities)].sort();
}

// Función para obtener estadísticas de habitaciones
export async function getRoomStats() {
  const rooms = await getRooms();
  
  return {
    total: rooms.length,
    available: rooms.filter(room => room.available).length,
    featured: rooms.filter(room => room.featured).length,
    averagePrice: Math.round(rooms.reduce((sum, room) => sum + room.price, 0) / rooms.length),
    maxCapacity: Math.max(...rooms.map(room => room.capacity)),
    minPrice: Math.min(...rooms.map(room => room.price)),
    maxPrice: Math.max(...rooms.map(room => room.price))
  };
}