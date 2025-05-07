'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';
import {
  Globe,
  Search,
  ArrowRightLeft,
  LogIn,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home', icon: <Globe className="h-4 w-4 mr-2" /> },
    { href: '/search', label: 'Explore', icon: <Search className="h-4 w-4 mr-2" /> },
    { href: '/compare', label: 'Compare', icon: <ArrowRightLeft className="h-4 w-4 mr-2" /> },
  ];

  return (
    <nav className={`glass-navbar transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Flagify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={isActive(link.href) ? 'default' : 'ghost'}
                asChild
                className="flex items-center"
              >
                <Link href={link.href}>
                  {link.icon}
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant={isActive(link.href) ? 'default' : 'ghost'}
                  asChild
                  className="justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={link.href}>
                    {link.icon}
                    {link.label}
                  </Link>
                </Button>
              ))}
              
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground pt-2 pb-1 px-3">
                    Logged in as {user.name}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}