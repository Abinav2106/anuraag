export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: readonly string[];
  inStock: boolean;
}

export const products = {
  kits: [
    { 
      name: "Plastic First Aid Box", 
      description: "Durable plastic construction for basic first aid needs", 
      price: 299, 
      image: "/assets/static/PlasticFirstAidBox.jpg",
      category: "kits",
      sizes: ["S", "M", "L"],
      inStock: true
    },
    { 
      name: "Vinyl First Aid Kit", 
      description: "Portable vinyl case with essential medical supplies", 
      price: 399, 
      image: "/assets/static/VinylFirstAidKit.jpg",
      category: "kits",
      sizes: ["S", "M", "L"],
      inStock: true
    },
    { 
      name: "Transparent First Aid Box", 
      description: "Clear visibility for quick item identification", 
      price: 349, 
      image: "/assets/static/TransparentBox.jpg",
      category: "kits",
      sizes: ["S", "M", "L"],
      inStock: true
    },
    { 
      name: "Family First Aid Kit", 
      description: "Comprehensive kit for household emergency care", 
      price: 599, 
      image: "/assets/static/FamilyKit.jpg",
      category: "kits",
      sizes: ["S", "M", "L"],
      inStock: true
    },
  ],
  consumables: [
    { 
      name: "Sterile Gauze", 
      description: "Medical-grade sterile gauze pads and rolls", 
      price: 149, 
      image: "/assets/static/SterileGauze.jpg",
      category: "consumables",
      sizes: ["50ml", "100ml", "250ml"],
      inStock: true
    },
    { 
      name: "Adhesive Bandages", 
      description: "Various sizes of adhesive bandages", 
      price: 89, 
      image: "/assets/static/ab.png",
      category: "consumables",
      sizes: ["Small (1.9×7.2 cm)", "Medium (2.5×7.5 cm)", "Large (3.8×7.5 cm)"],
      inStock: false
    },
    { 
      name: "Antiseptic Wipes", 
      description: "Alcohol-based antiseptic cleaning wipes", 
      price: 129, 
      image: "/assets/static/AntisepticWipes.jpg",
      category: "consumables",
      sizes: ["10 Wipes", "25 Wipes", "50 Wipes"],
      inStock: true
    },
    { 
      name: "Disposable Gloves", 
      description: "Latex-free disposable examination gloves", 
      price: 199, 
      image: "/assets/static/DisposableGloves.jpg",
      category: "consumables",
      sizes: ["Small (7 cm)", "Medium (8 cm)", "Large (9 cm)", "Extra-Large (10 cm)"],
      inStock: true
    },
    { 
      name: "Adhesive Tape", 
      description: "Medical adhesive tape for securing bandages", 
      price: 79, 
      image: "/assets/static/AdhesiveTape.jpg",
      category: "consumables",
      sizes: ["1 cm × 5 m", "2.5 cm × 5 m", "5 cm × 5 m"],
      inStock: true
    },
    { 
      name: "Triangular Bandages", 
      description: "Multi-purpose triangular bandages for slings", 
      price: 159, 
      image: "/assets/static/TriangularBandages.jpg",
      category: "consumables",
      sizes: ["Adult (96×96×136 cm)", "Child (85×85×120 cm)", "Compact (60×60×85 cm)"],
      inStock: true
    },
  ],
  specialty: [
    { 
      name: "Scissors and Tweezers", 
      description: "Precision medical instruments", 
      price: 249, 
      image: "/assets/static/ScissorsAndTweezers.jpg",
      category: "specialty",
      sizes: ["Small (10 cm)", "Standard (12.5 cm)", "Large (15 cm)"],
      inStock: true
    },
    { 
      name: "Antibiotic Ointment", 
      description: "Topical antibiotic for wound care", 
      price: 189, 
      image: "/assets/static/AntibioticOintment.jpg",
      category: "specialty",
      sizes: ["5 g", "10 g", "15 g"],
      inStock: false
    },
    { 
      name: "Pain Relievers", 
      description: "Over-the-counter pain medication", 
      price: 99, 
      image: "/assets/static/PainRelievers.jpg",
      category: "specialty",
      sizes: ["10 Tablets", "20 Tablets", "50 Tablets"],
      inStock: true
    },
  ],
} as const;

export const categories = [
  { id: "all", label: "All Products" },
  { id: "kits", label: "First Aid Kits" },
  { id: "consumables", label: "Consumables" },
  { id: "specialty", label: "Specialty Items" },
] as const;

export const getAllProducts = (): readonly Product[] => {
  return [...products.kits, ...products.consumables, ...products.specialty];
};

export const getProductsByCategory = (categoryId: string): readonly Product[] => {
  if (categoryId === "all") {
    return getAllProducts();
  }
  return products[categoryId as keyof typeof products] || [];
};
