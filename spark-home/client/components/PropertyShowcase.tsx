import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, MapPinIcon, HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

const featuredProperties: Property[] = [
  {
    id: "p1",
    name: "Oceanfront Villa Paradise",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
    price: 385,
    rating: 4.9,
    reviews: 127,
    isFeatured: true,
    discount: 25
  },
  {
    id: "p2", 
    name: "Mountain View Retreat",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    price: 275,
    rating: 4.8,
    reviews: 89,
    isNew: true
  },
  {
    id: "p3",
    name: "Heritage Palace Stay",
    location: "Newport, Rhode Island", 
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    price: 485,
    rating: 4.9,
    reviews: 203,
    isFeatured: true
  },
  {
    id: "p4",
    name: "Cozy Mountain Cottage",
    location: "Big Sur, California",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", 
    price: 195,
    rating: 4.7,
    reviews: 156,
    discount: 15
  },
  {
    id: "p5",
    name: "Modern City Penthouse",
    location: "Manhattan, New York",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    price: 305,
    rating: 4.6,
    reviews: 94,
    isNew: true
  },
  {
    id: "p6",
    name: "Riverside Luxury Resort",
    location: "Napa Valley, California",
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=600&h=400&fit=crop",
    price: 345,
    rating: 4.8,
    reviews: 178
  }
];

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/listing/${property.id}`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discountedPrice = property.discount 
    ? property.price - (property.price * property.discount / 100)
    : property.price;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/listing/${property.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {/* View Details Button */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300 transform",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <Button 
              onClick={handleViewDetails}
              className="bg-cream text-gray-900 hover:bg-light-sage shadow-lg px-6"
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isFeatured && (
            <Badge className="bg-dusky-rose text-white border-0">
              Featured
            </Badge>
          )}
          {property.isNew && (
            <Badge className="bg-green-500 text-white border-0">
              New
            </Badge>
          )}
          {property.discount && (
            <Badge className="bg-red-500 text-white border-0">
              {property.discount}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-cream/80 backdrop-blur-sm hover:bg-cream"
          onClick={handleWishlist}
        >
          <HeartIcon 
            className={cn(
              "h-5 w-5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            )} 
          />
        </Button>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-peach/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{property.rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-dusky-rose transition-colors">
            {property.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            {property.location}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{property.rating}</span>
            <span>({property.reviews} reviews)</span>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              {property.discount && (
                <span className="text-sm text-gray-500 line-through">
                  ${property.price}
                </span>
              )}
              <span className="font-semibold text-gray-900">
                ${Math.round(discountedPrice)}
              </span>
            </div>
            <p className="text-xs text-gray-600">per night</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PropertyShowcase() {
  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Handpicked for You</h2>
        <p className="text-lg text-gray-600">Discover our curated collection of exceptional stays</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
