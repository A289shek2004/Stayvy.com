import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  SunIcon, 
  SnowflakeIcon, 
  UmbrellaIcon, 
  LeafIcon,
  SparklesIcon,
  TrendingUpIcon
} from "lucide-react";

interface PromotionalOffer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  icon: React.ReactNode;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  category: string;
}

const promotionalOffers: PromotionalOffer[] = [
  {
    id: "summer",
    title: "🌞 Summer Getaways",
    subtitle: "Beach resorts & coastal villas",
    discount: "Up to 30% Off",
    icon: <SunIcon className="h-8 w-8" />,
    backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop",
    backgroundColor: "from-orange-400 to-yellow-500",
    textColor: "text-white",
    buttonText: "Explore Beach Stays",
    category: "beach"
  },
  {
    id: "monsoon",
    title: "🌧️ Monsoon Magic", 
    subtitle: "Hill stations & cozy retreats",
    discount: "Up to 25% Off",
    icon: <UmbrellaIcon className="h-8 w-8" />,
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    backgroundColor: "from-dusky-rose to-dusky-thistle",
    textColor: "text-white", 
    buttonText: "Discover Hill Stations",
    category: "mountains"
  },
  {
    id: "luxury",
    title: "✨ Luxury Escapes",
    subtitle: "Premium villas & heritage hotels",
    discount: "Up to 40% Off",
    icon: <SparklesIcon className="h-8 w-8" />,
    backgroundImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
    backgroundColor: "from-purple-600 to-pink-600",
    textColor: "text-white",
    buttonText: "Experience Luxury",
    category: "luxury"
  }
];

interface PromotionalCardProps {
  offer: PromotionalOffer;
}

function PromotionalCard({ offer }: PromotionalCardProps) {
  const navigate = useNavigate();

  const handleExplore = () => {
    // Navigate to search results with the promotional filter
    const params = new URLSearchParams();
    params.set('category', offer.category);
    params.set('promotion', offer.id);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative h-64 overflow-hidden">
        {/* Background Image */}
        <img 
          src={offer.backgroundImage}
          alt={offer.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${offer.backgroundColor} opacity-80`} />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-4">
              {offer.discount}
            </Badge>
            <div className="flex items-center gap-3 mb-3">
              <div className={offer.textColor}>
                {offer.icon}
              </div>
              <h3 className={`text-2xl font-bold ${offer.textColor}`}>
                {offer.title}
              </h3>
            </div>
            <p className={`text-lg ${offer.textColor} opacity-90`}>
              {offer.subtitle}
            </p>
          </div>
          
          <Button 
            onClick={handleExplore}
            className="bg-cream text-gray-900 hover:bg-light-sage self-start shadow-lg"
          >
            {offer.buttonText}
          </Button>
        </div>
      </div>
    </Card>
  );
}

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string;
    icon: React.ReactNode;
  }>;
}

function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2 text-dusky-rose">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PromotionalSections() {
  const stats = [
    {
      label: "Properties",
      value: "10,000+",
      icon: <TrendingUpIcon className="h-6 w-6" />
    },
    {
      label: "Cities",
      value: "500+", 
      icon: <SparklesIcon className="h-6 w-6" />
    },
    {
      label: "Happy Guests",
      value: "1M+",
      icon: <SunIcon className="h-6 w-6" />
    },
    {
      label: "Countries",
      value: "50+",
      icon: <LeafIcon className="h-6 w-6" />
    }
  ];

  return (
    <div className="py-12">
      {/* Quick Stats */}
      <QuickStats stats={stats} />
      
      {/* Promotional Offers */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers</h2>
        <p className="text-lg text-gray-600">Limited time deals you won't want to miss</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotionalOffers.map((offer) => (
          <PromotionalCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
