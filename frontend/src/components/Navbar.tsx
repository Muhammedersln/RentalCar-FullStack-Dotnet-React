"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              RentCar
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-8">
            <NavLink href="/" active={isActive('/')}>
              Ana Sayfa
            </NavLink>
            <NavLink href="/cars" active={isActive('/cars')}>
              Araçlar
            </NavLink>
            <NavLink href="/about" active={isActive('/about')}>
              Hakkımızda
            </NavLink>
            <NavLink href="/contact" active={isActive('/contact')}>
              İletişim
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile" 
                  className="px-5 py-2.5 rounded-lg text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  {user?.firstName || 'Profilim'}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-custom hover:shadow-hover transform hover:-translate-y-0.5"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login"
                  className="px-5 py-2.5 rounded-lg text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/auth/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-custom hover:shadow-hover transform hover:-translate-y-0.5"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        active
          ? 'text-primary font-medium bg-primary/10'
          : 'text-gray-600 hover:text-primary hover:bg-primary/5'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar; 