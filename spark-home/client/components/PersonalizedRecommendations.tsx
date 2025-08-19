import { useState, useEffect } from "react";
import { DestinationCard } from "./DestinationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  UserIcon, 
  HeartIcon, 
  ClockIcon, 
  TrendingUpIcon,
  ChevronRightIcon
} from "lucide-react";

// Mock user data and preferences
const mockUser = {
  name: "Shraddha",
  lastSearches: ["Miami", "California", "Charleston"],
  preferredPriceRange: { min: 150, max: 400 },
  favoriteCategories: ["beach", "luxury"],
  pastBookings: [
    { location: "Miami", category: "beach", rating: 4.8 },
    { location: "Charleston", category: "luxury", rating: 4.9 }
  ]
};

// Mock personalized recommendations based on user history
const personalizedRecommendations = [
  {
    id: "rec1",
    title: "Luxury Beach Resort",
    location: "Key West, Florida",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=400&fit=crop",
    price: 285,
    rating: 4.8,
    reviews: 156,
    tags: ["Beach", "Luxury", "Pool"],
    matchReason: "Similar to your stay in Miami"
  },
  {
    id: "rec2",
    title: "Heritage Palace Hotel",
    location: "Savannah, Georgia", 
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop",
    price: 375,
    rating: 4.9,
    reviews: 89,
    tags: ["Heritage", "Luxury", "Palace"],
    matchReason: "You loved luxury stays"
  },
  {
    id: "rec3",
    title: "Beachfront Villa",
    location: "Monterey, California",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
    price: 235,
    rating: 4.7,
    reviews: 203,
    tags: ["Beach", "Villa", "Peaceful"],
    matchReason: "Based on your California search"
  }
];

const recentSearches = [
  { destination: "Miami", searches: 3, lastSearched: "2 days ago" },
  { destination: "California", searches: 2, lastSearched: "1 week ago" },
  { destination: "Charleston", searches: 1, lastSearched: "2 weeks ago" }
];

interface PersonalizedRecommendationsProps {
  isLoggedIn?: boolean;
}

export function PersonalizedRecommendations({ isLoggedIn = true }: PersonalizedRecommendationsProps) {
  const [showPersonalized, setShowPersonalized] = useState(false);

  useEffect(() => {
    // Simulate checking if user is logged in and has history
    setShowPersonalized(isLoggedIn);
  }, [isLoggedIn]);

  if (!showPersonalized) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-dusky-rose rounded-full">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back, {mockUser.name}! 👋
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Here are stays we think you'll love, based on your preferences and travel history
          </p>
        </div>

        {/* Recent Searches Quick Access */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-dusky-rose" />
            Your Recent Searches
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentSearches.map((search) => (
              <Badge 
                key={search.destination}
                variant="outline" 
                className="cursor-pointer hover:bg-dusky-rose hover:text-white transition-colors px-4 py-2 whitespace-nowrap flex items-center gap-2"
              >
                <span>{search.destination}</span>
                <span className="text-xs opacity-75">({search.searches})</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <HeartIcon className="h-6 w-6 text-red-500" />
              Picked Just for You
            </h3>
            <Button variant="outline" className="flex items-center gap-2">
              View all <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="relative">
                <DestinationCard {...recommendation} />
                {/* Match Reason Badge */}
                <div className="absolute -top-2 left-4 z-10">
                  <Badge className="bg-green-500 text-white border-0 text-xs px-3 py-1">
                    {recommendation.matchReason}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending in Your Preferred Locations */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-dusky-rose" />
            Trending in Your Favorite Destinations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockUser.lastSearches.map((location, index) => (
              <div 
                key={location}
                className="bg-mauve rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 group-hover:text-dusky-rose transition-colors">
                    {location}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 50) + 20} new listings
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Avg. Price:</span>
                    <span className="font-medium">${Math.round(Math.random() * 200 + 150)}/night</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Popular this week:</span>
                    <span className="font-medium">Beach Resorts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
