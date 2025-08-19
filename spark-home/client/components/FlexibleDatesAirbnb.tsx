import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarModal } from "./CalendarModal";
import { 
  HomeIcon, 
  FlameIcon, 
  UmbrellaIcon, 
  MountainIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DurationOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  days: number;
}

interface Month {
  id: string;
  name: string;
  year: number;
  shortName: string;
}

const durationOptions: DurationOption[] = [
  {
    id: "weekend",
    title: "Weekend",
    subtitle: "Fri–Sun",
    icon: <HomeIcon className="h-8 w-8" />,
    days: 3
  },
  {
    id: "week",
    title: "Week",
    subtitle: "7 days",
    icon: <FlameIcon className="h-8 w-8" />,
    days: 7
  },
  {
    id: "two-weeks",
    title: "Two weeks",
    subtitle: "14 days", 
    icon: <UmbrellaIcon className="h-8 w-8" />,
    days: 14
  },
  {
    id: "month",
    title: "Month",
    subtitle: "30 days",
    icon: <MountainIcon className="h-8 w-8" />,
    days: 30
  }
];

// Generate months from August 2025 to January 2026 as specified
const generateMonths = (): Month[] => {
  const months = [];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const shortNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Start from August 2025
  const startYear = 2025;
  const startMonth = 7; // August (0-indexed)
  
  for (let i = 0; i < 6; i++) {
    let year = startYear;
    let month = startMonth + i;
    
    if (month > 11) {
      year = startYear + 1;
      month = month - 12;
    }
    
    months.push({
      id: `${year}-${month}`,
      name: monthNames[month],
      year: year,
      shortName: shortNames[month]
    });
  }

  return months;
};

interface DurationCardProps {
  option: DurationOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function DurationCard({ option, isSelected, onSelect }: DurationCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-2 bg-light-sage",
        isSelected 
          ? "border-yellow-400 bg-yellow-50 shadow-lg" 
          : "border-gray-200 hover:border-gray-300"
      )}
      onClick={() => onSelect(option.id)}
    >
      <CardContent className="p-6 text-center relative">
        {/* Circular selection indicator */}
        <div className={cn(
          "absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
          isSelected 
            ? "bg-yellow-400 border-yellow-400" 
            : "border-gray-300"
        )}>
          {isSelected && (
            <div className="w-2 h-2 bg-cream rounded-full" />
          )}
        </div>

        {/* Icon */}
        <div className={cn(
          "mb-4 flex justify-center transition-colors duration-200",
          isSelected ? "text-yellow-600" : "text-gray-500"
        )}>
          {option.icon}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-bold text-lg mb-2 transition-colors duration-200",
          isSelected ? "text-gray-900" : "text-gray-800"
        )}>
          {option.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-500">
          {option.subtitle}
        </p>
      </CardContent>
    </Card>
  );
}

interface MonthCardProps {
  month: Month;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function MonthCard({ month, isSelected, onSelect }: MonthCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md flex-shrink-0 w-36 border-2",
        isSelected 
          ? "border-yellow-400 bg-yellow-50 shadow-lg" 
          : "border-gray-200 hover:border-gray-300 bg-peach"
      )}
      onClick={() => onSelect(month.id)}
    >
      <CardContent className="p-4 text-center">
        <h4 className={cn(
          "font-semibold text-base transition-colors duration-200",
          isSelected ? "text-yellow-700" : "text-gray-900"
        )}>
          {month.shortName}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {month.year}
        </p>
      </CardContent>
    </Card>
  );
}

interface FlexibleDatesAirbnbProps {
  onSelection?: (duration: string, month: string) => void;
  className?: string;
}

export function FlexibleDatesAirbnb({ onSelection, className }: FlexibleDatesAirbnbProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [monthScrollIndex, setMonthScrollIndex] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();
  
  const months = generateMonths();
  const visibleMonths = 3; // Show 3 months at a time on mobile, more on larger screens

  const handleDurationSelect = (durationId: string) => {
    setSelectedDuration(selectedDuration === durationId ? "" : durationId);
  };

  const handleMonthSelect = (monthId: string) => {
    setSelectedMonth(monthId);
    setShowCalendarModal(true);
    if (onSelection) {
      onSelection(selectedDuration, monthId);
    }
  };

  const handleCalendarClose = () => {
    setShowCalendarModal(false);
  };

  const handleDateRangeSelect = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
  };

  const getSelectedMonthName = () => {
    const month = months.find(m => m.id === selectedMonth);
    return month ? `${month.name} ${month.year}` : "";
  };

  const scrollLeft = () => {
    setMonthScrollIndex(Math.max(0, monthScrollIndex - 1));
  };

  const scrollRight = () => {
    setMonthScrollIndex(Math.min(months.length - visibleMonths, monthScrollIndex + 1));
  };

  return (
    <>
      {/* White rounded container with soft shadow */}
      <Card className={cn("bg-cream shadow-lg rounded-2xl border border-gray-100", className)}>
        <CardContent className="p-8">
          {/* Duration Selection - "Go for…" */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Go for…
            </h2>
            
            {/* Four horizontal option cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {durationOptions.map((option) => (
                <DurationCard
                  key={option.id}
                  option={option}
                  isSelected={selectedDuration === option.id}
                  onSelect={handleDurationSelect}
                />
              ))}
            </div>
          </div>

          {/* Month Selection - "Travel in…" */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Travel in…
            </h2>
            
            <div className="relative">
              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg border-gray-200 hover:border-gray-300 rounded-full",
                  monthScrollIndex === 0 && "opacity-50 cursor-not-allowed"
                )}
                onClick={scrollLeft}
                disabled={monthScrollIndex === 0}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg border-gray-200 hover:border-gray-300 rounded-full",
                  monthScrollIndex >= months.length - visibleMonths && "opacity-50 cursor-not-allowed"
                )}
                onClick={scrollRight}
                disabled={monthScrollIndex >= months.length - visibleMonths}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>

              {/* Horizontal scroll of month cards */}
              <div className="overflow-hidden mx-12">
                <div 
                  className="flex gap-4 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${monthScrollIndex * (144 + 16)}px)` // 144px card width + 16px gap
                  }}
                >
                  {months.map((month) => (
                    <MonthCard
                      key={month.id}
                      month={month}
                      isSelected={selectedMonth === month.id}
                      onSelect={handleMonthSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selection Summary */}
          {(selectedDuration || selectedMonth) && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Your selection:</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                {selectedDuration && (
                  <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full font-medium">
                    {durationOptions.find(d => d.id === selectedDuration)?.title}
                  </span>
                )}
                {selectedMonth && (
                  <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full font-medium">
                    {months.find(m => m.id === selectedMonth)?.name} {months.find(m => m.id === selectedMonth)?.year}
                  </span>
                )}
                {selectedDateRange?.from && selectedDateRange?.to && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                    {selectedDateRange.from.toLocaleDateString()} - {selectedDateRange.to.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar Modal - opens when month is clicked */}
      <CalendarModal
        isOpen={showCalendarModal}
        onClose={handleCalendarClose}
        selectedMonth={selectedMonth}
        monthName={getSelectedMonthName()}
        onDateRangeSelect={handleDateRangeSelect}
      />
    </>
  );
}
