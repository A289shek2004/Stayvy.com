import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HomeIcon, 
  FlameIcon, 
  UmbrellaIcon, 
  MountainIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

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

// Generate months from current date to 6 months ahead
const generateMonths = (): Month[] => {
  const months = [];
  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const shortNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  for (let i = 0; i < 6; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    months.push({
      id: `${date.getFullYear()}-${date.getMonth()}`,
      name: monthNames[date.getMonth()],
      year: date.getFullYear(),
      shortName: shortNames[date.getMonth()]
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
        "cursor-pointer transition-all duration-200 hover:shadow-md relative",
        isSelected 
          ? "ring-2 ring-yellow-400 bg-yellow-50" 
          : "hover:border-gray-300"
      )}
      onClick={() => onSelect(option.id)}
    >
      <CardContent className="p-4 text-center">
        {/* Selection indicator */}
        <div className={cn(
          "absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-all duration-200",
          isSelected 
            ? "bg-yellow-400 border-yellow-400" 
            : "border-gray-300"
        )}>
          {isSelected && (
            <div className="w-2 h-2 bg-cream rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>

        {/* Icon */}
        <div className={cn(
          "mb-3 flex justify-center transition-colors duration-200",
          isSelected ? "text-yellow-600" : "text-gray-600"
        )}>
          {option.icon}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-1">
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
        "cursor-pointer transition-all duration-200 hover:shadow-md flex-shrink-0 w-32",
        isSelected 
          ? "ring-2 ring-yellow-400 bg-yellow-50" 
          : "hover:border-gray-300"
      )}
      onClick={() => onSelect(month.id)}
    >
      <CardContent className="p-4 text-center">
        <h4 className={cn(
          "font-medium text-sm transition-colors duration-200",
          isSelected ? "text-yellow-700" : "text-gray-900"
        )}>
          {month.shortName}
        </h4>
        <p className="text-xs text-gray-500 mt-1">
          {month.year}
        </p>
      </CardContent>
    </Card>
  );
}

interface FlexibleDatesProps {
  onSelection?: (duration: string, month: string) => void;
  className?: string;
}

export function FlexibleDates({ onSelection, className }: FlexibleDatesProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [monthScrollIndex, setMonthScrollIndex] = useState(0);
  
  const months = generateMonths();
  const visibleMonths = 3; // Show 3 months at a time on mobile, more on larger screens

  const handleDurationSelect = (durationId: string) => {
    setSelectedDuration(durationId);
    if (onSelection) {
      onSelection(durationId, selectedMonth);
    }
  };

  const handleMonthSelect = (monthId: string) => {
    setSelectedMonth(monthId);
    if (onSelection) {
      onSelection(selectedDuration, monthId);
    }
  };

  const scrollLeft = () => {
    setMonthScrollIndex(Math.max(0, monthScrollIndex - 1));
  };

  const scrollRight = () => {
    setMonthScrollIndex(Math.min(months.length - visibleMonths, monthScrollIndex + 1));
  };

  return (
    <Card className={cn("bg-peach shadow-lg", className)}>
      <CardContent className="p-6">
        {/* Duration Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Go for…
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

        {/* Month Selection */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Travel in…
          </h2>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md",
                monthScrollIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              onClick={scrollLeft}
              disabled={monthScrollIndex === 0}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={cn(
                "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md",
                monthScrollIndex >= months.length - visibleMonths && "opacity-50 cursor-not-allowed"
              )}
              onClick={scrollRight}
              disabled={monthScrollIndex >= months.length - visibleMonths}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>

            {/* Month Cards Container */}
            <div className="overflow-hidden mx-8">
              <div 
                className="flex gap-3 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${monthScrollIndex * (128 + 12)}px)` // 128px card width + 12px gap
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
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Your selection:</h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              {selectedDuration && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  {durationOptions.find(d => d.id === selectedDuration)?.title}
                </span>
              )}
              {selectedMonth && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {months.find(m => m.id === selectedMonth)?.name} {months.find(m => m.id === selectedMonth)?.year}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
