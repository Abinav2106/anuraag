"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Kit data structure
interface KitItem {
  name: string;
  quantity: number;
}

interface Kit {
  id: string;
  title: string;
  size: "Mini" | "Small" | "Medium" | "Large";
  image: string;
  contents: KitItem[];
}

const kits: Kit[] = [
  {
    id: "mini",
    title: "Mini Kit",
    size: "Mini",
    image: "/assets/static/kit-mini.png",
    contents: [
      { name: "Adhesive Bandages", quantity: 10 },
      { name: "Antiseptic Wipes", quantity: 5 },
      { name: "Gauze Pads", quantity: 2 },
      { name: "Medical Tape", quantity: 1 },
    ]
  },
  {
    id: "small",
    title: "Small Kit",
    size: "Small",
    image: "/assets/static/kit-small.png",
    contents: [
      { name: "Adhesive Bandages", quantity: 20 },
      { name: "Antiseptic Wipes", quantity: 10 },
      { name: "Gauze Pads", quantity: 4 },
      { name: "Medical Tape", quantity: 2 },
      { name: "Instant Cold Pack", quantity: 1 },
      { name: "Scissors", quantity: 1 },
    ]
  },
  {
    id: "medium",
    title: "Medium Kit",
    size: "Medium",
    image: "/assets/static/kit-medium.png",
    contents: [
      { name: "Adhesive Bandages", quantity: 40 },
      { name: "Antiseptic Wipes", quantity: 20 },
      { name: "Gauze Pads", quantity: 8 },
      { name: "Medical Tape", quantity: 3 },
      { name: "Instant Cold Pack", quantity: 2 },
      { name: "Scissors", quantity: 1 },
      { name: "Trauma Pad", quantity: 2 },
      { name: "Eye Wash", quantity: 1 },
    ]
  },
  {
    id: "large",
    title: "Large Kit",
    size: "Large",
    image: "/assets/static/kit-large.png",
    contents: [
      { name: "Adhesive Bandages", quantity: 60 },
      { name: "Antiseptic Wipes", quantity: 30 },
      { name: "Gauze Pads", quantity: 12 },
      { name: "Medical Tape", quantity: 4 },
      { name: "Instant Cold Pack", quantity: 3 },
      { name: "Scissors", quantity: 2 },
      { name: "Trauma Pad", quantity: 4 },
      { name: "Eye Wash", quantity: 2 },
      { name: "CPR Mask", quantity: 1 },
      { name: "Elastic Bandage", quantity: 2 },
      { name: "Burn Gel", quantity: 3 },
    ]
  }
];

export function ProductKitCarousel() {
  const [selectedKit, setSelectedKit] = useState<Kit>(kits[1]); // Default to Small kit

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            Choose Your <span className="emboss text-primary">Premium</span> Kit
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From compact personal kits to comprehensive corporate solutions, find the perfect first aid kit for your needs.
          </p>
        </div>

        {/* Central Display */}
        <div className="mb-12 overflow-hidden">
          <motion.div
            key={selectedKit.id}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 mb-6 bg-secondary/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-2">📦</div>
                <p>Kit Image Placeholder</p>
                <p className="text-sm">Replace with actual {selectedKit.title} image</p>
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
              {selectedKit.title}
            </h3>
            <p className="text-muted-foreground">
              Perfect for {selectedKit.size.toLowerCase()} scale applications
            </p>
          </motion.div>
        </div>

        {/* Kit Cards Carousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {kits.map((kit) => (
            <motion.div
              key={kit.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  selectedKit.id === kit.id
                    ? "border-2 border-primary shadow-lg bg-primary/5"
                    : "border border-border hover:shadow-md"
                }`}
                onClick={() => setSelectedKit(kit)}
              >
                <CardContent className="p-4 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3 bg-secondary/20 rounded flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h4 className="font-medium text-foreground mb-2">{kit.title}</h4>
                  <Button
                    variant={selectedKit.id === kit.id ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    View Contents
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contents Table */}
        <motion.div
          key={selectedKit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-6">
              <h4 className="text-xl font-serif font-bold mb-4 text-center">
                {selectedKit.title} Contents
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedKit.contents.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-primary font-medium">
                      {item.quantity}x
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button size="lg" className="px-8">
                  Order {selectedKit.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
