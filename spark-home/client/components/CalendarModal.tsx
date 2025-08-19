import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { XIcon, CalendarIcon } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { DateRange } from "react-day-picker";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMonth: string;
  monthName: string;
  onDateRangeSelect?: (dateRange: DateRange | undefined) => void;
}

export function CalendarModal({ 
  isOpen, 
  onClose, 
  selectedMonth, 
  monthName,
  onDateRangeSelect 
}: CalendarModalProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onDateRangeSelect) {
      onDateRangeSelect(range);
    }
  };

  const handleApply = () => {
    if (dateRange?.from && dateRange?.to) {
      onClose();
      // Here you would typically navigate to search results or update parent component
      console.log("Selected date range:", dateRange);
    }
  };

  const handleClear = () => {
    setDateRange(undefined);
    if (onDateRangeSelect) {
      onDateRangeSelect(undefined);
    }
  };

  const getQuickOptions = () => {
    const today = new Date();
    return [
      {
        label: "This weekend",
        range: { from: today, to: addDays(today, 2) }
      },
      {
        label: "Next week",
        range: { from: addDays(today, 7), to: addDays(today, 14) }
      },
      {
        label: "Next month",
        range: { from: addDays(today, 30), to: addDays(today, 37) }
      }
    ];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-cream">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Select dates in {monthName}
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                Choose your check-in and check-out dates
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar */}
            <div className="flex-1">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                className="rounded-md border shadow-sm"
                disabled={(date) => date < new Date()}
              />
            </div>

            {/* Sidebar with quick options and selection summary */}
            <div className="lg:w-80 space-y-6">
              {/* Quick Date Options */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Quick Options
                </h3>
                <div className="space-y-2">
                  {getQuickOptions().map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left hover:bg-yellow-50 hover:border-yellow-300"
                      onClick={() => handleDateRangeChange(option.range)}
                    >
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">
                          {format(option.range.from, "MMM d")} - {format(option.range.to, "MMM d")}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selection Summary */}
              {dateRange?.from && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Your Selection</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">
                        {format(dateRange.from, "EEE, MMM d")}
                      </span>
                    </div>
                    {dateRange.to && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Check-out:</span>
                          <span className="font-medium">
                            {format(dateRange.to, "EEE, MMM d")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm border-t border-yellow-200 pt-2">
                          <span className="text-gray-600">Total nights:</span>
                          <span className="font-medium">
                            {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">💡 Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Prices may vary by date</li>
                  <li>• Weekends tend to be more expensive</li>
                  <li>• Book early for better deals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!dateRange}
          >
            Clear dates
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={!dateRange?.from || !dateRange?.to}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8"
            >
              Apply dates
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
