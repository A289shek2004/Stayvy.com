import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapLocation {
  id: string;
  name: string;
  position: { x: number; y: number }; // Percentage positions on the map
  properties: number;
  averagePrice: number;
  rating: number;
  thumbnail: string;
  popularProperty: {
    name: string;
    price: number;
    image: string;
  };
}

const mapLocations: MapLocation[] = [
  {
    id: "california",
    name: "California",
    position: { x: 15, y: 55 },
    properties: 2145,
    averagePrice: 185,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop",
    popularProperty: {
      name: "Malibu Beach House",
      price: 320,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=150&fit=crop"
    }
  },
  {
    id: "florida",
    name: "Florida",
    position: { x: 75, y: 80 },
    properties: 1892,
    averagePrice: 165,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&h=150&fit=crop",
    popularProperty: {
      name: "Miami Beach Resort",
      price: 275,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop"
    }
  },
  {
    id: "newyork",
    name: "New York",
    position: { x: 72, y: 35 },
    properties: 1756,
    averagePrice: 285,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&h=150&fit=crop",
    popularProperty: {
      name: "Manhattan Penthouse",
      price: 450,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=150&fit=crop"
    }
  },
  {
    id: "colorado",
    name: "Colorado",
    position: { x: 45, y: 45 },
    properties: 634,
    averagePrice: 195,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    popularProperty: {
      name: "Aspen Lodge",
      price: 385,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=150&fit=crop"
    }
  },
  {
    id: "texas",
    name: "Texas",
    position: { x: 40, y: 65 },
    properties: 1297,
    averagePrice: 145,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop",
    popularProperty: {
      name: "Austin Loft",
      price: 185,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop"
    }
  },
  {
    id: "washington",
    name: "Washington",
    position: { x: 18, y: 25 },
    properties: 732,
    averagePrice: 175,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=200&h=150&fit=crop",
    popularProperty: {
      name: "Seattle Waterfront",
      price: 225,
      image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=200&h=150&fit=crop"
    }
  }
];

interface MapPinProps {
  location: MapLocation;
  isHovered: boolean;
  onHover: (location: MapLocation | null) => void;
  onClick: (location: MapLocation) => void;
}

function MapPin({ location, isHovered, onHover, onClick }: MapPinProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
      onMouseEnter={() => onHover(location)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(location)}
    >
      <div className={cn(
        "relative transition-all duration-300",
        isHovered ? "scale-125" : "scale-100"
      )}>
        {/* Pin */}
        <div className={cn(
          "w-8 h-8 rounded-full border-4 border-white shadow-lg transition-colors duration-300 flex items-center justify-center",
          isHovered ? "bg-dusky-thistle" : "bg-dusky-rose"
        )}>
          <MapPinIcon className="h-4 w-4 text-white" />
        </div>
        
        {/* Pulse animation */}
        <div className={cn(
          "absolute inset-0 rounded-full animate-ping",
          isHovered ? "bg-dusky-thistle/30" : "bg-dusky-rose/30"
        )} />
        
        {/* Label */}
        <div className={cn(
          "absolute top-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Badge className="bg-cream text-gray-900 border border-gray-200 shadow-lg whitespace-nowrap">
            {location.name}
          </Badge>
        </div>
      </div>
    </div>
  );
}

interface LocationTooltipProps {
  location: MapLocation;
  position: { x: number; y: number };
}

function LocationTooltip({ location, position }: LocationTooltipProps) {
  return (
    <div 
      className="absolute z-50 pointer-events-none"
      style={{ 
        left: `${Math.min(position.x, 70)}%`, 
        top: `${Math.max(position.y - 10, 5)}%`
      }}
    >
      <Card className="w-64 shadow-xl border-2 border-dusky-rose/20">
        <CardContent className="p-0">
          <img 
            src={location.popularProperty.image}
            alt={location.popularProperty.name}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 mb-1">{location.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{location.properties} properties available</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Popular:</span>
                <span className="text-sm font-medium">{location.popularProperty.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">From:</span>
                <span className="font-semibold text-dusky-rose">
                  ${location.averagePrice}/night
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rating:</span>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{location.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function InteractiveMap() {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);

  const handleLocationClick = (location: MapLocation) => {
    // Navigate to search results for this location
    const params = new URLSearchParams();
    params.set('destination', location.name);
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Popular Destinations</h2>
        <p className="text-lg text-gray-600">Click on any location to discover amazing stays</p>
      </div>
      
      <Card className="overflow-hidden border-gray-200 shadow-lg">
        <CardContent className="p-0">
          <div className="relative">
            {/* USA Map Background */}
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-96 overflow-hidden">
              {/* Simplified USA map outline */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full opacity-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10,40 Q15,30 25,35 Q35,30 45,35 Q55,25 65,30 Q75,25 85,35 Q90,40 88,50 Q85,60 80,65 Q70,70 60,68 Q50,75 40,70 Q30,75 20,70 Q15,60 12,50 Q10,45 10,40 Z"
                  fill="currentColor"
                  className="text-dusky-rose"
                />
              </svg>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-dusky-rose via-dusky-thistle to-dusky-hawthorne" />
              </div>
            </div>
            
            {/* Map Pins */}
            {mapLocations.map((location) => (
              <MapPin
                key={location.id}
                location={location}
                isHovered={hoveredLocation?.id === location.id}
                onHover={setHoveredLocation}
                onClick={handleLocationClick}
              />
            ))}
            
            {/* Tooltip */}
            {hoveredLocation && (
              <LocationTooltip 
                location={hoveredLocation}
                position={hoveredLocation.position}
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {mapLocations.slice(0, 4).map((location) => (
          <Button 
            key={location.id}
            variant="outline" 
            size="sm"
            onClick={() => handleLocationClick(location)}
            className="hover:bg-dusky-rose hover:text-white"
          >
            {location.name} ({location.properties})
          </Button>
        ))}
      </div>
    </div>
  );
}
