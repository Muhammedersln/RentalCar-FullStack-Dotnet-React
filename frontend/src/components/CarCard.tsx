import { Car } from '@/types';
import Image from 'next/image';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group animate-scale"
    >
      {/* Image */}
      <div className="relative h-48 rounded-t-xl overflow-hidden">
        <Image
          src={ '/car-placeholder.jpg'}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="text-white font-semibold text-lg">
            {car.brand} {car.model}
          </p>
          <p className="text-white/80 text-sm">
            {car.year}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              car.isAvailable 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {car.isAvailable ? 'Müsait' : 'Kirada'}
            </span>
            <span className="text-sm text-gray-500">
              {car.licensePlate}
            </span>
          </div>
          <p className="text-lg font-bold text-primary">
            ₺{car.dailyRate}/gün
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{car.description}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>{car.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 