import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VibeData {
  emoji: string;
  label: string;
  score: number; // 0-100
  description: string;
  color: string;
  bgColor: string;
}

interface VibeScoreProps {
  propertyId: string;
  location: string;
  propertyType?: string;
  reviews?: number;
  rating?: number;
  amenities?: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Algorithm to calculate vibe scores based on property characteristics
const calculateVibeScores = (props: {
  location: string;
  propertyType?: string;
  reviews?: number;
  rating?: number;
  amenities?: string[];
}): VibeData[] => {
  const { location, propertyType = "", reviews = 0, rating = 0, amenities = [] } = props;
  
  // Base scores
  let chillScore = 40;
  let partyScore = 20;
  let culturalScore = 30;

  // Location-based adjustments
  if (location.toLowerCase().includes("beach") || location.toLowerCase().includes("ocean")) {
    chillScore += 25;
    partyScore += 15;
  }
  if (location.toLowerCase().includes("mountain") || location.toLowerCase().includes("nature")) {
    chillScore += 30;
    culturalScore += 10;
  }
  if (location.toLowerCase().includes("city") || location.toLowerCase().includes("downtown")) {
    partyScore += 25;
    culturalScore += 20;
  }
  if (location.toLowerCase().includes("historic") || location.toLowerCase().includes("heritage")) {
    culturalScore += 35;
  }

  // Property type adjustments
  if (propertyType.toLowerCase().includes("hostel") || propertyType.toLowerCase().includes("shared")) {
    partyScore += 30;
    chillScore -= 15;
  }
  if (propertyType.toLowerCase().includes("resort") || propertyType.toLowerCase().includes("spa")) {
    chillScore += 25;
  }
  if (propertyType.toLowerCase().includes("villa") || propertyType.toLowerCase().includes("private")) {
    chillScore += 20;
    partyScore -= 10;
  }

  // Amenities adjustments
  amenities.forEach(amenity => {
    const lower = amenity.toLowerCase();
    if (lower.includes("spa") || lower.includes("wellness") || lower.includes("quiet")) {
      chillScore += 15;
    }
    if (lower.includes("pool") || lower.includes("bar") || lower.includes("nightlife")) {
      partyScore += 15;
    }
    if (lower.includes("cultural") || lower.includes("museum") || lower.includes("historic")) {
      culturalScore += 15;
    }
  });

  // Rating adjustments (higher rating = more refined vibes)
  if (rating >= 4.5) {
    chillScore += 10;
    culturalScore += 10;
  }
  if (rating >= 4.8) {
    chillScore += 5;
  }

  // Reviews count (more reviews = more social proof)
  if (reviews > 100) {
    partyScore += 5;
    culturalScore += 5;
  }

  // Normalize scores to 0-100
  chillScore = Math.min(100, Math.max(0, chillScore));
  partyScore = Math.min(100, Math.max(0, partyScore));
  culturalScore = Math.min(100, Math.max(0, culturalScore));

  return [
    {
      emoji: "🌿",
      label: "Chill Vibes",
      score: chillScore,
      description: "Perfect for relaxation and peace",
      color: "text-green-700",
      bgColor: "bg-green-100 border-green-300"
    },
    {
      emoji: "🎉",
      label: "Party Vibes", 
      score: partyScore,
      description: "Great for social experiences and fun",
      color: "text-purple-700",
      bgColor: "bg-purple-100 border-purple-300"
    },
    {
      emoji: "🏛",
      label: "Cultural Vibes",
      score: culturalScore,
      description: "Rich in local culture and history",
      color: "text-blue-700", 
      bgColor: "bg-blue-100 border-blue-300"
    }
  ];
};

const getScoreIntensity = (score: number): "low" | "medium" | "high" => {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
};

const getScoreDescription = (score: number): string => {
  if (score >= 85) return "Exceptional";
  if (score >= 70) return "Strong";
  if (score >= 55) return "Good";
  if (score >= 40) return "Moderate";
  if (score >= 25) return "Some";
  return "Low";
};

export function VibeScore({ 
  propertyId, 
  location, 
  propertyType, 
  reviews, 
  rating, 
  amenities,
  className,
  size = "md"
}: VibeScoreProps) {
  const vibes = calculateVibeScores({ location, propertyType, reviews, rating, amenities });
  
  // Get the top vibe (highest score)
  const topVibe = vibes.reduce((prev, current) => 
    prev.score > current.score ? prev : current
  );

  if (size === "sm") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <span className="text-lg">{topVibe.emoji}</span>
        <Badge variant="outline" className={cn("text-xs", topVibe.bgColor, topVibe.color)}>
          {topVibe.label}
        </Badge>
      </div>
    );
  }

  if (size === "lg") {
    return (
      <Card className={cn("", className)}>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>✨</span>
            Vibe Score
          </h4>
          
          <div className="space-y-3">
            {vibes.map((vibe) => (
              <div key={vibe.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{vibe.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {vibe.label}
                      </span>
                      <span className="text-xs text-gray-600">
                        {getScoreDescription(vibe.score)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          vibe.score >= 70 ? "bg-green-500" :
                          vibe.score >= 40 ? "bg-yellow-500" : "bg-gray-400"
                        )}
                        style={{ width: `${vibe.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{topVibe.emoji}</span>
              <span className="font-medium text-gray-900">Best Match</span>
            </div>
            <p className="text-sm text-gray-600">{topVibe.description}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default medium size
  return (
    <div className={cn("", className)}>
      <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
        <span>✨</span>
        Vibe Score
      </h5>
      
      <div className="flex gap-2 flex-wrap">
        {vibes.map((vibe) => {
          const intensity = getScoreIntensity(vibe.score);
          return (
            <Badge 
              key={vibe.label}
              variant="outline" 
              className={cn(
                "text-xs flex items-center gap-1",
                vibe.bgColor,
                vibe.color,
                intensity === "high" && "ring-1 ring-current",
                intensity === "low" && "opacity-60"
              )}
            >
              <span>{vibe.emoji}</span>
              <span>{vibe.label}</span>
              {intensity === "high" && <span className="text-xs">🔥</span>}
            </Badge>
          );
        })}
      </div>
      
      {topVibe.score >= 70 && (
        <p className="text-xs text-gray-600 mt-1">
          Perfect for {topVibe.label.toLowerCase()}
        </p>
      )}
    </div>
  );
}

// Hook for filtering properties by vibe
export function useVibeFilter() {
  const filterByVibe = (properties: any[], targetVibe: string, minScore: number = 60) => {
    return properties.filter(property => {
      const vibes = calculateVibeScores({
        location: property.location,
        propertyType: property.type,
        reviews: property.reviews,
        rating: property.rating,
        amenities: property.amenities || []
      });
      
      const vibe = vibes.find(v => v.label.toLowerCase().includes(targetVibe.toLowerCase()));
      return vibe && vibe.score >= minScore;
    });
  };

  return { filterByVibe };
}
