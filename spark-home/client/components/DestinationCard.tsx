import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, MapPinIcon, CloudRainIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  isMonsoonFriendly?: boolean;
  tags?: string[];
  className?: string;
}

export function DestinationCard({
  id,
  title,
  location,
  image,
  price,
  rating,
  reviews,
  isMonsoonFriendly = false,
  tags = [],
  className
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${id}`);
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay with Netflix-style hover effect */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <div className="flex items-center gap-2 text-sm">
              <MapPinIcon className="h-4 w-4" />
              <span>{location}</span>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Monsoon badge */}
        {isMonsoonFriendly && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-dusky-hawthorne text-white border-0 flex items-center gap-1">
              <CloudRainIcon className="h-3 w-3" />
              Monsoon Special
            </Badge>
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-mauve/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" />
              {location}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span>({reviews} reviews)</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-gray-900">${price}</span>
            <p className="text-xs text-gray-600">per night</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
