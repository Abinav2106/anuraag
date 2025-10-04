import Link from "next/link";
import { MapPin, Phone, Mail, Award, Shield, CheckCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact-section" className="border-t bg-secondary/20">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Anuraag */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-foreground">About Anuraag</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Founded in 2001
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Chennai HQ
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Proprietorship
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Over two decades of excellence in first aid solutions, serving healthcare, education, and corporate sectors across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { title: "Home", href: "/" },
                { title: "Products", href: "/products" },
                { title: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-foreground">Contact Info</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+918047764026" className="hover:text-primary transition-colors">
                  +91 80477 64026
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@anuraag.com" className="hover:text-primary transition-colors">
                  info@anuraag.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">GST: 33AACPN7467L1ZB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Trust Badges */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>CE Marked</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Sterile QC</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 
            {new Date().getFullYear()} Anuraag Medicals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
  
}


