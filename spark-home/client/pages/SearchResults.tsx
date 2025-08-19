import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DestinationCard } from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  SlidersHorizontalIcon, 
  MapIcon, 
  ListIcon,
  FilterIcon
} from "lucide-react";

// Mock search results
const searchResults = [
  {
    id: "1",
    title: "Luxury Mountain Villa",
    location: "Park City, Utah",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=400&fit=crop",
    price: 375,
    rating: 4.9,
    reviews: 87,
    isMonsoonFriendly: true,
    tags: ["Villa", "Mountain View", "Hot Tub"]
  },
  {
    id: "2",
    title: "Riverside Cottage",
    location: "Sedona, Arizona", 
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=500&h=400&fit=crop",
    price: 155,
    rating: 4.7,
    reviews: 124,
    isMonsoonFriendly: true,
    tags: ["Cottage", "River View", "Yoga"]
  },
  {
    id: "3",
    title: "Heritage Haveli",
    location: "Santa Fe, New Mexico",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=400&fit=crop",
    price: 285,
    rating: 4.8,
    reviews: 156,
    tags: ["Heritage", "Palace", "Cultural"]
  },
  {
    id: "4",
    title: "Beach House",
    location: "Cape Cod, Massachusetts",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop",
    price: 235,
    rating: 4.6,
    reviews: 203,
    tags: ["Beach", "Pool", "Sunset View"]
  },
  {
    id: "5",
    title: "Tea Estate Bungalow",
    location: "Darjeeling, West Bengal",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
    price: 185,
    rating: 4.8,
    reviews: 92,
    isMonsoonFriendly: true,
    tags: ["Tea Estate", "Hill Station", "Peaceful"]
  },
  {
    id: "6",
    title: "Modern Apartment",
    location: "Bengaluru, Karnataka",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop",
    price: 115,
    rating: 4.4,
    reviews: 67,
    tags: ["Modern", "City Center", "Tech Hub"]
  }
];

export default function SearchResults() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showMonsoonOnly, setShowMonsoonOnly] = useState(false);

  const filteredResults = searchResults.filter(result => {
    const priceInRange = result.price >= priceRange[0] && result.price <= priceRange[1];
    const monsoonFilter = !showMonsoonOnly || result.isMonsoonFriendly;
    return priceInRange && monsoonFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600">
                {filteredResults.length} stays • June 15-20 • 2 guests
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="rounded-none"
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                Filters
              </h3>
              
              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-medium">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Monsoon Special */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="monsoon" 
                    checked={showMonsoonOnly}
                    onCheckedChange={setShowMonsoonOnly}
                  />
                  <label htmlFor="monsoon" className="text-sm font-medium">
                    Monsoon Special Only
                  </label>
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-4 pt-6 border-t">
                <h4 className="font-medium">Property Type</h4>
                <div className="space-y-2">
                  {["Villa", "Cottage", "Apartment", "Heritage", "Beach House"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <label htmlFor={type} className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4 pt-6 border-t">
                <h4 className="font-medium">Amenities</h4>
                <div className="space-y-2">
                  {["WiFi", "Pool", "Hot Tub", "Kitchen", "Parking"].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <label htmlFor={amenity} className="text-sm">{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResults.map((result) => (
                  <DestinationCard key={result.id} {...result} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Map view coming soon</p>
                </div>
              </div>
            )}

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No results found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
