"use client";

import { motion } from "framer-motion";
import { Truck, BadgePercent, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  { qty: "10+", discount: "5% off", note: "Starter tier" },
  { qty: "25+", discount: "10% off", note: "Growth tier" },
  { qty: "50+", discount: "15% off", note: "Pro tier" },
  { qty: "100+", discount: "20% off", note: "Enterprise" },
];

const benefits = [
  { icon: CreditCard, label: "Credit Facility" },
  { icon: BadgePercent, label: "Branding Support" },
  { icon: Truck, label: "Priority Shipping" },
];

export function DealerBulk() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20">
      {/* dotted background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 sm:mb-3 px-4">
            For Dealers & Bulk Buyers
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Flexible tiered pricing and partner benefits to scale procurement with confidence.
          </p>
        </div>

        {/* Pricing ladder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.qty}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full border-primary/30 hover:border-primary transition-all duration-200">
                <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-1">
                    {tier.qty}
                  </div>
                  <div className="text-sm sm:text-base text-primary font-medium mb-1 sm:mb-2">{tier.discount}</div>
                  <div className="text-xs text-muted-foreground">{tier.note}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              className="flex items-center gap-2 sm:gap-3 rounded-lg border bg-background/60 p-3 sm:p-4"
            >
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow flex-shrink-0">
                <b.icon className="size-4 sm:size-5" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-foreground">{b.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


