import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  SparklesIcon, 
  ArrowRightIcon, 
  RefreshCwIcon,
  SearchIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface QuizQuestion {
  id: string;
  question: string;
  emoji: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  tags: string[];
  score: { [key: string]: number };
}

interface QuizResult {
  type: string;
  title: string;
  description: string;
  emoji: string;
  tags: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "breakfast",
    question: "Pick your dream breakfast",
    emoji: "🍳",
    options: [
      {
        id: "continental",
        text: "Continental breakfast in bed",
        emoji: "🥐",
        tags: ["luxury", "service"],
        score: { luxury: 3, relaxed: 2 }
      },
      {
        id: "local",
        text: "Street food adventure",
        emoji: "🌮",
        tags: ["local", "adventure"],
        score: { adventurous: 3, cultural: 2 }
      },
      {
        id: "healthy",
        text: "Fresh smoothie bowl",
        emoji: "🥣",
        tags: ["wellness", "healthy"],
        score: { relaxed: 3, wellness: 2 }
      },
      {
        id: "social",
        text: "Group brunch with new friends",
        emoji: "🥞",
        tags: ["social", "community"],
        score: { social: 3, adventurous: 1 }
      }
    ]
  },
  {
    id: "view",
    question: "Choose your ideal view",
    emoji: "🌅",
    options: [
      {
        id: "ocean",
        text: "Endless ocean horizon",
        emoji: "🌊",
        tags: ["beach", "relaxing"],
        score: { relaxed: 3, romantic: 2 }
      },
      {
        id: "mountains",
        text: "Majestic mountain peaks",
        emoji: "⛰️",
        tags: ["nature", "adventure"],
        score: { adventurous: 3, relaxed: 1 }
      },
      {
        id: "city",
        text: "Vibrant city lights",
        emoji: "🏙️",
        tags: ["urban", "nightlife"],
        score: { social: 3, luxury: 1 }
      },
      {
        id: "garden",
        text: "Peaceful garden courtyard",
        emoji: "🌿",
        tags: ["peaceful", "private"],
        score: { relaxed: 3, romantic: 2 }
      }
    ]
  },
  {
    id: "evening",
    question: "How do you want to spend your evening?",
    emoji: "🌙",
    options: [
      {
        id: "spa",
        text: "Relaxing spa treatment",
        emoji: "💆‍♀️",
        tags: ["wellness", "luxury"],
        score: { relaxed: 3, luxury: 2 }
      },
      {
        id: "explore",
        text: "Exploring local nightlife",
        emoji: "🎭",
        tags: ["social", "cultural"],
        score: { social: 3, adventurous: 2 }
      },
      {
        id: "romantic",
        text: "Candlelit dinner for two",
        emoji: "🕯️",
        tags: ["romantic", "intimate"],
        score: { romantic: 3, luxury: 1 }
      },
      {
        id: "adventure",
        text: "Sunset hiking trail",
        emoji: "🥾",
        tags: ["adventure", "nature"],
        score: { adventurous: 3, relaxed: 1 }
      }
    ]
  }
];

const quizResults: { [key: string]: QuizResult } = {
  luxury: {
    type: "luxury",
    title: "Luxury Seeker",
    description: "You deserve the finest experiences with premium amenities and impeccable service",
    emoji: "👑",
    tags: ["luxury", "premium", "service", "spa", "fine-dining"]
  },
  relaxed: {
    type: "relaxed", 
    title: "Zen Traveler",
    description: "You seek peaceful retreats where you can unwind and reconnect with yourself",
    emoji: "🧘‍♀️",
    tags: ["wellness", "quiet", "spa", "nature", "peaceful"]
  },
  adventurous: {
    type: "adventurous",
    title: "Adventure Enthusiast", 
    description: "You crave exciting experiences and love exploring the great outdoors",
    emoji: "🏔️",
    tags: ["adventure", "outdoor", "hiking", "sports", "active"]
  },
  social: {
    type: "social",
    title: "Social Butterfly",
    description: "You love meeting new people and experiencing vibrant local communities",
    emoji: "🦋",
    tags: ["social", "hostel", "community", "nightlife", "events"]
  },
  romantic: {
    type: "romantic",
    title: "Romance Seeker",
    description: "You're looking for intimate, couple-friendly experiences and magical moments",
    emoji: "💕",
    tags: ["romantic", "couple", "intimate", "private", "sunset"]
  }
};

interface StayRecommendationQuizProps {
  onComplete?: (result: QuizResult) => void;
  className?: string;
}

export function StayRecommendationQuiz({ onComplete, className }: StayRecommendationQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [quizQuestions[currentQuestion].id]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: { [key: string]: string }) => {
    const scores: { [key: string]: number } = {};
    
    Object.entries(finalAnswers).forEach(([questionId, optionId]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.id === optionId);
      
      if (option) {
        Object.entries(option.score).forEach(([type, points]) => {
          scores[type] = (scores[type] || 0) + points;
        });
      }
    });

    const topType = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    const finalResult = quizResults[topType];
    setResult(finalResult);
    
    if (onComplete) {
      onComplete(finalResult);
    }
  };

  const handleSearchWithResult = () => {
    if (result) {
      const params = new URLSearchParams();
      params.set('quiz_result', result.type);
      params.set('tags', result.tags.join(','));
      navigate(`/search?${params.toString()}`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <Card className={cn("bg-gradient-to-br from-dusky-rose to-dusky-thistle text-white", className)}>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <SparklesIcon className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">
              Find Your Perfect Stay in 30 Seconds
            </h2>
            <p className="text-white/90">
              Answer 3 fun questions and we'll match you with your ideal accommodation
            </p>
          </div>
          
          <Button 
            onClick={() => setIsStarted(true)}
            className="bg-cream text-dusky-rose hover:bg-light-sage px-8 py-3 font-semibold"
          >
            Start Quiz ✨
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              You're a {result.title}!
            </h2>
            <p className="text-gray-600 mb-4">
              {result.description}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {result.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="bg-dusky-rose/10 text-dusky-rose border-dusky-rose">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={handleSearchWithResult}
              className="bg-dusky-rose hover:bg-dusky-thistle px-8 py-3 flex items-center gap-2"
            >
              <SearchIcon className="h-4 w-4" />
              Find My Perfect Stays
            </Button>
            <Button 
              variant="outline" 
              onClick={resetQuiz}
              className="flex items-center gap-2"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-dusky-rose font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{question.emoji}</div>
          <h3 className="text-xl font-semibold text-gray-900">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option) => (
            <Card 
              key={option.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 hover:border-dusky-rose"
              onClick={() => handleAnswer(option.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{option.emoji}</div>
                <p className="text-sm font-medium text-gray-900">
                  {option.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
