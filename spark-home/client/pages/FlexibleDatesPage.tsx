import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { FlexibleDatesAirbnb } from "@/components/FlexibleDatesAirbnb";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function FlexibleDatesPage() {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const navigate = useNavigate();

  const handleSelection = (duration: string, month: string) => {
    setSelectedDuration(duration);
    setSelectedMonth(month);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('flexible', 'true');
    if (selectedDuration) params.set('duration', selectedDuration);
    if (selectedMonth) params.set('month', selectedMonth);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            I'm flexible
          </h1>
          <p className="text-lg text-gray-600">
            Choose when and how long you'd like to stay, and we'll find you the best options
          </p>
        </div>

        {/* Flexible Dates Component */}
        <FlexibleDatesAirbnb onSelection={handleSelection} className="mb-8" />

        {/* Search Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSearch}
            disabled={!selectedDuration || !selectedMonth}
            size="lg"
            className="px-12 py-4 bg-gradient-to-r from-monsoon-blue to-monsoon-teal hover:from-monsoon-teal hover:to-monsoon-blue text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Search Flexible Dates
          </Button>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Save money</h3>
            <p className="text-sm text-gray-600">
              Flexible dates often mean better prices and more options
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏖️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">More options</h3>
            <p className="text-sm text-gray-600">
              Discover amazing places that fit your flexible schedule
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Best experiences</h3>
            <p className="text-sm text-gray-600">
              Find the perfect time to visit your dream destination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
