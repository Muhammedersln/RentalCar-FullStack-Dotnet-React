import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Hemen Rezervasyon Yapın
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Size en uygun aracı seçin ve hemen rezervasyon yapın. 7/24 müşteri hizmetlerimiz ile yanınızdayız.
        </p>
        <Link
          href="/cars"
          className="inline-block px-12 py-5 bg-white text-primary rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 font-semibold text-lg"
        >
          Hemen Başla
        </Link>
      </div>
    </section>
  );
} 