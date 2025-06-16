"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Filter, Grid3X3, List, Users, Square, Bed, Star,
  ChevronDown, X, Check, ArrowRight, Eye, Heart, Share2,
  SlidersHorizontal, MapPin, Wifi, Car, Coffee, Shield, Tv, Waves, Phone, Plane
} from 'lucide-react';
import { getRooms, getUniqueAmenities, formatPrice, type Room } from '../../lib/data';
import CustomSortSelect from '../ui/customSort';

type ViewMode = 'grid' | 'list' | 'comparison';
type SortOption = 'price-asc' | 'price-desc' | 'capacity' | 'size' | 'name';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [favoriteRooms, setFavoriteRooms] = useState<number[]>([]);
  
  // Filtros
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    capacity: '',
    amenities: [] as string[],
    available: false,
    featured: false
  });

  const [allAmenities, setAllAmenities] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [roomsData, amenitiesData] = await Promise.all([
          getRooms(),
          getUniqueAmenities()
        ]);
        
        setRooms(roomsData);
        setFilteredRooms(roomsData);
        setAllAmenities(amenitiesData);
        setLoading(false);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading rooms:', error);
        setLoading(false);
      }
    };

    loadData();
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Aplicar filtros y búsqueda
  useEffect(() => {
    let filtered = rooms.filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = (!filters.minPrice || room.price >= parseInt(filters.minPrice)) &&
                          (!filters.maxPrice || room.price <= parseInt(filters.maxPrice));
      
      const matchesCapacity = !filters.capacity || room.capacity >= parseInt(filters.capacity);
      
      const matchesAmenities = filters.amenities.length === 0 || 
                              filters.amenities.every(amenity => 
                                room.amenities.some(roomAmenity => 
                                  roomAmenity.toLowerCase().includes(amenity.toLowerCase())
                                )
                              );
      
      const matchesAvailable = !filters.available || room.available;
      const matchesFeatured = !filters.featured || room.featured;
      
      return matchesSearch && matchesPrice && matchesCapacity && 
             matchesAmenities && matchesAvailable && matchesFeatured;
    });

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'capacity': return b.capacity - a.capacity;
        case 'size': return parseInt(b.size) - parseInt(a.size);
        case 'name': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      capacity: '',
      amenities: [],
      available: false,
      featured: false
    });
    setSearchTerm('');
  };

  const toggleAmenityFilter = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleRoomSelection = (roomId: number) => {
    setSelectedRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const toggleFavorite = (roomId: number) => {
    setFavoriteRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (amenityLower.includes('tv')) return <Tv className="w-4 h-4" />;
    if (amenityLower.includes('aire') || amenityLower.includes('acondicionado')) return <Waves className="w-4 h-4" />;
    if (amenityLower.includes('seguridad') || amenityLower.includes('caja')) return <Shield className="w-4 h-4" />;
    if (amenityLower.includes('parqueadero') || amenityLower.includes('parking')) return <Car className="w-4 h-4" />;
    if (amenityLower.includes('minibar') || amenityLower.includes('bar')) return <Coffee className="w-4 h-4" />;
    if (amenityLower.includes('servicio') && amenityLower.includes('habitación')) return <Phone className="w-4 h-4" />;
    if (amenityLower.includes('transporte') || amenityLower.includes('aeropuerto')) return <Plane className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  const getImagePath = (imagePath: string) => {
    return imagePath.replace('/', '/').replace('.jpeg', '.jpeg');
  };

  const RoomCard = ({ room, index }: { room: Room; index: number }) => {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img 
            src={getImagePath(room.featuredImage)} 
            alt={room.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
            {room.title}
          </h3>
          
          <p className="font-sans font-light text-sm text-gray-600 leading-relaxed mb-4">
            {room.description}
          </p>

          <div className="mb-4">
            <span className="font-sans text-2xl font-bold text-gray-900">
              {formatPrice(room.price)}
            </span>
            <span className="font-sans text-sm text-gray-600 ml-1">por noche</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{room.capacity} huéspedes</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{room.size}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{room.bedType}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {room.amenities.length > 3 && (
              <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                +{room.amenities.length - 3} más
              </div>
            )}
          </div>

          {/* Action buttons - SIEMPRE VISIBLES */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(room.id);
              }}
              className={`p-2 rounded-lg ${
                favoriteRooms.includes(room.id) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {viewMode === 'comparison' && (
              <button
                onClick={() => toggleRoomSelection(room.id)}
                className={`p-2 rounded-lg ${
                  selectedRooms.includes(room.id)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => window.location.href = `/habitaciones/${room.id}`}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg py-3 px-4"
            >
              Ver Detalles
            </button>
            
            <button 
              onClick={() => window.location.href = `/reservas?room=${room.id}`}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg font-semibold text-sm"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RoomListItem = ({ room, index }: { room: Room; index: number }) => {
    return (
      <div 
        className="room-list-card bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        <style jsx>{`
          .room-list-card:hover .hover-buttons-list {
            opacity: 1;
          }
          .hover-buttons-list {
            opacity: 0;
            transition: opacity 0.2s ease;
          }
        `}</style>

        <div className="flex gap-6 p-6">
          {/* Image */}
          <div className="relative w-64 h-40 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={getImagePath(room.featuredImage)} 
              alt={room.title}
              className="w-full h-full object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {room.featured && (
                <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                  <Star className="w-3 h-3 inline mr-1" />
                  Destacada
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="hover-buttons-list absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(room.id);
                }}
                className={`p-2 rounded transition-colors duration-200 ${
                  favoriteRooms.includes(room.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                <Heart className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                  {room.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.capacity} huésped{room.capacity > 1 ? 'es' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{room.bedType}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-sans text-2xl font-bold text-gray-900">
                  {formatPrice(room.price)}
                </div>
                <div className="font-sans text-sm text-gray-600">por noche</div>
              </div>
            </div>
            
            <p className="font-sans font-light text-sm text-gray-600 leading-relaxed mb-4">
              {room.description}
            </p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {room.amenities.slice(0, 6).map((amenity, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {room.amenities.length > 6 && (
                <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                  +{room.amenities.length - 6} más
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => window.location.href = `/habitaciones/${room.id}`}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg py-3 px-6 transition-colors duration-200"
              >
                <span className="flex items-center justify-center">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </button>
              
              <button 
                onClick={() => window.location.href = `/reservas?room=${room.id}`}
                className="border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Reservar
              </button>
              
              {viewMode === 'comparison' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRoomSelection(room.id);
                  }}
                  className={`px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    selectedRooms.includes(room.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {selectedRooms.includes(room.id) ? 'Seleccionada' : 'Comparar'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center pt-20">
        <div className="animate-pulse font-sans text-2xl text-gray-600">Cargando habitaciones...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
      {/* Floating background orbs */}
      <div 
        className="fixed top-0 left-0 w-64 h-64 bg-gradient-to-br from-gray-200/10 via-gray-300/5 to-transparent rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.005}px)`,
        }}
      />
      <div 
        className="fixed bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-gray-400/8 via-gray-200/5 to-transparent rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none z-0"
        style={{
          transform: `translate(${-mousePosition.x * 0.008}px, ${-mousePosition.y * 0.004}px)`,
        }}
      />

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        <div className="text-center mb-12">
          <h1 
            className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Nuestras Habitaciones
          </h1>
          <p 
            className={`font-sans font-light text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Descubre espacios únicos diseñados para crear experiencias memorables. 
            Cada habitación combina elegancia, comodidad y atención al detalle.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div 
          className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 mb-8 transform transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar habitaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors duration-200"
              />
            </div>

            {/* View Mode Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  viewMode === 'comparison' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span className="font-sans font-medium">Filtros</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort */}
            <CustomSortSelect
                value={sortBy}
                onChange={(value) => setSortBy(value as SortOption)}
                className="" // Puedes agregar clases adicionales si necesitas
                />
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Precio mínimo</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Precio máximo</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors duration-200"
                    placeholder="999999"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Capacidad mínima</label>
                  <input
                    type="number"
                    value={filters.capacity}
                    onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors duration-200"
                    placeholder="1"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block font-sans text-sm font-medium text-gray-700">Opciones</label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.available}
                      onChange={(e) => setFilters(prev => ({ ...prev, available: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="font-sans text-sm text-gray-700">Solo disponibles</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="font-sans text-sm text-gray-700">Solo destacadas</span>
                  </label>
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-4">
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Amenidades</label>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenityFilter(amenity)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        filters.amenities.includes(amenity)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span className="font-sans text-sm">Limpiar filtros</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div 
          className={`flex items-center justify-between mb-8 transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="font-sans text-gray-600">
            <span className="font-semibold text-gray-900">{filteredRooms.length}</span> habitación{filteredRooms.length !== 1 ? 'es' : ''} encontrada{filteredRooms.length !== 1 ? 's' : ''}
          </div>
          
          {viewMode === 'comparison' && selectedRooms.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="font-sans text-sm text-gray-600">
                {selectedRooms.length} habitación{selectedRooms.length !== 1 ? 'es' : ''} seleccionada{selectedRooms.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setSelectedRooms([])}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Rooms Grid/List */}
        <div 
          className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '0.8s' }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRooms.map((room, index) => (
                <RoomListItem key={room.id} room={room} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <div className="font-sans text-xl text-gray-600 mb-4">
              No se encontraron habitaciones con los filtros aplicados
            </div>
            <button
              onClick={clearFilters}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg py-3 px-6 transition-colors duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Comparison Panel */}
      {viewMode === 'comparison' && selectedRooms.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-40">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Comparar Habitaciones ({selectedRooms.length})
              </h3>
              <button
                onClick={() => setSelectedRooms([])}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-40 overflow-y-auto">
              {selectedRooms.map(roomId => {
                const room = rooms.find(r => r.id === roomId);
                if (!room) return null;
                
                return (
                  <div key={roomId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={getImagePath(room.featuredImage)} 
                      alt={room.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-sans font-medium text-gray-900 truncate">{room.title}</div>
                      <div className="font-sans text-sm text-gray-600">{formatPrice(room.price)}</div>
                    </div>
                    <button
                      onClick={() => toggleRoomSelection(roomId)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg py-3 px-6 transition-colors duration-200">
                <span className="flex items-center justify-center">
                  Ver Comparación Detallada
                  <Eye className="w-4 h-4 ml-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom panel */}
      {viewMode === 'comparison' && selectedRooms.length > 0 && (
        <div className="h-40"></div>
      )}
    </div>
  );
};

export default RoomsPage;