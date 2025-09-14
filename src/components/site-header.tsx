"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { CartModal } from "@/components/cart-modal";

export function SiteHeader() {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-serif text-xl font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.nav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="px-3 py-2 text-sm font-medium hover:underline">
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        {/* Cart Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCartOpen(true)}
          className="relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {state.itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
              {state.itemCount}
            </span>
          )}
        </Button>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}


