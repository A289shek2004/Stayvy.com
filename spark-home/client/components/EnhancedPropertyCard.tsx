import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, MapPinIcon, HeartIcon, ClockIcon, CloudIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VibeScore } from "./VibeScore";
import { LocalCulturePreview } from "./LocalCulturePreview";
import { BudgetSplitCalculator, useBudgetSplit } from "./BudgetSplitCalculator";

interface EnhancedProperty {
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
  urgency?: {
    type: "rooms" | "bookings" | "views";
    count: number;
    timeframe?: string;
  };
  weather?: {
    temp: number;
    condition: "sunny" | "cloudy" | "rainy";
    description: string;
  };
}

interface EnhancedPropertyCardProps {
  property: EnhancedProperty;
  showWeather?: boolean;
  showUrgency?: boolean;
  showVibeScore?: boolean;
  showLocalCulture?: boolean;
  showBudgetSplit?: boolean;
}

export function EnhancedPropertyCard({
  property,
  showWeather = true,
  showUrgency = true,
  showVibeScore = true,
  showLocalCulture = true,
  showBudgetSplit = true
}: EnhancedPropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const budgetSplit = useBudgetSplit(property.price);
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

  const getUrgencyMessage = () => {
    if (!property.urgency) return null;
    
    const { type, count, timeframe } = property.urgency;
    
    switch (type) {
      case "rooms":
        return `Only ${count} room${count > 1 ? 's' : ''} left`;
      case "bookings":
        return `Booked ${count} time${count > 1 ? 's' : ''} ${timeframe || 'today'}`;
      case "views":
        return `${count} people viewing now`;
      default:
        return null;
    }
  };

  const getWeatherIcon = () => {
    if (!property.weather) return null;
    
    switch (property.weather.condition) {
      case "sunny":
        return <SunIcon className="h-4 w-4 text-yellow-500" />;
      case "cloudy":
        return <CloudIcon className="h-4 w-4 text-gray-500" />;
      case "rainy":
        return <CloudIcon className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/listing/${property.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110 brightness-110" : "scale-100"
          )}
        />
        
        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {/* View Details Button */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 transform",
            isHovered ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
          )}>
            <Button 
              onClick={handleViewDetails}
              className="bg-cream/95 backdrop-blur-sm text-gray-900 hover:bg-light-sage shadow-xl px-8 py-3 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.isFeatured && (
            <Badge className="bg-dusky-rose text-white border-0 shadow-lg">
              Featured
            </Badge>
          )}
          {property.isNew && (
            <Badge className="bg-green-500 text-white border-0 shadow-lg">
              New
            </Badge>
          )}
          {property.discount && (
            <Badge className="bg-red-500 text-white border-0 shadow-lg animate-pulse">
              {property.discount}% OFF
            </Badge>
          )}
        </div>

        {/* Weather Info */}
        {showWeather && property.weather && (
          <div className="absolute top-3 right-16 bg-peach/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
            {getWeatherIcon()}
            <span className="text-sm font-medium">{property.weather.temp}°C</span>
          </div>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-cream/90 backdrop-blur-sm hover:bg-cream shadow-lg hover:scale-110 transition-all duration-300"
          onClick={handleWishlist}
        >
          <HeartIcon 
            className={cn(
              "h-5 w-5 transition-all duration-300",
              isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-600"
            )} 
          />
        </Button>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-sage/95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1 shadow-lg">
          <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{property.rating}</span>
        </div>

        {/* Urgency Indicator */}
        {showUrgency && property.urgency && (
          <div className="absolute bottom-3 left-3 bg-red-500/90 backdrop-blur-sm text-white rounded-lg px-3 py-1 flex items-center gap-1 shadow-lg animate-pulse">
            <ClockIcon className="h-3 w-3" />
            <span className="text-xs font-medium">{getUrgencyMessage()}</span>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-dusky-rose transition-colors duration-300 line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPinIcon className="h-3 w-3" />
            <span>{property.location}</span>
            {showWeather && property.weather && (
              <Badge variant="outline" className="ml-2 text-xs">
                {property.weather.description}
              </Badge>
            )}
          </div>
        </div>

        {/* Vibe Score */}
        {showVibeScore && (
          <div className="mt-3">
            <VibeScore
              propertyId={property.id}
              location={property.location}
              reviews={property.reviews}
              rating={property.rating}
              size="sm"
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{property.rating}</span>
            <span>({property.reviews} reviews)</span>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              {property.discount && (
                <span className="text-sm text-gray-500 line-through">
                  ${property.price}
                </span>
              )}
              <span className="font-bold text-lg text-gray-900">
                ${Math.round(discountedPrice)}
              </span>
            </div>
            <p className="text-xs text-gray-600">per night</p>
            {budgetSplit.isActive && (
              <p className="text-xs text-dusky-rose font-medium">
                ${budgetSplit.pricePerPerson}/person
              </p>
            )}
          </div>
        </div>

        {/* Local Culture Preview */}
        {showLocalCulture && isHovered && (
          <div className="border-t pt-4 mt-4">
            <LocalCulturePreview
              location={property.location}
            />
          </div>
        )}
      </CardContent>

      {/* Budget Split Calculator */}
      {showBudgetSplit && (
        <BudgetSplitCalculator
          totalPrice={Math.round(discountedPrice)}
          onSplitUpdate={budgetSplit.handleSplitUpdate}
        />
      )}
    </Card>
  );
}
