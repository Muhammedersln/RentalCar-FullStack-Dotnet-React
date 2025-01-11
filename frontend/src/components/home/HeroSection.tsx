"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/hero1.jpg',
      title: 'Lüks ve Konfor',
      description: 'Premium araç filomuzla yolculuklarınızı keyfe dönüştürün'
    },
    {
      image: '/hero2.jpg',
      title: 'Güvenilir Hizmet',
      description: 'Profesyonel ekibimizle güvenli kiralama deneyimi'
    },
    {
      image: '/hero3.jpg',
      title: 'Uygun Fiyatlar',
      description: 'Rekabetçi fiyatlarla kaliteli araç kiralama'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-surface to-background">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-dark/50 to-transparent opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-background/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-text-dark">
                Araç Kiralamanın
                <span className="text-primary block mt-2">Modern Yolu</span>
              </h1>
              <p className="text-lg md:text-xl text-text">
                Geniş araç filomuz, uygun fiyatlarımız ve profesyonel hizmet anlayışımızla
                yanınızdayız.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/cars"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/30"
              >
                Araçları İncele
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary border-2 border-primary/20 rounded-lg hover:bg-primary/5 transition-all duration-300"
              >
                İletişime Geç
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-primary/10">
              {[
                { number: '1000+', label: 'Araç' },
                { number: '50K+', label: 'Müşteri' },
                { number: '100+', label: 'Şehir' },
                { number: '4.9/5', label: 'Puan' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-text-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Featured Car */}
          <div className="hidden lg:block flex-1">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/featured-car.jpg"
                alt="Featured Car"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-8 bg-primary' 
                : 'w-4 bg-primary/30 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
} 