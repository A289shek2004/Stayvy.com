import { EnhancedPropertyCard } from "./EnhancedPropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

// Enhanced properties with urgency and weather data
const enhancedProperties = [
  {
    id: "ep1",
    name: "Oceanfront Paradise Villa",
    location: "Miami Beach, Florida",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
    price: 385,
    rating: 4.9,
    reviews: 127,
    isFeatured: true,
    discount: 25,
    urgency: {
      type: "rooms" as const,
      count: 2
    },
    weather: {
      temp: 28,
      condition: "sunny" as const,
      description: "Perfect beach weather"
    }
  },
  {
    id: "ep2", 
    name: "Mountain View Luxury Retreat",
    location: "Jackson Hole, Wyoming",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    price: 275,
    rating: 4.8,
    reviews: 89,
    isNew: true,
    urgency: {
      type: "bookings" as const,
      count: 7,
      timeframe: "today"
    },
    weather: {
      temp: 15,
      condition: "cloudy" as const,
      description: "Cool mountain air"
    }
  },
  {
    id: "ep3",
    name: "Historic Mansion Estate",
    location: "Charleston, South Carolina", 
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    price: 485,
    rating: 4.9,
    reviews: 203,
    isFeatured: true,
    urgency: {
      type: "views" as const,
      count: 12
    },
    weather: {
      temp: 32,
      condition: "sunny" as const,
      description: "Warm desert climate"
    }
  },
  {
    id: "ep4",
    name: "Mountain Lake Cottage",
    location: "Lake Tahoe, Nevada",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", 
    price: 195,
    rating: 4.7,
    reviews: 156,
    discount: 15,
    urgency: {
      type: "rooms" as const,
      count: 1
    },
    weather: {
      temp: 22,
      condition: "rainy" as const,
      description: "Perfect monsoon retreat"
    }
  },
  {
    id: "ep5",
    name: "Modern City Penthouse",
    location: "Chicago, Illinois",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    price: 305,
    rating: 4.6,
    reviews: 94,
    isNew: true,
    urgency: {
      type: "bookings" as const,
      count: 5,
      timeframe: "this week"
    },
    weather: {
      temp: 29,
      condition: "cloudy" as const,
      description: "Monsoon season"
    }
  },
  {
    id: "ep6",
    name: "Riverside Luxury Resort",
    location: "Sonoma County, California",
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=600&h=400&fit=crop",
    price: 345,
    rating: 4.8,
    reviews: 178,
    urgency: {
      type: "views" as const,
      count: 8
    },
    weather: {
      temp: 25,
      condition: "sunny" as const,
      description: "River valley climate"
    }
  }
];

export function EnhancedPropertyShowcase() {
  return (
    <div className="py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Property Updates</h2>
            <p className="text-lg text-gray-600">Real-time availability and weather conditions</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-dusky-rose hover:text-white transition-all duration-300">
            View all <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Live Update Indicators */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live Availability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Weather Updates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Booking Activity</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enhancedProperties.map((property) => (
          <EnhancedPropertyCard 
            key={property.id} 
            property={property}
            showWeather={true}
            showUrgency={true}
          />
        ))}
      </div>
    </div>
  );
}
