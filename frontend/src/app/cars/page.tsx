'use client';

import { useState, useEffect } from 'react';
import { carApi } from '@/services/api';
import { Car } from '@/types';
import CarCard from "@/components/CarCard"
import CarModal from '@/components/CarModal';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await carApi.getAll();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand ? car.brand === filterBrand : true;
    return matchesSearch && matchesBrand;
  });

  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand)));

  return (
    <div className="min-h-screen bg-surface animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">
            Araç <span className="text-primary">Kataloğu</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Araç ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="">Tüm Markalar</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse-slow">
              <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => setSelectedCar(car)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Araç bulunamadı. Lütfen farklı bir arama yapın.
            </p>
          </div>
        )}
      </div>

      {/* Car Details Modal */}
      <CarModal
        car={selectedCar}
        open={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onSave={() => {
          setSelectedCar(null);
          fetchCars();
        }}
      />
    </div>
  );
} 