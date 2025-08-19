import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

const categories: Category[] = [
  {
    id: "beach",
    name: "Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
    icon: "🏖️"
  },
  {
    id: "mountains", 
    name: "Mountains",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    icon: "⛰️"
  },
  {
    id: "city",
    name: "City Life", 
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    icon: "🏙️"
  },
  {
    id: "pet-friendly",
    name: "Pet-Friendly",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop", 
    icon: "🐕"
  },
  {
    id: "luxury",
    name: "Luxury",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
    icon: "💎"
  },
  {
    id: "budget", 
    name: "Budget Stays",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
    icon: "💰"
  },
  {
    id: "romantic",
    name: "Romantic",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop",
    icon: "💕"
  },
  {
    id: "adventure",
    name: "Adventure", 
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop",
    icon: "🎒"
  }
];

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: string) => void;
}

function CategoryCard({ category, onSelect }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0 w-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(category.id)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-70"
        )}>
          <div className="absolute bottom-2 left-2 text-white text-2xl">
            {category.icon}
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm text-center text-gray-900 group-hover:text-dusky-rose transition-colors">
          {category.name}
        </h3>
      </CardContent>
    </Card>
  );
}

interface CategoryScrollProps {
  onCategorySelect?: (categoryId: string) => void;
}

export function CategoryScroll({ onCategorySelect }: CategoryScrollProps) {
  const handleCategorySelect = (categoryId: string) => {
    // Navigate to search results with category filter
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    // For now, just log - can be enhanced to navigate with filters
    console.log(`Selected category: ${categoryId}`);
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Category</h2>
        <p className="text-gray-600">Find the perfect stay for your travel style</p>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
}
