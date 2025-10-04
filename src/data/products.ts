export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

export const products = {
  kits: [
    { 
      name: "Plastic First Aid Box", 
      description: "Durable plastic construction for basic first aid needs", 
      price: 299, 
      image: "/assets/static/PlasticFirstAidBox.png",
      category: "kits",
      sizes: ["S", "M", "L"]
    },
    { 
      name: "Vinyl First Aid Kit", 
      description: "Portable vinyl case with essential medical supplies", 
      price: 399, 
      image: "/assets/static/VinylFirstAidKit.png",
      category: "kits",
      sizes: ["S", "M", "L"]
    },
    { 
      name: "Transparent First Aid Box", 
      description: "Clear visibility for quick item identification", 
      price: 349, 
      image: "/assets/static/TransparentBox.png",
      category: "kits",
      sizes: ["S", "M", "L"]
    },
    { 
      name: "Family First Aid Kit", 
      description: "Comprehensive kit for household emergency care", 
      price: 599, 
      image: "/assets/static/FamilyKit.png",
      category: "kits",
      sizes: ["S", "M", "L"]
    },
  ],
  consumables: [
    { 
      name: "Sterile Gauze", 
      description: "Medical-grade sterile gauze pads and rolls", 
      price: 149, 
      image: "/assets/static/SterileGauze.png",
      category: "consumables",
      sizes: ["50ml", "100ml", "250ml"]
    },
    { 
      name: "Adhesive Bandages", 
      description: "Various sizes of adhesive bandages", 
      price: 89, 
      image: "/assets/static/AdhesiveBandages.png",
      category: "consumables",
      sizes: ["Small (1.9×7.2 cm)", "Medium (2.5×7.5 cm)", "Large (3.8×7.5 cm)"]
    },
    { 
      name: "Antiseptic Wipes", 
      description: "Alcohol-based antiseptic cleaning wipes", 
      price: 129, 
      image: "/assets/static/AntisepticWipes.png",
      category: "consumables",
      sizes: ["10 Wipes", "25 Wipes", "50 Wipes"]
    },
    { 
      name: "Disposable Gloves", 
      description: "Latex-free disposable examination gloves", 
      price: 199, 
      image: "/assets/static/DisposableGloves.png",
      category: "consumables",
      sizes: ["Small (7 cm)", "Medium (8 cm)", "Large (9 cm)", "Extra-Large (10 cm)"]
    },
    { 
      name: "Adhesive Tape", 
      description: "Medical adhesive tape for securing bandages", 
      price: 79, 
      image: "/assets/static/AdhesiveTape.png",
      category: "consumables",
      sizes: ["1 cm × 5 m", "2.5 cm × 5 m", "5 cm × 5 m"]
    },
    { 
      name: "Triangular Bandages", 
      description: "Multi-purpose triangular bandages for slings", 
      price: 159, 
      image: "/assets/static/TriangularBandages.png",
      category: "consumables",
      sizes: ["Adult (96×96×136 cm)", "Child (85×85×120 cm)", "Compact (60×60×85 cm)"]
    },
  ],
  specialty: [
    { 
      name: "Scissors and Tweezers", 
      description: "Precision medical instruments", 
      price: 249, 
      image: "/assets/static/ScissorsAndTweezers.png",
      category: "specialty",
      sizes: ["Small (10 cm)", "Standard (12.5 cm)", "Large (15 cm)"]
    },
    { 
      name: "Antibiotic Ointment", 
      description: "Topical antibiotic for wound care", 
      price: 189, 
      image: "/assets/static/AntibioticOintment.png",
      category: "specialty",
      sizes: ["5 g", "10 g", "15 g"]
    },
    { 
      name: "Pain Relievers", 
      description: "Over-the-counter pain medication", 
      price: 99, 
      image: "/assets/static/PainRelievers.png",
      category: "specialty",
      sizes: ["10 Tablets", "20 Tablets", "50 Tablets"]
    },
  ],
} as const;

export const categories = [
  { id: "all", label: "All Products" },
  { id: "kits", label: "First Aid Kits" },
  { id: "consumables", label: "Consumables" },
  { id: "specialty", label: "Specialty Items" },
] as const;

export const getAllProducts = (): Product[] => {
  return [...products.kits, ...products.consumables, ...products.specialty];
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") {
    return getAllProducts();
  }
  return products[categoryId as keyof typeof products] || [];
};
