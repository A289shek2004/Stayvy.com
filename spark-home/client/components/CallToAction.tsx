import { Button } from "@/components/ui/button";
import { SearchIcon, SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();

  const handleSearchNow = () => {
    // Scroll to the hero search bar or navigate to search page
    const heroSection = document.querySelector('section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/search');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-dusky-rose via-dusky-thistle to-dusky-hawthorne relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full animate-pulse delay-200" />
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-300" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sparkle Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <SparklesIcon className="h-12 w-12 text-white animate-pulse" />
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Start Your Next
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-dusky-thistle to-dusky-hawthorne">
            Adventure Today
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover amazing places, create unforgettable memories, and find your perfect getaway
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleSearchNow}
            size="lg"
            className="bg-cream text-dusky-rose hover:bg-light-sage px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <SearchIcon className="h-6 w-6" />
            Search Now
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate('/host/create')}
            className="border-2 border-cream text-white hover:bg-cream hover:text-dusky-rose px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-cream/10 transition-all duration-300 hover:scale-105"
          >
            Become a Host
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">10K+</div>
            <div className="text-white/80 text-sm">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-white/80 text-sm">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">4.8★</div>
            <div className="text-white/80 text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
