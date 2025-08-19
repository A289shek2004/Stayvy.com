import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  UsersIcon, 
  CalculatorIcon, 
  XIcon,
  MinusIcon,
  PlusIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetSplitCalculatorProps {
  totalPrice: number;
  currency?: string;
  onSplitUpdate?: (pricePerPerson: number, guestCount: number) => void;
  className?: string;
}

export function BudgetSplitCalculator({ 
  totalPrice, 
  currency = "$", 
  onSplitUpdate,
  className 
}: BudgetSplitCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [showResult, setShowResult] = useState(false);

  const pricePerPerson = Math.round(totalPrice / guestCount);

  useEffect(() => {
    if (onSplitUpdate && showResult) {
      onSplitUpdate(pricePerPerson, guestCount);
    }
  }, [pricePerPerson, guestCount, showResult, onSplitUpdate]);

  const handleGuestChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 20) {
      setGuestCount(newCount);
      setShowResult(true);
    }
  };

  const incrementGuests = () => handleGuestChange(guestCount + 1);
  const decrementGuests = () => handleGuestChange(guestCount - 1);

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-dusky-rose hover:bg-dusky-thistle shadow-lg rounded-full p-4 group"
        >
          <div className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5" />
            <span className="hidden group-hover:block text-sm">Split Cost</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card className="w-80 shadow-xl border-dusky-rose/20">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-dusky-rose" />
              <h3 className="font-semibold text-gray-900">Split the Cost</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsOpen(false);
                setShowResult(false);
              }}
              className="h-6 w-6"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Traveling with friends? Calculate cost per person.
          </p>

          {/* Guest Counter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of guests
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementGuests}
                disabled={guestCount <= 1}
                className="h-10 w-10"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              
              <Input
                type="number"
                value={guestCount}
                onChange={(e) => handleGuestChange(parseInt(e.target.value) || 1)}
                className="text-center w-20"
                min="1"
                max="20"
              />
              
              <Button
                variant="outline"
                size="icon"
                onClick={incrementGuests}
                disabled={guestCount >= 20}
                className="h-10 w-10"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calculation Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Total price:</span>
              <span className="font-medium">{currency}{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">÷ {guestCount} guests:</span>
              <span className="text-lg font-bold text-dusky-rose">
                {currency}{pricePerPerson}
              </span>
            </div>
            <div className="text-xs text-gray-500 text-center">
              per person per night
            </div>
          </div>

          {/* Result Badge */}
          {showResult && (
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
                Each person pays {currency}{pricePerPerson}/night
              </Badge>
            </div>
          )}

          {/* Tips */}
          <div className="mt-4 text-xs text-gray-500">
            <p>💡 Tip: Many hosts offer group discounts for 4+ guests!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook to provide budget split functionality to property cards
export function useBudgetSplit(basePrice: number) {
  const [pricePerPerson, setPricePerPerson] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState<number | null>(null);

  const handleSplitUpdate = (price: number, guests: number) => {
    setPricePerPerson(price);
    setGuestCount(guests);
  };

  const resetSplit = () => {
    setPricePerPerson(null);
    setGuestCount(null);
  };

  return {
    pricePerPerson,
    guestCount,
    handleSplitUpdate,
    resetSplit,
    isActive: pricePerPerson !== null
  };
}
