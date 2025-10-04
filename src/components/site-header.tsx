"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { SearchBar } from "@/components/search-bar";
import { useAuth } from "@/lib/AuthContext";

export function SiteHeader() {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getUserInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-4">
        <Link 
          href="/" 
          className="font-serif text-xl font-semibold flex-shrink-0 transition-colors duration-300 ease-in-out hover:opacity-90"
          style={{ color: '#2C2C2C' }}
        >
          {siteConfig.name}
        </Link>
        
        {/* Navigation - Hidden on mobile */}
        <nav className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.nav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link 
                      href={item.href} 
                      className="px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out hover:no-underline navbar-link !bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
                      style={{ 
                        color: '#2C2C2C',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        {/* Search Bar - Responsive */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <SearchBar />
        </div>
        
        {/* Auth & Cart Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="lg:hidden flex-shrink-0 transition-colors duration-300 ease-in-out hover:bg-stone-100"
            style={{ color: '#2C2C2C' }}
            title="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex-shrink-0 transition-colors duration-300 ease-in-out hover:bg-stone-100 px-3"
                style={{ color: '#2C2C2C' }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-2"
                  style={{ backgroundColor: '#C89B3C' }}
                >
                  {getUserInitial()}
                </div>
                <span className="hidden sm:inline">{user.displayName || user.email?.split('@')[0]}</span>
              </Button>
              
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user.displayName || 'User'}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoginClick}
              className="flex-shrink-0 transition-colors duration-300 ease-in-out hover:bg-stone-100 px-3"
              style={{ color: '#2C2C2C' }}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}
          
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartClick}
            className="relative flex-shrink-0 cart-button transition-colors duration-300 ease-in-out hover:bg-stone-100"
            style={{ color: '#2C2C2C' }}
            title="View Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {state.itemCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
                style={{ backgroundColor: '#C89B3C' }}
              >
                {state.itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-2">
              {siteConfig.nav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out hover:text-yellow-600"
                    style={{ color: '#2C2C2C' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}