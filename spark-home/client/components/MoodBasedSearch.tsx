import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  SparklesIcon, 
  MountainIcon, 
  HeartIcon, 
  CrownIcon, 
  UsersIcon,
  SearchIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Mood {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  bgColor: string;
  keywords: string[];
}

const moods: Mood[] = [
  {
    id: "relaxed",
    label: "Relaxed",
    icon: <SparklesIcon className="h-6 w-6" />,
    description: "Peaceful retreats & quiet escapes",
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100 border-green-200",
    keywords: ["spa", "quiet", "mountain", "retreat", "wellness", "peaceful"]
  },
  {
    id: "adventurous", 
    label: "Adventurous",
    icon: <MountainIcon className="h-6 w-6" />,
    description: "Thrilling activities & outdoor fun",
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    keywords: ["hiking", "adventure", "outdoor", "sports", "active", "nature"]
  },
  {
    id: "romantic",
    label: "Romantic", 
    icon: <HeartIcon className="h-6 w-6" />,
    description: "Intimate settings & couple getaways",
    color: "text-pink-600",
    bgColor: "bg-pink-50 hover:bg-pink-100 border-pink-200",
    keywords: ["romantic", "couple", "intimate", "sunset", "wine", "private"]
  },
  {
    id: "luxurious",
    label: "Luxurious",
    icon: <CrownIcon className="h-6 w-6" />,
    description: "Premium experiences & upscale stays",
    color: "text-purple-600", 
    bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    keywords: ["luxury", "premium", "upscale", "concierge", "spa", "fine-dining"]
  },
  {
    id: "social",
    label: "Social",
    icon: <UsersIcon className="h-6 w-6" />,
    description: "Meet people & shared experiences",
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100 border-blue-200", 
    keywords: ["hostel", "shared", "social", "community", "events", "nightlife"]
  }
];

interface MoodCardProps {
  mood: Mood;
  isSelected: boolean;
  onSelect: (moodId: string) => void;
}

function MoodCard({ mood, isSelected, onSelect }: MoodCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105",
        mood.bgColor,
        isSelected && "ring-2 ring-dusky-rose shadow-lg"
      )}
      onClick={() => onSelect(mood.id)}
    >
      <CardContent className="p-4 text-center">
        {/* Selection indicator */}
        <div className="flex justify-end mb-2">
          <div className={cn(
            "w-4 h-4 rounded-full border-2 transition-all duration-200",
            isSelected
              ? "bg-dusky-rose border-dusky-rose"
              : "border-gray-300"
          )}>
            {isSelected && (
              <div className="w-2 h-2 bg-cream rounded-full absolute transform translate-x-0.5 translate-y-0.5" />
            )}
          </div>
        </div>

        {/* Icon */}
        <div className={cn("mb-3 flex justify-center", mood.color)}>
          {mood.icon}
        </div>

        {/* Label */}
        <h3 className="font-semibold text-gray-900 mb-1">
          {mood.label}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600">
          {mood.description}
        </p>
      </CardContent>
    </Card>
  );
}

interface MoodBasedSearchProps {
  onMoodSearch?: (mood: string, keywords: string[]) => void;
  className?: string;
}

export function MoodBasedSearch({ onMoodSearch, className }: MoodBasedSearchProps) {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const navigate = useNavigate();

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(selectedMood === moodId ? "" : moodId);
  };

  const handleSearch = () => {
    if (!selectedMood) return;
    
    const mood = moods.find(m => m.id === selectedMood);
    if (mood) {
      const params = new URLSearchParams();
      params.set('mood', selectedMood);
      params.set('keywords', mood.keywords.join(','));
      navigate(`/search?${params.toString()}`);
      
      if (onMoodSearch) {
        onMoodSearch(selectedMood, mood.keywords);
      }
    }
  };

  return (
    <Card className={cn("bg-cream shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            I want to feel...
          </h2>
          <p className="text-gray-600">
            Tell us your vibe and we'll find the perfect stays
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {moods.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              isSelected={selectedMood === mood.id}
              onSelect={handleMoodSelect}
            />
          ))}
        </div>

        {selectedMood && (
          <div className="text-center">
            <div className="mb-4">
              <Badge variant="outline" className="px-4 py-2 border-dusky-thistle text-dusky-rose">
                Looking for {moods.find(m => m.id === selectedMood)?.label.toLowerCase()} vibes
              </Badge>
            </div>
            
            <Button 
              onClick={handleSearch}
              className="px-8 py-3 bg-gradient-to-r from-dusky-rose to-dusky-thistle hover:from-dusky-thistle hover:to-dusky-hawthorne text-white rounded-xl font-semibold flex items-center gap-3 mx-auto"
            >
              <SearchIcon className="h-5 w-5" />
              Find My Perfect Vibe
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
