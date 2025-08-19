import { SearchBar } from "@/components/SearchBar";
import { DestinationCard } from "@/components/DestinationCard";
import { Navbar } from "@/components/Navbar";
import { TypingAnimation } from "@/components/TypingAnimation";
import { Link } from "react-router-dom";
import { CategoryScroll } from "@/components/CategoryScroll";
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { EnhancedPropertyShowcase } from "@/components/EnhancedPropertyShowcase";
import { PromotionalSections } from "@/components/PromotionalSections";
import { InteractiveMap } from "@/components/InteractiveMap";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CallToAction } from "@/components/CallToAction";
import { PersonalizedRecommendations } from "@/components/PersonalizedRecommendations";
import { MoodBasedSearch } from "@/components/MoodBasedSearch";
import { StayRecommendationQuiz } from "@/components/StayRecommendationQuiz";
import { FlexibleDatesAirbnb } from "@/components/FlexibleDatesAirbnb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CloudRainIcon,
  TrendingUpIcon,
  HeartIcon,
  HistoryIcon,
  StarIcon,
  ChevronRightIcon,
  CalendarIcon
} from "lucide-react";

// Mock data for destinations
const monsoonDestinations = [
  {
    id: "1",
    title: "Cozy Mountain Retreat",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
    price: 125,
    rating: 4.8,
    reviews: 124,
    isMonsoonFriendly: true,
    tags: ["Hill Station", "Tea Gardens", "Peaceful"]
  },
  {
    id: "2", 
    title: "Historic Mansion Stay",
    location: "Newport, Rhode Island",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop",
    price: 285,
    rating: 4.9,
    reviews: 89,
    isMonsoonFriendly: true,
    tags: ["Palace", "Lake View", "Luxury"]
  },
  {
    id: "3",
    title: "Redwood Forest Cabin",
    location: "Humboldt County, California", 
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=500&h=400&fit=crop",
    price: 145,
    rating: 4.7,
    reviews: 156,
    isMonsoonFriendly: true,
    tags: ["Treehouse", "Nature", "Adventure"]
  },
  {
    id: "4",
    title: "Seaside Villa",
    location: "Outer Banks, North Carolina",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=400&fit=crop", 
    price: 225,
    rating: 4.6,
    reviews: 203,
    tags: ["Beach", "Villa", "Pool"]
  }
];

const recommendations = {
  trending: [
    ...monsoonDestinations.slice(0, 3),
    {
      id: "5",
      title: "Modern City Apartment",
      location: "Seattle, Washington",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop",
      price: 185,
      rating: 4.5,
      reviews: 78,
      tags: ["City", "Modern", "Rooftop"]
    }
  ],
  preferences: monsoonDestinations.slice(1, 4),
  similar: monsoonDestinations.slice(0, 3),
  peopleChoice: [...monsoonDestinations].reverse().slice(0, 3)
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549068106-b024baf5062d?w=1920&h=1080&fit=crop&auto=format&q=80"
            alt="Beautiful vacation destination"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-dusky-noir/40" />
          {/* Gradient overlay with dusky rose tones */}
          <div className="absolute inset-0 bg-gradient-to-b from-dusky-hawthorne/20 via-transparent to-dusky-noir/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            {/* Seasonal Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <CloudRainIcon className="h-6 w-6 text-white" />
              <Badge className="bg-dusky-scepter/90 backdrop-blur-sm text-white border-0 px-4 py-2 text-sm">
                Elegant Escapes
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find your perfect stay
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dusky-rose to-dusky-thistle">
                anywhere in the world
              </span>
            </h1>

            {/* Animated Typing Text */}
            <div className="text-xl md:text-2xl text-white/90 mb-8 h-8">
              Discover amazing{" "}
              <TypingAnimation
                texts={[
                  "beachfront cottages",
                  "mountain retreats",
                  "city apartments",
                  "lakeside retreats",
                  "luxury villas",
                  "cozy cabins"
                ]}
                typingSpeed={80}
                pauseDuration={1500}
                className="text-dusky-rose font-semibold"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar />

            {/* Flexible Dates Link */}
            <div className="text-center mt-6">
              <Link to="/flexible-dates" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <CalendarIcon className="h-4 w-4" />
                <span className="underline underline-offset-2">I'm flexible with my dates</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Flexible Dates Section - Airbnb Style */}
      <section className="py-12 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">I'm Flexible</h2>
            <p className="text-lg text-gray-600">Choose when and how long you'd like to stay</p>
          </div>
          <FlexibleDatesAirbnb />
        </div>
      </section>

      {/* Stay Recommendation Quiz */}
      <section className="py-8 bg-cream relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StayRecommendationQuiz />
        </div>
      </section>

      {/* Mood-Based Search */}
      <section className="py-8 bg-light-sage relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MoodBasedSearch />
        </div>
      </section>

      {/* Category Scroll Section */}
      <section className="py-8 bg-peach relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryScroll />
        </div>
      </section>

      {/* Personalized Recommendations (for logged in users) */}
      <PersonalizedRecommendations isLoggedIn={true} />

      {/* Enhanced Property Showcase Section */}
      <section className="py-8 bg-mauve relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnhancedPropertyShowcase />
        </div>
      </section>

      {/* Promotional Sections */}
      <section className="py-8 bg-sage relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PromotionalSections />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-8 bg-cream relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMap />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Featured Destinations Section */}
      <section className="py-16 bg-gradient-to-r from-monsoon-rain to-monsoon-cloud relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <CloudRainIcon className="h-8 w-8 text-monsoon-blue" />
              Perfect for Summer Season
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked destinations perfect for your summer getaway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monsoonDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                {...destination}
                className="transform hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Trending Now */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUpIcon className="h-6 w-6 text-monsoon-teal" />
                Trending Now
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                View all <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.trending.map((destination) => (
                <DestinationCard key={destination.id} {...destination} />
              ))}
            </div>
          </div>

          {/* Based on Your Preferences */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <HeartIcon className="h-6 w-6 text-red-500" />
                Based on Your Preferences
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                View all <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.preferences.map((destination) => (
                <DestinationCard key={destination.id} {...destination} />
              ))}
            </div>
          </div>

          {/* Similar to Your Last Stay */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <HistoryIcon className="h-6 w-6 text-monsoon-blue" />
                Similar to Your Last Stay
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                View all <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.similar.map((destination) => (
                <DestinationCard key={destination.id} {...destination} />
              ))}
            </div>
          </div>

          {/* People's Choice This Season */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                People's Choice This Season
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                View all <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.peopleChoice.map((destination) => (
                <DestinationCard key={destination.id} {...destination} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CloudRainIcon className="h-6 w-6 text-monsoon-teal" />
                <span className="text-xl font-bold">MonsoonStay</span>
              </div>
              <p className="text-gray-400">
                Seasonal getaways for every mood and weather.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <p>About us</p>
                <p>Careers</p>
                <p>Press</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <p>Help Center</p>
                <p>Safety</p>
                <p>Contact us</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <div className="space-y-2 text-gray-400">
                <p>Host your home</p>
                <p>Host dashboard</p>
                <p>Resources</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MonsoonStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
