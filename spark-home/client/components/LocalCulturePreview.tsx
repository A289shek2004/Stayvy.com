import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CalendarIcon, 
  UtensilsIcon, 
  MapPinIcon,
  ExternalLinkIcon
} from "lucide-react";

interface LocalExperience {
  id: string;
  type: "festival" | "food" | "attraction";
  title: string;
  description: string;
  icon: React.ReactNode;
  timing?: string;
  price?: string;
}

interface LocalCulturePreviewProps {
  location: string;
  experiences?: LocalExperience[];
  className?: string;
}

// Mock data generator based on location
const generateLocalExperiences = (location: string): LocalExperience[] => {
  const locationData: Record<string, LocalExperience[]> = {
    "Miami Beach, Florida": [
      {
        id: "1",
        type: "festival",
        title: "Art Basel Miami Beach",
        description: "World-renowned contemporary art fair",
        icon: <CalendarIcon className="h-4 w-4" />,
        timing: "December",
        price: "From $45"
      },
      {
        id: "2", 
        type: "food",
        title: "Cuban Sandwich Trail",
        description: "Authentic Cubano at local favorites",
        icon: <UtensilsIcon className="h-4 w-4" />,
        price: "From $12"
      },
      {
        id: "3",
        type: "attraction",
        title: "Wynwood Walls Street Art",
        description: "Colorful murals in arts district",
        icon: <MapPinIcon className="h-4 w-4" />,
        price: "Free"
      }
    ],
    "Aspen, Colorado": [
      {
        id: "1",
        type: "festival", 
        title: "Aspen Music Festival",
        description: "Classical music in mountain setting",
        icon: <CalendarIcon className="h-4 w-4" />,
        timing: "Summer",
        price: "From $35"
      },
      {
        id: "2",
        type: "food",
        title: "Rocky Mountain Cuisine",
        description: "Farm-to-table dining experience",
        icon: <UtensilsIcon className="h-4 w-4" />,
        price: "From $85"
      },
      {
        id: "3",
        type: "attraction",
        title: "Maroon Bells Scenic Area",
        description: "Most photographed peaks in North America",
        icon: <MapPinIcon className="h-4 w-4" />,
        price: "$16"
      }
    ],
    "Charleston, South Carolina": [
      {
        id: "1",
        type: "festival",
        title: "Spoleto Festival USA",
        description: "International arts festival",
        icon: <CalendarIcon className="h-4 w-4" />,
        timing: "May-June",
        price: "From $25"
      },
      {
        id: "2",
        type: "food", 
        title: "Lowcountry Boil",
        description: "Traditional shrimp and grits experience",
        icon: <UtensilsIcon className="h-4 w-4" />,
        price: "From $28"
      },
      {
        id: "3",
        type: "attraction",
        title: "Historic Plantation Tours",
        description: "Magnolia & Boone Hall plantations",
        icon: <MapPinIcon className="h-4 w-4" />,
        price: "From $30"
      }
    ]
  };

  return locationData[location] || [
    {
      id: "1",
      type: "festival",
      title: "Local Music Festival",
      description: "Experience regional music culture",
      icon: <CalendarIcon className="h-4 w-4" />,
      timing: "Seasonal",
      price: "From $25"
    },
    {
      id: "2",
      type: "food",
      title: "Regional Specialty Dish",
      description: "Must-try local cuisine",
      icon: <UtensilsIcon className="h-4 w-4" />,
      price: "From $15"
    },
    {
      id: "3",
      type: "attraction",
      title: "Hidden Local Gem",
      description: "Off-the-beaten-path attraction",
      icon: <MapPinIcon className="h-4 w-4" />,
      price: "From $20"
    }
  ];
};

const getTypeColor = (type: LocalExperience['type']) => {
  switch (type) {
    case 'festival':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'food':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'attraction':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function LocalCulturePreview({ 
  location, 
  experiences,
  className 
}: LocalCulturePreviewProps) {
  const localExperiences = experiences || generateLocalExperiences(location);

  return (
    <div className={className}>
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <span>🌟</span>
          Local Culture & Experiences
        </h4>
        <p className="text-xs text-gray-600">Discover what makes {location.split(',')[0]} special</p>
      </div>

      <div className="space-y-3">
        {localExperiences.map((experience) => (
          <Card key={experience.id} className="border-l-4 border-l-dusky-rose bg-light-sage hover:bg-cream transition-colors cursor-pointer group">
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1">
                  <div className="mt-0.5 text-dusky-rose">
                    {experience.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-medium text-gray-900 truncate">
                        {experience.title}
                      </h5>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(experience.type)}`}>
                        {experience.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {experience.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      {experience.timing && (
                        <span className="text-xs text-gray-500">📅 {experience.timing}</span>
                      )}
                      {experience.price && (
                        <span className="text-xs font-medium text-dusky-rose">
                          {experience.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <ExternalLinkIcon className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="w-full mt-3 text-dusky-rose border-dusky-rose hover:bg-dusky-rose hover:text-white"
      >
        Explore More Local Experiences
      </Button>
    </div>
  );
}
