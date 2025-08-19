import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlexibleDatesModal } from "./FlexibleDatesModal";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, UsersIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showFlexibleDates, setShowFlexibleDates] = useState(false);
  const [flexibleSelection, setFlexibleSelection] = useState<{ duration: string; month: string } | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to search results with query parameters
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkIn) params.set('checkin', checkIn.toISOString());
    if (checkOut) params.set('checkout', checkOut.toISOString());
    if (flexibleSelection) {
      params.set('flexible', 'true');
      params.set('duration', flexibleSelection.duration);
      params.set('month', flexibleSelection.month);
    }
    params.set('guests', guests);

    navigate(`/search?${params.toString()}`);
  };

  const handleFlexibleDatesApply = (duration: string, month: string) => {
    setFlexibleSelection({ duration, month });
    // Clear fixed dates when flexible is selected
    setCheckIn(undefined);
    setCheckOut(undefined);
  };

  const handleFixedDateSelect = (date: Date | undefined, type: 'checkin' | 'checkout') => {
    if (type === 'checkin') {
      setCheckIn(date);
    } else {
      setCheckOut(date);
    }
    // Clear flexible selection when fixed dates are selected
    if (date) {
      setFlexibleSelection(null);
    }
  };

  return (
    <div className="bg-cream/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cream/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-dusky-rose" />
            Where
          </label>
          <Input
            placeholder="Search destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setFocusedField('destination')}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "border-gray-200 focus:border-dusky-scepter transition-all duration-300",
              focusedField === 'destination' && "scale-105 shadow-lg"
            )}
          />
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                onFocus={() => setFocusedField('checkin')}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-200 transition-all duration-300",
                  !checkIn && !flexibleSelection && "text-muted-foreground",
                  focusedField === 'checkin' && "scale-105 shadow-lg border-dusky-scepter",
                  flexibleSelection && "bg-yellow-50 border-yellow-300"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {flexibleSelection ? "Flexible dates" : (checkIn ? format(checkIn, "MMM d") : "Add dates")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start"
                  onClick={() => setShowFlexibleDates(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  I'm flexible
                </Button>
                <div className="border-t pt-3">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => handleFixedDateSelect(date, 'checkin')}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                onFocus={() => setFocusedField('checkout')}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-200 transition-all duration-300",
                  !checkOut && !flexibleSelection && "text-muted-foreground",
                  focusedField === 'checkout' && "scale-105 shadow-lg border-dusky-scepter",
                  flexibleSelection && "bg-yellow-50 border-yellow-300"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {flexibleSelection ? "Flexible dates" : (checkOut ? format(checkOut, "MMM d") : "Add dates")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start"
                  onClick={() => setShowFlexibleDates(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  I'm flexible
                </Button>
                <div className="border-t pt-3">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => handleFixedDateSelect(date, 'checkout')}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-dusky-rose" />
            Guests
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger
              onFocus={() => setFocusedField('guests')}
              onBlur={() => setFocusedField(null)}
              className={cn(
                "border-gray-200 transition-all duration-300",
                focusedField === 'guests' && "scale-105 shadow-lg border-dusky-scepter"
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "guest" : "guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSearch}
          size="lg"
          className="px-12 py-4 bg-gradient-to-r from-dusky-rose to-dusky-thistle hover:from-dusky-thistle hover:to-dusky-scepter text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <SearchIcon className="h-5 w-5" />
          Search Amazing Places
        </Button>
      </div>

      {/* Flexible Dates Modal */}
      <FlexibleDatesModal
        isOpen={showFlexibleDates}
        onClose={() => setShowFlexibleDates(false)}
        onApply={handleFlexibleDatesApply}
      />
    </div>
  );
}
